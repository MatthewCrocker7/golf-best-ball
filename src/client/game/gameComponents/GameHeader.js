import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

const GameHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Hole</TableCell>
        {seed.holeData.map(hole => (
          <TableCell key={hole} align="right" component="th" scope="row">
            {hole.hole}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell>Par</TableCell>
        {seed.holeData.map(hole => (
          <TableCell key={hole} align="right" component="th" scope="row">
            {hole.par}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default GameHeader;
