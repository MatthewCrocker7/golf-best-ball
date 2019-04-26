const schedule = require('./pgaSchedule');

const getTournament = () => {
  const startDate = new Date().toISOString().split('T')[0];
  const result = schedule.tournaments.filter(x => (x.start_date >= startDate));

  return result[0];
};

module.exports = {
  getTournament
};
