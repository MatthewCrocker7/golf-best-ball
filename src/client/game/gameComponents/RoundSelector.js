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
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'flex',
    margin: 'auto',
  },
  buttonStyle: {
    marginLeft: '5%',
    marginTop: '0.5%',
    width: '15%',
    margin: 'auto',
    fontWeight: theme.typography.fontWeightRegular * 2,
  },
  textStyle: {
    margin: 'auto',
    marginLeft: '-15%',
    marginTop: '0.5%',
    textAlign: 'center',
  }
});

const mapDispatchToProps = dispatch => ({
  updateRound: value => dispatch(actions.updateRound(value))
});

class RoundSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    const { updateRound } = this.props;

    if (this.anchorEl.contains(event.target)) {
      return;
    }

    updateRound(event.target.value);
    this.setState({ open: false });
  };

  render() {
    const { classes, currentRound } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Button
          className={classes.buttonStyle}
          color="secondary"
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          Select Round
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

RoundSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  currentRound: PropTypes.array.isRequired,
  updateRound: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(RoundSelector));
