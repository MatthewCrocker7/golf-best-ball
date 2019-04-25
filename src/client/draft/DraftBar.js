import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import actions from '../redux/actions/actions';

const styles = theme => ({
  draftHeader: {
    width: '100%',
    display: 'flex',
    margin: 'auto',
    marginTop: '1%'
  },
  buttonStyle: {
    margin: 'auto',
    width: '30%',
    marginRight: '5%',
  },
  textStyle: {
    textAlign: 'left',
    marginLeft: '2%',
    margin: 'auto',
    fontWeight: theme.typography.fontWeightRegular * 2,
  },
  textComplete: {
    textAlign: 'center',
    margin: 'auto',
    fontWeight: theme.typography.fontWeightRegular * 2,
  }
});

const validateData = (golfer) => {
  if (golfer === '') {
    return false;
  }
  return true;
};

const mapDispatchToProps = dispatch => ({
  draftGolfer: value => dispatch(actions.draftGolfer(value))
});


class DraftBar extends React.Component {
  state = {
    index: 0,
    snakeUp: true
  }

  snakeDraft = () => {
    const { players } = this.props;
    const { index, snakeUp } = this.state;

    if (snakeUp) {
      if (index === players.length - 1) {
        this.setState({ snakeUp: false });
      } else {
        this.setState({ index: index + 1 });
      }
    } else if (index === 0) {
      this.setState({ snakeUp: true });
    } else {
      this.setState({ index: index - 1 });
    }
  }

  draft = () => {
    const { draftGolfer, players, selectedGolfer } = this.props;
    const { index } = this.state;

    if (!validateData(selectedGolfer)) {
      return;
    }

    draftGolfer({
      name: players[index].name,
      golfer: selectedGolfer
    });

    this.snakeDraft();
  };

  render() {
    const {
      classes,
      players,
      selectedGolfer,
      draftComplete
    } = this.props;
    const { index } = this.state;

    return (
      <div>
        { draftComplete
          ? (
            <Typography variant="h4" color="secondary" className={classes.textComplete}>Draft Completed</Typography>
          )
          : (
            <div className={classes.draftHeader}>
              <Typography className={classes.textStyle} variant="h6" color="secondary">{`Drafting: ${players[index].name}`}</Typography>
              <Button className={classes.buttonStyle} onClick={this.draft} size="large" variant="contained" color="secondary">Draft</Button>
            </div>
          )}
        { !draftComplete && <Typography className={classes.textStyle} variant="h6" color="secondary">{`Selected: ${selectedGolfer}`}</Typography>}
      </div>
    );
  }
}

DraftBar.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedGolfer: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  draftGolfer: PropTypes.func.isRequired,
  draftComplete: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DraftBar));
