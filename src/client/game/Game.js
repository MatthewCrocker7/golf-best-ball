import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Player from './Player';

const styles = () => ({
  root: {
    width: '100%',
    display: 'block',
    margin: 'auto'
  }
});

const Game = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Player playerId={1} />
    </div>
  );
};

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
