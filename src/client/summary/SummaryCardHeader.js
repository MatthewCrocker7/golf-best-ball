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

const SummaryCardHeader = (props) => {
  const { classes } = props;
  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        Players
      </TableCell>
      <TableCell align="center" scope="row">
        Round 1
      </TableCell>
      <TableCell align="center" scope="row">
        Round 2
      </TableCell>
      <TableCell align="center" scope="row">
        Round 3
      </TableCell>
      <TableCell align="center" scope="row">
        Round 4
      </TableCell>
      <TableCell align="center" scope="row">
        Total
      </TableCell>
    </TableRow>
  );
};

SummaryCardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SummaryCardHeader);
