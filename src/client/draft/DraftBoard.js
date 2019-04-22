import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
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

class DraftBoard extends React.Component {
  state = {
    selectedIndex: -1
  };

  handleListItemClick = (_event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div className={classes.root}>
        <List component="ul">
          {seed.golfRankings.map(x => (
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DraftBoard);
