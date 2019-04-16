import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import GameHeader from './gameComponents/GameHeader';
import Golfer from './gameComponents/Golfer';
import BestBall from './gameComponents/BestBall';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    border: '1px solid #34568f',
    margin: '10px'
  },
});

const Golfers = [
  'Tiger',
  'Dustin',
  'Jordan',
  'Tony'
];

let id = 1;

const Player = (props) => {
  const { classes, playerId } = props;
  return (
    <div className={classes.root}>
      <Table padding="dense">
        <GameHeader />
        {Golfers.map(golfer => (
          <Golfer key={id++} golfer={golfer} />
        ))}
        <BestBall />
      </Table>
    </div>
  );
};

Player.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Player);
