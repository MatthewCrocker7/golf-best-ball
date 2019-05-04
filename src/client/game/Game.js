import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PlayerScoreCard from './PlayerScoreCard';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: 'auto'
  },
  textStyle: {
    margin: '0.5%',
    textAlign: 'center',
  }
});

const mapStateToProps = state => ({
  players: state.players,
});

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRound: []
    };

    // this.getCurrentRound();
  }

  componentDidMount() {
    this.getCurrentRound();
  }

  getCurrentRound = async () => {
    const gameId = '21111111-1111-1111-1111-111111111111';
    try {
      let response = await fetch(`/api/pga/getCurrentRound/${gameId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      console.log(response);
      this.setState({ currentRound: response });
    } catch (error) {
      console.log('Get current round error: ', error);
      throw error;
    }
  }

  render() {
    const { classes } = this.props;
    const { currentRound } = this.state;

    return (
      <div className={classes.root}>
        {currentRound.length > 0 && (
          <Typography className={classes.textStyle} color="secondary" variant="h4">
            {`${currentRound[0][0].tournament_name} - Round ${currentRound[0][0].round}`}
          </Typography>
        )}
        {currentRound.map(player => (
          <PlayerScoreCard info={player} key={player[0].player_id} />
        ))}
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Game));
