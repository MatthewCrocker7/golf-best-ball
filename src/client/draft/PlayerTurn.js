import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DraftBar from './DraftBar';
import seed from '../game/gameComponents/seed';

const styles = theme => ({
  root: {
    width: 'auto',
    margin: '0px',
    border: '1px solid #ffffff',
  },
  textStyle: {
    textAlign: 'left',
    marginLeft: '2%',
    margin: 'auto',
    fontWeight: theme.typography.fontWeightRegular * 2,
  },
  listRoot: {
    width: 'auto',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  listHeader: {
    color: '#000000',
    fontWeight: theme.typography.fontWeightRegular * 1.5,
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

const mapStateToProps = state => ({
  players: state.players,
  selectedGolfer: state.selectedGolfer
});

class PlayerTurn extends React.Component {
  draftGolfer = () => {
    const { players, selectedGolfer } = this.props;
    /*
    this.setState({
      selectingPlayer: { ...selectingPlayer, golfers: [...selectingPlayer.golfers, selectedGolfer] }
    });
    */
  };

  render() {
    const { classes, players, selectedGolfer } = this.props;

    return (
      <div className={classes.root}>
        <DraftBar players={players} selectedGolfer={selectedGolfer} />
        <Typography className={classes.textStyle} variant="h6" color="secondary">{`Selected: ${selectedGolfer}`}</Typography>
        <List className={classes.listRoot} subheader={<li />}>
          {players.map(player => (
            <li key={`${player.name}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader disableSticky className={classes.listHeader}>{`${player.name}`}</ListSubheader>
                {player.golfers.map(x => (
                  <ListItem key={`${player}-${x}`}>
                    <ListItemText primary={`${x}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </div>
    );
  }
}

PlayerTurn.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedGolfer: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(PlayerTurn));
