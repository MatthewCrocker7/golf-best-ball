const Router = require('express-promise-router');

const router = new Router();

router.get('/getTournament', async (req, res) => {
  console.log('get tournament');

  res.send({ tournament: 'name goes here' });
});

module.exports = router;
