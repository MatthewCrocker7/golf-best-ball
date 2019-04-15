import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
  },
  textStyle: {
    textAlign: 'center'
  }
});

const App = (props) => {
  const { classes } = props;
  return (
    <div>
      <Typography className={classes.textStyle} variant="h1" color="primary">Best Ball</Typography>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
