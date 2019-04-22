import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Player from './PlayerScoreCard';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: 'auto'
  }
});

const Game = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Player name="Matthew" playerId={1} />
      <Player name="Drew" playerId={1} />
      <Player name="Jonathan" playerId={1} />
      <Player name="Dentyn" playerId={1} />
    </div>
  );
};

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
