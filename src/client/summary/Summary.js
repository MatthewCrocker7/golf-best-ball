import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SummaryCard from './SummaryCard';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: 'auto',
    height: '100vh'
  },
  textStyle: {
    margin: '0.5%',
    textAlign: 'center',
  }
});

const mapStateToProps = state => ({
  players: state.players,
});

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allRounds: []
    };
  }

  componentDidMount() {
    this.getAllRounds();
  }

  getAllRounds = async () => {
    const gameId = '61111111-1111-1111-1111-111111111111';
    try {
      let response = await fetch(`/api/pga/getAllRounds/${gameId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      console.log(response);
      this.setState({ allRounds: response });
    } catch (error) {
      console.log('Get all rounds error: ', error);
      throw error;
    }
  }

  render() {
    const { classes } = this.props;
    const { allRounds } = this.state;

    return (
      <div className={classes.root}>
        {allRounds.length > 0 && (
          <Typography className={classes.textStyle} color="secondary" variant="h4">
            {allRounds[0].tournament}
          </Typography>
        )}
        <SummaryCard allRounds={allRounds} />
      </div>
    );
  }
}

Summary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Summary));
