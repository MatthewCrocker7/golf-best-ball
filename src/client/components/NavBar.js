import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import actions from '../redux/actions/actions';
import NavBarButton from './NavBarButton';

const styles = () => ({
  root: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#ffffff'
  },
  buttonContainer: {
    width: '24%',
    marginLeft: '10%',
    display: 'flex',
    margin: 0
  }
});

const mapDispatchToProps = dispatch => ({
  selectNav: value => dispatch(actions.updateNav(value))
});

class NavBar extends React.Component {
  state = {
    selected: 0
  };

  handleChange = (value) => {
    const { selectNav } = this.props;
    selectNav({ value });
    this.setState({ selected: value });
  }

  render() {
    const { classes } = this.props;
    const { selected } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <NavBarButton onChange={this.handleChange} value={0} selected={selected} text="Draft" />
          <NavBarButton onChange={this.handleChange} value={1} selected={selected} text="Round" />
          <NavBarButton onChange={this.handleChange} value={2} selected={selected} text="Scores" />
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  selectNav: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(NavBar));
