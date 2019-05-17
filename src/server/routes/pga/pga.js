const Router = require('express-promise-router');
const pgaParser = require('../data/pgaParser');

const router = new Router();

/*
Draft should be for next tournament
Draft currently will have to overwrite existing game
Round screen should pull current round
Scores screen should update with round, but also persist round data for multiple days
Game screen should go to current tournament, if any or display "no active games"
Must collect updated tournament scores every 15 minutes, starting at first tee shot, ending at last
Must track tournament schedule - before a tourney give option to draft for new game
Draft period should be between World Rankings update and tournament start
Must update world golf ranks every Monday
Must keep track of players, and their golfers
*/

// pgaParser.updateScores();
setInterval(async () => {
  pgaParser.updateScores();
}, process.env.REFRESH_RATE);
// 14400000

router.get('/getWorldRankings', async (req, res) => {
  const rankings = await pgaParser.getWorldRankings();

  res.send(rankings);
});

router.get('/getTournament', async (req, res) => {
  const tournament = pgaParser.getNextTournament();
  // console.log(tournament.name);
  if (tournament) {
    res.send({ tournament });
  } else {
    res.sendStatus(404);
  }
});

router.post('/newGame/', async (req, res) => {
  pgaParser.saveNewGame(req.body.players);
  // console.log(response);
  res.sendStatus(200); // Should later check if request denied
});

router.get('/getCurrentRound/:gameId/:round', async (req, res) => {
  const response = await pgaParser.getCurrentRoundScores(req.params);

  if (response.length === 0) {
    res.sendStatus(200);
  } else {
    res.send(response);
  }
});

router.get('/getAllRounds/:gameId', async (req, res) => {
  const response = await pgaParser.getTotalRoundScores(req.params.gameId);

  res.send(response);
});

module.exports = router;
