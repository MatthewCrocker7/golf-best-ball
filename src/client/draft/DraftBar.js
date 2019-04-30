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
  draftGolfer: value => dispatch(actions.draftGolfer(value)),
  updateDraft: value => dispatch(actions.updateDraft(value))
});


class DraftBar extends React.Component {
  snakeDraft = () => {
    const { draft, players, updateDraft } = this.props;

    if (draft.snakeUp) {
      if (draft.index === players.length - 1) {
        updateDraft({ snakeUp: false, index: draft.index });
      } else {
        updateDraft({ snakeUp: draft.snakeUp, index: draft.index + 1 });
      }
    } else if (draft.index === 0) {
      updateDraft({ snakeUp: true, index: draft.index });
    } else {
      updateDraft({ snakeUp: draft.snakeUp, index: draft.index - 1 });
    }
  }

  draft = () => {
    const {
      draft,
      draftGolfer,
      players,
      selectedGolfer
    } = this.props;

    if (!validateData(selectedGolfer)) {
      return;
    }

    draftGolfer({
      name: players[draft.index].name,
      golfer: selectedGolfer.name
    });

    this.snakeDraft();
  };

  render() {
    const {
      classes,
      draft,
      players,
      selectedGolfer,
      draftComplete
    } = this.props;

    return (
      <div>
        { draftComplete
          ? (
            <Typography variant="h4" color="secondary" className={classes.textComplete}>Draft Completed</Typography>
          )
          : (
            <div className={classes.draftHeader}>
              <Typography className={classes.textStyle} variant="h6" color="secondary">{`Drafting: ${players[draft.index].name}`}</Typography>
              <Button className={classes.buttonStyle} onClick={this.draft} size="large" variant="contained" color="secondary">Draft</Button>
            </div>
          )}
        { !draftComplete && <Typography className={classes.textStyle} variant="h6" color="secondary">{`Selected: ${selectedGolfer.name}`}</Typography>}
      </div>
    );
  }
}

DraftBar.propTypes = {
  classes: PropTypes.object.isRequired,
  draft: PropTypes.object.isRequired,
  selectedGolfer: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  draftGolfer: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  draftComplete: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DraftBar));
