const users = require('./users/users');
const pga = require('./pga/pga');

module.exports = (app) => {
  app.use('/api/users', users);
  app.use('/api/pga', pga);
};
