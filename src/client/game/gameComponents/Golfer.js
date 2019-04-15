import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

const Golfer = (props) => {
  const { golfer } = props;
  return (
    <TableBody>
      <TableRow key={golfer}>
        <TableCell align="left" component="th" scope="row">
          {golfer}
        </TableCell>
        {seed.golferData[golfer].map(score => (
          <TableCell align="right" component="th" scope="row">
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
