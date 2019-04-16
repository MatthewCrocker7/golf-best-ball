import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Header from './components/Header';
import Game from './game/Game';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
  },
  divider: {
    marginTop: '2%',
    marginBottom: '2%',
  },
  textStyle: {
    textAlign: 'center'
  }
});

const App = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Header />
      <Divider className={classes.divider} color="primary" />
      <Game />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
