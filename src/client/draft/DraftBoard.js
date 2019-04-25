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
  selectGolfer: value => dispatch(actions.updateSelected(value))
});

const getGolferByIndex = index => seed.golfRankings.filter(x => x.rank === index)[0].name;

class DraftBoard extends React.Component {
  state = {
    selectedIndex: -1
  };

  handleListItemClick = (_event, index) => {
    const { selectGolfer } = this.props;
    selectGolfer({ value: getGolferByIndex(index) });
    this.setState({ selectedIndex: index });
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
              onClick={event => this.handleListItemClick(event, x.rank)}
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
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(DraftBoard));
