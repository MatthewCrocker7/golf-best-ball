import React from 'react';
import PropTypes from 'prop-types';
import { StickyContainer, Sticky } from 'react-sticky';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlayerTurn from './PlayerTurn';
import DraftBoard from './DraftBoard';
import GolferInfo from './GolferInfo';

const styles = () => ({
  root: {
    width: 'auto',
    height: '100%',
    display: 'block',
    margin: 'auto'
  },
  gridRoot: {
    width: 'auto',
    marginLeft: '0.5%',
    marginRight: '0.5%',
  },
  paperStyle: {
    width: 'auto',
    height: 'auto',
    marginTop: 'auto',
    overflowX: 'visible',
  },
  textStyle: {
    margin: '0.5%',
    textAlign: 'center',
  }
});

const Draft = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.textStyle} color="secondary" variant="h4">Upcoming Tournament</Typography>
      <StickyContainer>
        <Grid className={classes.gridRoot} container spacing={16}>
          <Grid item xs={4}>
            <Sticky topOffset={-80}>
              {({ style, isSticky }) => (
                <Paper style={{ ...style, marginTop: isSticky ? '80px' : '0px' }} className={classes.paperStyle}>
                  <PlayerTurn />
                </Paper>
              )}
            </Sticky>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paperStyle}>
              <DraftBoard />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Sticky topOffset={-80}>
              {({ style, isSticky }) => (
                <Paper style={{ ...style, marginTop: isSticky ? '80px' : '0px' }} className={classes.paperStyle}>
                  <GolferInfo />
                </Paper>
              )}
            </Sticky>
          </Grid>
        </Grid>
      </StickyContainer>
    </div>
  );
};

Draft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Draft);
