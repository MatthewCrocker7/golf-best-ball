import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

let id=1;

const Golfer = (props) => {
  const { golfer } = props;
  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          {golfer}
        </TableCell>
        {seed.golferData[golfer].map(score => (
          <TableCell key={id++} align="center">
            {score}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};

Golfer.propTypes = {
  golfer: PropTypes.string.isRequired
};

export default Golfer;
