import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    width: 'auto',
    margin: '0px',
    border: '1px solid #ffffff',
  },
  draftHeader: {
    width: '100%',
    display: 'flex',
    margin: 'auto',
    marginTop: '1%'
  },
  buttonStyle: {
    margin: 'auto',
    width: '30%',
    marginRight: '5%',
  },
  textStyle: {
    textAlign: 'left',
    marginLeft: '2%',
    margin: 'auto'
  }
});

const PlayerTurn = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.draftHeader}>
        <Typography className={classes.textStyle} variant="h6" color="secondary">Selecting: Name</Typography>
        <Button className={classes.buttonStyle} size="large" variant="contained" color="secondary">Draft</Button>
      </div>
      <Typography>filler</Typography>
    </div>
  );
};

PlayerTurn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayerTurn);
