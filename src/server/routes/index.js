const users = require('./users/users');

module.exports = (app) => {
  app.use('/api/users', users);
};
