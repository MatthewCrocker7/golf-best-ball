import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import GameHeader from './gameComponents/GameHeader';
import Golfer from './gameComponents/Golfer';
import BestBall from './gameComponents/BestBall';
import seed from './gameComponents/seed';

const styles = () => ({
  root: {
    width: 'auto',
    margin: '10px',
    overflowX: 'auto',
  },
  textStyle: {
    textAlign: 'center'
  }
});

const PlayerScoreCard = (props) => {
  const { classes, name } = props;
  return (
    <Paper className={classes.root}>
      <Typography color="secondary" className={classes.textStyle} variant="h5">{name}</Typography>
      <Table padding="dense">
        <GameHeader />
        {seed.golferData.map(golfer => (
          <Golfer key={golfer.name} name={golfer.name} scores={golfer.scores} />
        ))}
        <BestBall data={seed.golferData} />
      </Table>
    </Paper>
  );
};

PlayerScoreCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(PlayerScoreCard);
