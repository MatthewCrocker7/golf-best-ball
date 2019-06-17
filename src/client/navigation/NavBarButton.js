import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '33%',
    display: 'block',
    margin: '0px',
    backgroundColor: '#ffffff'
  },
  rootLoaded: {
    width: '33%',
    display: 'block',
    margin: '0px',
    backgroundColor: '#ffffff',
    borderBottom: '3px solid #0a8116',
  },
  text: {
    textAlign: 'center',
    color: '#0a8116',
    fontWeight: theme.typography.fontWeightRegular
  },
  textLoaded: {
    textAlign: 'center',
    color: '#0a8116',
    fontWeight: theme.typography.fontWeightRegular * 2,
  },
});

const NavBarButton = (props) => {
  const {
    classes,
    text,
    selected,
    value,
    onChange
  } = props;
  return (
    <ButtonBase
      onClick={() => onChange(value)}
      className={value === selected ? classes.rootLoaded : classes.root}
    >
      <Typography className={value === selected ? classes.textLoaded : classes.text} variant="h6">{text}</Typography>
    </ButtonBase>
  );
};

NavBarButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(NavBarButton);
