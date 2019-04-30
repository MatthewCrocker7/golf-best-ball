import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import actions from '../redux/actions/actions';
import seed from '../game/gameComponents/seed';

const styles = theme => ({
  root: {
    width: 'auto',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  textStyle: {
    textAlign: 'left',
    wordWrap: 'break-word',
    marginLeft: '1%'
  }
});

const mapDispatchToProps = dispatch => ({
  selectGolfer: value => dispatch(actions.updateSelected(value)),
  setDraftBoard: value => dispatch(actions.setDraftBoard(value))
});

// const getGolferByIndex = index => seed.golfRankings.filter(x => x.rank === index)[0].name;

class DraftBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
    };

    this.getRankings();
  }

  getRankings = async () => {
    const { setDraftBoard } = this.props;
    try {
      let response = await fetch('/api/pga/getWorldRankings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        response = await response.json();
        setDraftBoard({ value: response });
        // console.log(response);
      }
    } catch (error) {
      console.log('Error getting next tournament.');
      throw error;
    }
  }

  handleListItemClick = (_event, name, rank) => {
    const { selectGolfer } = this.props;
    selectGolfer({ name, rank });
    this.setState({ selectedIndex: rank });
  };

  render() {
    const { classes, draftBoard } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div className={classes.root}>
        <List dense component="ul">
          {draftBoard.map(x => (
            <ListItem
              key={x.name}
              button
              selected={selectedIndex === x.rank}
              onClick={event => this.handleListItemClick(event, x.name, x.rank)}
            >
              <ListItemText
                primary={x.name}
                secondary={(
                  <React.Fragment>
                    {'Rank - '}
                    {x.rank}
                  </React.Fragment>
                )}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

/*
      {seed.golfRankings.map(x => (
        <Typography key={x.name} className={classes.textStyle} variant="h6" color="secondary">
          {x.rank}
          {' - '}
          {x.name}
        </Typography>
      ))}
      */

DraftBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  draftBoard: PropTypes.array.isRequired,
  selectGolfer: PropTypes.func.isRequired,
  setDraftBoard: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DraftBoard));
