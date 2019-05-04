import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import GameHeader from './gameComponents/GameHeader';
import Golfer from './gameComponents/Golfer';
import BestBall from './gameComponents/BestBall';

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
  const { classes, info } = props;
  return (
    <Paper className={classes.root}>
      <Typography color="secondary" className={classes.textStyle} variant="h5">{info[0].player_name}</Typography>
      <Table padding="dense">
        <GameHeader />
        {
          info.map(x => (
            <Golfer key={x.golfer_id} name={x.golfer_name} scores={x.scores} />
          ))
        }
        <BestBall data={info} />
      </Table>
    </Paper>
  );
};

PlayerScoreCard.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.array.isRequired
};

export default withStyles(styles)(PlayerScoreCard);
