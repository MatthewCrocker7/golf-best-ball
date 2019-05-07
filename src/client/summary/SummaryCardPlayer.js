import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = () => ({
  root: {
    width: 'auto',
    margin: '10px',
    overflowX: 'auto',
  },
  textStyle: {
    textAlign: 'center'
  }
});

const SummaryCardPlayer = (props) => {
  const {
    classes,
    rounds,
    name,
    total
  } = props;
  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {name}
      </TableCell>
      {rounds.map(x => (
        <TableCell key={x.round} align="center" scope="row">
          {x.toPar}
        </TableCell>
      ))}
      <TableCell align="center" scope="row">
        {total}
      </TableCell>
    </TableRow>
  );
};

SummaryCardPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  rounds: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
};

export default withStyles(styles)(SummaryCardPlayer);
