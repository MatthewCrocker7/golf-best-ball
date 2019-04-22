import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'block',
    margin: 'auto'
  },
  gridStyle: {

  },
  textStyle: {
    textAlign: 'center'
  }
});

const Draft = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.textStyle} color="secondary" variant="h4">Upcoming Tournament</Typography>
      <Grid container spacing={16}>
        <Grid item xs={3}>
          <Paper>
            <h1>test</h1>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <h1>test</h1>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <h1>test</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

Draft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Draft);
