import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const styles = () => ({
  root: {
    width: 'auto',
    display: 'flex',
    margin: 'auto',
  },
  buttonStyle: {
    marginLeft: '25%',
    marginTop: '0.5%',
    width: '15%',
    margin: 'auto',
    fontWeight: 'bold'
  },
  textStyle: {
    margin: 'auto',
    marginLeft: '-15%',
    marginTop: '0.5%',
    textAlign: 'center',
  }
});

class RefreshRound extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = async (event) => {
    console.log(event);

    const round = 4;
    console.log(round);


    try {
      let response = await fetch(`/api/pga/refreshScores/${round}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        response = await response.json();
        console.log(response);
      }
    } catch (error) {
      console.log('Refresh round error: ', error);
      throw error;
    }


    if (this.anchorEl.contains(event.target)) {
      console.log('something');
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, currentRound } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Button
          className={classes.buttonStyle}
          variant="outlined"
          color="secondary"
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          Refresh Data
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose} value={1}>Round 1</MenuItem>
                    <MenuItem onClick={this.handleClose} value={2}>Round 2</MenuItem>
                    <MenuItem onClick={this.handleClose} value={3}>Round 3</MenuItem>
                    <MenuItem onClick={this.handleClose} value={4}>Round 4</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {currentRound.length > 0 && (
          <Typography className={classes.textStyle} color="secondary" variant="h4">
            {`${currentRound[0][0].tournament_name} - Round ${currentRound[0][0].round}`}
          </Typography>
        )}
      </div>
    );
  }
}

RefreshRound.propTypes = {
  classes: PropTypes.object.isRequired,
  currentRound: PropTypes.array.isRequired,
  updateRound: PropTypes.func.isRequired
};

export default withStyles(styles)(RefreshRound);
