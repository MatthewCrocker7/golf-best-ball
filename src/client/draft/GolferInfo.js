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

const GolferInfo = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.textStyle} variant="h5" color="secondary">Golfer info goes here</Typography>
      <Typography className={classes.textStyle} variant="h5" color="secondary">Display recent stats, history of the selected golfer</Typography>
    </div>
  );
};

GolferInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GolferInfo);
