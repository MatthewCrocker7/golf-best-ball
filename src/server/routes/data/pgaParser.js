const rp = require('request-promise');
const NodeCache = require('node-cache');
const _ = require('lodash');
const db = require('../../db');
const schedule = require('./pgaSchedule');

const cache = new NodeCache();
const KEY = process.env.API_KEY;

const getNextTournament = () => {
  const startDate = new Date().toISOString().split('T')[0];
  const result = schedule.tournaments.filter(x => (x.start_date >= startDate));

  return result[0];
};

const getCurrentTournament = () => {
  const cur = new Date().toISOString().split('T')[0];
  const end = new Date();
  end.setDate(end.getDate() + ((4 + 7 - end.getDay()) % 7));

  // const result = schedule.tournaments.filter(x =>
  // (x.start_date <= cur && x.end_date <= end.toISOString().split('T')[0]));
  const result = schedule.tournaments.filter(x => x.start_date <= cur);
  // console.log('First: ', result[0].name);
  // console.log('Last: ', result[result.length - 1].name);

  return result[result.length - 1];
};

const getTournamentById = (id) => {
  const result = schedule.tournaments.filter(x => x.id === id);
  return result[0];
};

const getCurrentRound = () => {
  const day = new Date().getDay();
  let round;
  switch (day) {
    case 0:
      round = 4;
      break;
    case 4:
      round = 1;
      break;
    case 5:
      round = 2;
      break;
    case 6:
      round = 3;
      break;
    default:
      round = -1;
  }
  return round;
};

const saveScores = async (roundInfo) => {
  try {
    const queries = roundInfo.round.players.map(async (player) => {
      const query = 'INSERT INTO public.golfer_scores'
      + ' (tournament_id, golfer_id, round, scores) VALUES ($1, $2, $3, $4)'
      + ' ON CONFLICT (tournament_id, golfer_id, round) DO UPDATE SET'
      + ' tournament_id = $1, golfer_id = $2, round = $3, scores = $4';
      const scores = player.scores.map(x => x.strokes);
      const params = [roundInfo.id, player.id, roundInfo.round.number, scores];
      const queryResponse = await db.query(query, params);
      return queryResponse;
    });
    return Promise.all(queries);
  } catch (error) {
    console.log('Save score error: ', error);
    throw error;
  }
};

const deleteCurrentGamesCache = async () => {
  const currentGames = cache.get('currentGames');

  if (currentGames === undefined) {
    return;
  }

  currentGames.forEach((gameKey) => {
    const game = cache.get(gameKey);

    if (game !== undefined) {
      cache.del(gameKey);
    }
  });
  console.log('Game cache refreshed!');
};

const updateScores = async () => {
  const round = getCurrentRound();
  console.log('Current round: ', round);
  if (round < 0) {
    // Doesn't update scores on Monday, Tuesday, Wednesday
    return;
  }

  const tournament = getCurrentTournament();
  console.log('The current tournament is: ', tournament.name);
  console.log('The current tournament is: ', tournament.id);

  const uri = `https://api.sportradar.us/golf-t2/scorecards/pga/2019/tournaments/${tournament.id}/rounds/${round}/scores.json?api_key=${KEY}`;
  const options = {
    uri,
    json: true
  };
  const response = await rp(options);
  saveScores(response);
  console.log('Scores updated!');
  deleteCurrentGamesCache();
};

const updateScoreByRound = async (round) => {
  console.log('Refresh round: ', round);

  const tournament = getCurrentTournament();
  console.log('The current tournament is: ', tournament.name);
  console.log('The current tournament is: ', tournament.id);

  const uri = `https://api.sportradar.us/golf-t2/scorecards/pga/2019/tournaments/${tournament.id}/rounds/${round}/scores.json?api_key=${KEY}`;
  const options = {
    uri,
    json: true
  };
  const response = await rp(options);
  await saveScores(response);
  console.log('Scores updated!');
  await deleteCurrentGamesCache();

  return response;
};

