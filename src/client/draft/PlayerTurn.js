import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = () => ({
  root: {
    width: 'auto',
    margin: 'auto'
  },
  textStyle: {
    textAlign: 'center',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  }
});

const PlayerTurn = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.textStyle} variant="h5" color="secondary">Hi</Typography>
    </div>
  );
};

PlayerTurn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayerTurn);
