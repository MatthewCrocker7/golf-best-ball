import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

let id=1;

const Golfer = (props) => {
  const { name, scores } = props;
  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          {name}
        </TableCell>
        {scores.map(score => (
          <TableCell key={id++} align="center">
            {score}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};

Golfer.propTypes = {
  name: PropTypes.string.isRequired,
  scores: PropTypes.array.isRequired
};

export default Golfer;