const getWorldRankings = async () => {
  const players = cache.get('worldRankings');
  if (players === undefined) {
    const uri = `https://api.sportradar.us/golf-t2/players/wgr/2019/rankings.json?api_key=${KEY}`;
    const options = {
      uri,
      json: true
    };
    const response = await rp(options);
    // console.log(response.players);
    const result = response.players.map(x => (
      {
        name: `${x.first_name} ${x.last_name}`,
        rank: x.rank,
        id: x.id
      }
    ));
    cache.set('worldRankings', result, 604800);

    console.log('Key used for world rankings');
    return result;
  }
  console.log('Cache used for world rankings');
  return players;
};

const saveNewGamePlayers = async (data) => {
  try {
    const playerQueries = data.players.map(async (player) => {
      const golferQueries = player.golfers.map(async (golfer, index) => {
        const query = 'INSERT INTO public.game_info_player'
          + ' (game_id, player_id, roster_number, player_name, golfer_name, golfer_id)'
          + ' VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (game_id, player_id, roster_number) DO UPDATE SET'
          + ' game_id = $1, player_id = $2, roster_number = $3, player_name = $4, golfer_name = $5,'
          + ' golfer_id = $6';
        const params = [
          data.game,
          player.id,
          index,
          player.name,
          golfer.name,
          golfer.id
        ];
        const queryResponse = await db.query(query, params);
        return queryResponse;
      });
      return Promise.all(golferQueries);
    });
    return Promise.all(playerQueries);
  } catch (error) {
    console.log('Save new game players: ', error);
    throw error;
  }
};

const saveNewGame = async (players) => {
  // console.log(players);
  try {
    const query = 'INSERT INTO public.game_info'
    + ' (game_id, tournament_id, tournament_name)'
    + ' VALUES ($1, $2, $3) ON CONFLICT (game_id)'
    + ' DO UPDATE SET game_id = $1, tournament_id = $2, tournament_name = $3';
    const id = '71111111-1111-1111-1111-111111111111';
    const tournament = getNextTournament();
    const params = [id, tournament.id, tournament.name];
    const response = await db.query(query, params);

    saveNewGamePlayers({ game: id, players });
    return response;
  } catch (error) {
    console.log('Save new game error: ', error);
    throw error;
  }
};

const updateCurrentGames = async (gameKey) => {
  const currentGames = cache.get('currentGames');

  if (currentGames === undefined) {
    cache.set('currentGames', [gameKey]);
    return;
  }
  currentGames.push(gameKey);
  cache.set('currentGames', currentGames);
};

const getCurrentRoundScores = async (request) => {
  try {
    const { gameId, round } = request;
    const gameKey = `${gameId}-${round}`;

    const currentRound = cache.get(gameKey);

    if (currentRound !== undefined) {
      console.log('Cache used for current round');
      return currentRound;
    }

    const query = 'SELECT * FROM public.game_info JOIN public.game_info_player ON'
    + ' (public.game_info_player.game_id = public.game_info.game_id) JOIN public.golfer_scores'
    + ' ON (public.golfer_scores.tournament_id = public.game_info.tournament_id AND public.golfer_scores.golfer_id ='
    + ' public.game_info_player.golfer_id)'
    + ' WHERE public.game_info.game_id = $1 and public.golfer_scores.round = $2';
    const params = [gameId, round];
    const response = await db.query(query, params);

    if (response.rows.length <= 0) {
      return [];
    }
    const tournament = getTournamentById(response.rows[0].tournament_id);
    const { holes } = tournament.venue.courses[0];
    console.log(tournament.name);

    const players = [...new Set(response.rows.map(x => x.player_name))];
    const result = [];
    players.forEach((player) => {
      let golfers = response.rows.filter(x => x.player_name === player);
      golfers = golfers.map((x) => {
        // eslint-disable-next-line no-param-reassign
        x.holes = holes;
        return x;
      });
      // golfers[0].holes = holes;
      result.push(golfers);
    });
    cache.set(`${gameId}-${round}`, result, 600); // Figure out way to del cache on score update

    updateCurrentGames(gameKey);

    return result;
  } catch (error) {
    console.log('Get current round error: ', error);
    throw error;
  }
};

