import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import RoundSelector from './gameComponents/RoundSelector';
import PlayerScoreCard from './PlayerScoreCard';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: 'auto',
  },
  textStyle: {
    margin: '0.5%',
    textAlign: 'center',
  }
});

const mapStateToProps = state => ({
  players: state.players,
  round: state.round
});

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRound: [],
    };
  }

  componentDidMount() {
    this.getCurrentRound();
  }

  componentDidUpdate(prevProps) {
    const { round } = this.props;
    if (round !== prevProps.round) {
      this.getCurrentRound();
    }
  }

  getCurrentRound = async () => {
    const { round } = this.props;
    // const round = 4;
    const gameId = '31111111-1111-1111-1111-111111111111';
    try {
      let response = await fetch(`/api/pga/getCurrentRound/${gameId}/${round}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        response = await response.json();
        console.log(response);
        this.setState({ currentRound: response });
      }
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
        <RoundSelector currentRound={currentRound} />
        {currentRound.map(player => (
          <PlayerScoreCard info={player} key={player[0].player_id} />
        ))}
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  round: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Game));
