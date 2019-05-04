const rp = require('request-promise');
const NodeCache = require('node-cache');
const db = require('../../db');
const schedule = require('./pgaSchedule');

const cache = new NodeCache();
const KEY = 'djuje9atsqnkcfp5egh2zsum';

const getNextTournament = () => {
  const startDate = new Date().toISOString().split('T')[0];
  const result = schedule.tournaments.filter(x => (x.start_date >= startDate));

  return result[0];
};

const getCurrentTournament = () => {
  const cur = new Date().toISOString().split('T')[0];
  const result = schedule.tournaments.filter(x => (x.start_date <= cur && x.end_date >= cur));

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

const updateScores = async () => {
  const round = getCurrentRound();
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
    cache.set('worldRankings', result);

    console.log('Key used');
    return result;
  }
  console.log('Key not used');
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
    const id = '11111111-1111-1111-1111-111111111111';
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

const getCurrentRoundScores = async (gameId) => {
  let round = getCurrentRound();
  if (round < 0) {
    // If it's later than Sunday but before Thursday, get round 4
    round = 4;
  }

  try {
    const query = 'SELECT * FROM public.game_info JOIN public.game_info_player ON'
    + ' (public.game_info_player.game_id = public.game_info.game_id) JOIN public.golfer_scores'
    + ' ON (public.golfer_scores.tournament_id = public.game_info.tournament_id AND public.golfer_scores.golfer_id ='
    + ' public.game_info_player.golfer_id)'
    + ' WHERE public.game_info.game_id = $1 and public.golfer_scores.round = $2';
    const params = [gameId, round];
    const response = await db.query(query, params);

    const players = [...new Set(response.rows.map(x => x.player_name))];
    const result = [];
    players.forEach((player) => {
      const golfers = response.rows.filter(x => x.player_name === player);
      result.push(golfers);
    });

    return result;
  } catch (error) {
    console.log('Get current round error: ', error);
    throw error;
  }
};

module.exports = {
  getNextTournament,
  updateScores,
  getWorldRankings,
  saveNewGame,
  getCurrentRoundScores
};
