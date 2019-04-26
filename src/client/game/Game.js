import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PlayerScoreCard from './PlayerScoreCard';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: 'auto'
  }
});

const mapStateToProps = state => ({
  players: state.players,
});

const Game = (props) => {
  const { classes, players } = props;
  return (
    <div className={classes.root}>
      {players.map(player => (
        <PlayerScoreCard key={player.name} name={player.name} golfers={player.golfers} />
      ))}
      <PlayerScoreCard name="Matthew" />
      <PlayerScoreCard name="Drew" />
      <PlayerScoreCard name="Jonathan" />
      <PlayerScoreCard name="Dentyn" />
    </div>
  );
};

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Game));
