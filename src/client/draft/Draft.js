import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlayerTurn from './PlayerTurn';
import DraftBoard from './DraftBoard';
import GolferInfo from './GolferInfo';

const styles = () => ({
  root: {
    width: 'auto',
    height: '100%',
    display: 'block',
    margin: 'auto'
  },
  gridRoot: {
    width: 'auto',
    marginLeft: '0.5%',
    marginRight: '0.5%',
  },
  paperStyle: {
    width: 'auto',
    height: 'auto',
    marginTop: 'auto',
    overflowX: 'visible',
  },
  textStyle: {
    margin: '0.5%',
    textAlign: 'center',
  }
});

const mapStateToProps = state => ({
  players: state.players,
  selectedGolfer: state.selectedGolfer,
  draft: state.draft,
  draftBoard: state.draftBoard
});

class Draft extends React.Component {
  state = {
    nextTournament: ''
  };

  componentDidMount = async () => {
    try {
      let response = await fetch('/api/pga/getTournament', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        response = await response.json();
        this.setState({ nextTournament: response.tournament.name });
      } else {
        this.setState({ nextTournament: 'None this weekend' });
      }
      // console.log(response);
    } catch (error) {
      console.log('Error getting next tournament.');
      throw error;
    }
  };

  render() {
    const {
      classes,
      draft,
      draftBoard,
      players,
      selectedGolfer
    } = this.props;
    const { nextTournament } = this.state;

    return (
      <div className={classes.root}>
        <Typography className={classes.textStyle} color="secondary" variant="h4">{`Drafting For - ${nextTournament}`}</Typography>
        <StickyContainer>
          <Grid className={classes.gridRoot} container spacing={16}>
            <Grid item xs={6}>
              <Sticky topOffset={-40}>
                {({ style, isSticky }) => (
                  <Paper style={{ ...style, marginTop: isSticky ? '40px' : '0px' }} className={classes.paperStyle}>
                    <PlayerTurn draft={draft} players={players} selectedGolfer={selectedGolfer} />
                  </Paper>
                )}
              </Sticky>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paperStyle}>
                <DraftBoard draftBoard={draftBoard} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Sticky topOffset={-40}>
                {({ style, isSticky }) => (
                  <Paper style={{ ...style, marginTop: isSticky ? '40px' : '0px' }} className={classes.paperStyle}>
                    <GolferInfo />
                  </Paper>
                )}
              </Sticky>
            </Grid>
          </Grid>
        </StickyContainer>
      </div>
    );
  }
}

Draft.propTypes = {
  classes: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
  draftBoard: PropTypes.array.isRequired,
  selectedGolfer: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Draft));
