import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: '0px',
    backgroundColor: '#0a8116'
  },
  textStyle: {
    textAlign: 'center'
  },
  navText: {
    textAlign: 'left'
  }
});

const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.textStyle} variant="h2" color="primary">Best Ball</Typography>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
