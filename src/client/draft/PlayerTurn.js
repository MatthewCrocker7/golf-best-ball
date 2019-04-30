import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DraftBar from './DraftBar';
import DraftSelection from './DraftSelection';

const styles = () => ({
  root: {
    width: 'auto',
    margin: '0px',
    border: '1px solid #ffffff',
  },
});

const sum = (acc, cur) => acc + cur;

const checkDraftCompletion = (players) => {
  const checkSum = players.length * 4;
  const count = players.map(x => x.golfers.length).reduce(sum);

  if (count === checkSum) {
    // Send to server, load game board
    return true;
  }
  return false;
};

const PlayerTurn = (props) => {
  const {
    classes,
    draft,
    players,
    selectedGolfer
  } = props;
  const draftComplete = checkDraftCompletion(players);
  return (
    <div className={classes.root}>
      <DraftBar
        draft={draft}
        players={players}
        selectedGolfer={selectedGolfer}
        draftComplete={draftComplete}
      />
      <DraftSelection players={players} />
    </div>
  );
};

PlayerTurn.propTypes = {
  classes: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
  selectedGolfer: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
};

export default withStyles(styles)(PlayerTurn);
