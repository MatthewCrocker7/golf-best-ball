import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Game from './game/Game';
import Draft from './draft/Draft';

const styles = () => ({
  root: {
    width: 'auto',
    height: '100%',
    display: 'block',
    backgroundColor: '#EFF7FF'
  },
});

const mapStateToProps = state => ({
  nav: state.nav
});

const App = (props) => {
  const { classes, nav } = props;

  return (
    <div className={classes.root}>
      <Header />
      <NavBar />
      {nav === 0 && <Draft />}
      {nav === 1 && <Game />}
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  nav: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(App));
