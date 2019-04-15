import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import GameHeader from './gameComponents/GameHeader';
import Golfer from './gameComponents/Golfer';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
  },
});

const Golfers = [
  'Tiger',
  'Dustin',
  'Jordan',
  'Tony'
];

const Player = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Table>
        <GameHeader />
        {Golfers.map(golfer => (
          <Golfer golfer={golfer} />
        ))}
      </Table>
    </div>
  );
};

Player.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Player);
