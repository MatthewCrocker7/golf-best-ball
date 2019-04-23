import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import actions from '../redux/actions/actions';
import seed from '../game/gameComponents/seed';

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
});

const mapDispatchToProps = dispatch => ({
  selectGolfer: value => dispatch(actions.updateSelected(value))
});

class DraftBar extends React.Component {
  state = {
    selectingPlayer: seed.players[0],
  }

  draftGolfer = () => {
    const { selectedGolfer } = this.props;
    const { selectingPlayer } = this.state;

    this.setState({
      selectingPlayer: { ...selectingPlayer, golfers: [...selectingPlayer.golfers, selectedGolfer] }
    });
  };

  render() {
    const { classes } = this.props;
    const { selectingPlayer } = this.state;
    console.log(selectingPlayer);

    return (
      <div className={classes.draftHeader}>
        <Typography className={classes.textStyle} variant="h6" color="secondary">{`Drafting: ${selectingPlayer.name}`}</Typography>
        <Button className={classes.buttonStyle} onClick={this.draftGolfer} size="large" variant="contained" color="secondary">Draft</Button>
      </div>
    );
  }
}

DraftBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DraftBar));
