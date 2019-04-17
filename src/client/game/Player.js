import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import GameHeader from './gameComponents/GameHeader';
import Golfer from './gameComponents/Golfer';
import BestBall from './gameComponents/BestBall';
import seed from './gameComponents/seed';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'flex',
    border: '1px solid #34568f',
    margin: '10px',
    padding: '1px'
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
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.component} variant="h5">Matthew</Typography>
      <Table padding="dense">
        <GameHeader />
        {seed.golferData.map(golfer => (
          <Golfer key={golfer.name} name={golfer.name} scores={golfer.scores} />
        ))}
        <BestBall data={seed.golferData} />
      </Table>
    </div>
  );
};

Player.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Player);