const checkNaN = x => (x === 0 || !x);

const min = (a, b, c, d) => {
  if (checkNaN(a) && checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return 0;
  }
  if (!checkNaN(a) && checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return a;
  }
  if (!checkNaN(a) && !checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return Math.min(a, b);
  }
  if (!checkNaN(a) && checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return Math.min(a, c);
  }
  if (!checkNaN(a) && checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return Math.min(a, d);
  }
  if (!checkNaN(a) && !checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return Math.min(a, b, c);
  }
  if (!checkNaN(a) && !checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return Math.min(a, b, d);
  }
  if (!checkNaN(a) && checkNaN(b) && !checkNaN(c) && !checkNaN(d)) {
    return Math.min(a, c, d);
  }
  if (checkNaN(a) && !checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return b;
  }
  if (checkNaN(a) && !checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return Math.min(b, c);
  }
  if (checkNaN(a) && !checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return Math.min(b, d);
  }
  if (checkNaN(a) && !checkNaN(b) && !checkNaN(c) && !checkNaN(d)) {
    return Math.min(b, c, d);
  }
  if (checkNaN(a) && checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return c;
  }
  if (checkNaN(a) && checkNaN(b) && !checkNaN(c) && !checkNaN(d)) {
    return Math.min(c, d);
  }
  if (checkNaN(a) && checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return d;
  }

  return Math.min(a, b, c, d);
};

const toPar = (round, tournament, number) => {
  const scores = round.map(x => x.scores);
  const best = _.zipWith(...scores, (a, b, c, d) => min(a, b, c, d));
  const { holes } = tournament.venue.courses[0];
  const reducer = (total, num, i) => (num === 0 ? total : total + (num - holes[i].par));
  const par = best.reduce(reducer, 0);

  return {
    toPar: par,
    round: number
  };
};

const sortRounds = (a, b) => {
  if (a.round < b.round) {
    return -1;
  }
  if (a.round > b.round) {
    return 1;
  }
  return 0;
};

const summarizeAllRounds = (data, tournament) => {
  // const tournament = getCurrentTournament();
  // const { holes } = tournament.venue.courses[0];
  const result = data.map((player) => {
    const rounds = player.map(round => toPar(round, tournament, round[0].round));
    rounds.sort(sortRounds);
    const reducer = (total, x) => total + x.toPar;
    return ({
      player: player[0][0].player_name,
      player_id: player[0][0].player_id,
      rounds,
      total: rounds.reduce(reducer, 0),
      tournament: tournament.name
    });
  });


  return result;
};

const getTotalRoundScores = async (gameId) => {
  try {
    const query = 'SELECT * FROM public.game_info JOIN public.game_info_player ON'
      + ' (public.game_info_player.game_id = public.game_info.game_id) JOIN public.golfer_scores'
      + ' ON (public.golfer_scores.tournament_id = public.game_info.tournament_id AND public.golfer_scores.golfer_id ='
      + ' public.game_info_player.golfer_id)'
      + ' WHERE public.game_info.game_id = $1';
    const params = [gameId];
    const response = await db.query(query, params);
    const tournament = getTournamentById(response.rows[0].tournament_id);

    const players = [...new Set(response.rows.map(x => x.player_name))];
    const result = [];
    players.forEach((player) => {
      const golfers = response.rows.filter(x => x.player_name === player);
      const uniqueRounds = [...new Set(golfers.map(x => x.round))];
      const rounds = [];
      uniqueRounds.forEach((round) => {
        const temp = golfers.filter(y => y.round === round);
        rounds.push(temp);
      });
      result.push(rounds);
    });

    return summarizeAllRounds(result, tournament);
  } catch (error) {
    console.log('Get current round error: ', error);
    throw error;
  }
};

module.exports = {
  getNextTournament,
  updateScores,
  updateScoreByRound,
  getWorldRankings,
  saveNewGame,
  getCurrentRoundScores,
  getTotalRoundScores
};
