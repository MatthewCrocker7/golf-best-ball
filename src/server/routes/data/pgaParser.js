const rp = require('request-promise');
const NodeCache = require('node-cache');
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

module.exports = {
  getTournament,
  getWorldRankings
};
