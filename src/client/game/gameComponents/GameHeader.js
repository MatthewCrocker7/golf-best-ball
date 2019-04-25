import React from 'react';
// import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

const styles = () => ({
  root: {

  },
});

const sum = holes => holes.map(x => x.par).reduce((total, num) => total + num);

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
        <TableCell align="center">
          Total
        </TableCell>
        <TableCell align="center" />
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
        <TableCell align="center">
          {sum(seed.holeData)}
        </TableCell>
        <TableCell align="center">
          To Par
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default GameHeader;
