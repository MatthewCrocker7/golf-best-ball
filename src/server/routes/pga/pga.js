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

1. Draft Complete
2. Saves new GAME_ID + players

3 Tables
1st
GAME_ID (server generated) | TOURNAMENT_ID | TOURNAMENT_NAME | PLAYER1 | PLAYER2| PLAYER3 | PLAYER4 Player should eventually be based on generated ID on account creation

2nd
PLAYER_ID | GAME_ID | GOLFER1 | GOLFER2 | GOLFER3 | GOLFER4 | SCORES

3rd
GOLFER | TOURNAMENT_ID | ROUND1_SCORES | ROUND2_SCORES | ROUND3_SCORES | ROUND4_SCORES
*/

router.get('/getWorldRankings', async (req, res) => {
  const rankings = await pgaParser.getWorldRankings();
  // console.log(rankings);

  res.send(rankings);
});

router.get('/getTournament', async (req, res) => {
  const tournament = pgaParser.getTournament();
  // console.log(tournament.name);
  if (tournament) {
    res.send({ tournament });
  } else {
    res.sendStatus(404);
  }
});

router.post('/newGame', async (req, res) => {
  const response = await pgaParser.saveNewGame(req);
  res.send({ test: 'hi' });
});

module.exports = router;
