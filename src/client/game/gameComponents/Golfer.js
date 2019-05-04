import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const sum = holes => holes.reduce((total, num) => total + num);

const filterScores = (scores) => {
  const result = scores.filter(x => x !== 0);

  while (result.length < 18) {
    result.push('-');
  }
  return result;
};

const Golfer = (props) => {
  const { name, scores } = props;
  const filteredScores = filterScores(scores);

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          {name}
        </TableCell>
        {filteredScores.map((score, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={index} align="center">
            {score}
          </TableCell>
        ))}
        <TableCell align="center">
          {sum(scores)}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

Golfer.propTypes = {
  name: PropTypes.string.isRequired,
  scores: PropTypes.array.isRequired
};

export default Golfer;
