const rp = require('request-promise');
const NodeCache = require('node-cache');
const db = require('../../db');
const schedule = require('./pgaSchedule');

const cache = new NodeCache();
const KEY = 'djuje9atsqnkcfp5egh2zsum';

const getTournament = () => {
  const startDate = new Date().toISOString().split('T')[0];
  const result = schedule.tournaments.filter(x => (x.start_date >= startDate));

  return result[0];
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
    const result = response.players.map(x => (
      {
        name: `${x.first_name} ${x.last_name}`,
        rank: x.rank
      }
    ));
    cache.set('worldRankings', result);

    console.log('Key used');
    return result;
  }
  console.log('Key not used');
  return players;
};

const saveNewGame = async (data) => {
  try {
    const query = 'INSERT INTO public."GAME_INFO"'
    + ' (GAME_ID, TOURNAMENT_ID, TOURNAMENT_NAME, PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR)'
    + ' VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (GAME_ID)'
    + ' DO UPDATE SET GAME_ID = $1, TOURNAMENT_ID = $2, TOURNAMENT_NAME = $3, PLAYER_ONE = $4,'
    + ' PLAYER_TWO = $5, PLAYER_THREE = $6, PLAYER_FOUR = $7';
    const id = '11111111-1111-1111-1111-111111111111';
    const tournament = getTournament();
    const params = [id, tournament.id, tournament.name, 'Matthew', 'Dentyn', 'Jon', 'Drew'];
    const response = await db.query(query, params);
    return {};
  } catch (error) {
    console.log('Save error: ', error);
    throw error;
  }
};

module.exports = {
  getTournament,
  getWorldRankings,
  saveNewGame
};
