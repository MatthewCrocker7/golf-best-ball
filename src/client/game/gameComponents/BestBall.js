import React from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

const BestBall = (props) => {
  const { classes } = props;

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Best
        </TableCell>
        {seed.holeData.map(hole => (
          <TableCell key={hole.hole} align="center">
            {hole.hole}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};

export default BestBall;
