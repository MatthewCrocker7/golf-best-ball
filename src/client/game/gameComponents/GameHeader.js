import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

const GameHeader = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Hole
        </TableCell>
        {seed.holeData.map(hole => (
          <TableCell key={hole.hole} align="center">
            {hole.hole}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Par
        </TableCell>
        {seed.holeData.map(hole => (
          <TableCell key={hole.hole} align="center">
            {hole.par}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};

export default GameHeader;
