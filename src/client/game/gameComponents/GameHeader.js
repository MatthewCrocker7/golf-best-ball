import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const sum = holes => holes.map(x => x.par).reduce((total, num) => total + num);

const GameHeader = (props) => {
  const { holes } = props;
  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Hole
        </TableCell>
        {holes.map(hole => (
          <TableCell key={hole.number} align="center">
            {hole.number}
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
        {holes.map(hole => (
          <TableCell key={hole.number} align="center">
            {hole.par}
          </TableCell>
        ))}
        <TableCell align="center">
          {sum(holes)}
        </TableCell>
        <TableCell align="center">
          To Par
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

GameHeader.propTypes = {
  holes: PropTypes.array.isRequired
};

export default GameHeader;
