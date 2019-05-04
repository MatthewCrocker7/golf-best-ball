import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const _ = require('lodash');

const filterScores = (scores) => {
  const result = scores.filter(x => x !== 0);

  while (result.length < 18) {
    result.push('-');
  }
  return result;
};

const checkNaN = x => (typeof x === 'string' || !x);

const min = (a, b, c, d) => {
  if (checkNaN(a) && checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return '-';
  }
  if (!checkNaN(a) && checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return a;
  }
  if (!checkNaN(a) && !checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return Math.min(a, b);
  }
  if (!checkNaN(a) && checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return Math.min(a, c);
  }
  if (!checkNaN(a) && checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return Math.min(a, d);
  }
  if (!checkNaN(a) && !checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return Math.min(a, b, c);
  }
  if (!checkNaN(a) && !checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return Math.min(a, b, d);
  }
  if (!checkNaN(a) && checkNaN(b) && !checkNaN(c) && !checkNaN(d)) {
    return Math.min(a, c, d);
  }
  if (checkNaN(a) && !checkNaN(b) && checkNaN(c) && checkNaN(d)) {
    return b;
  }
  if (checkNaN(a) && !checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return Math.min(b, c);
  }
  if (checkNaN(a) && !checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return Math.min(b, d);
  }
  if (checkNaN(a) && !checkNaN(b) && !checkNaN(c) && !checkNaN(d)) {
    return Math.min(b, c, d);
  }
  if (checkNaN(a) && checkNaN(b) && !checkNaN(c) && checkNaN(d)) {
    return c;
  }
  if (checkNaN(a) && checkNaN(b) && !checkNaN(c) && !checkNaN(d)) {
    return Math.min(c, d);
  }
  if (checkNaN(a) && checkNaN(b) && checkNaN(c) && !checkNaN(d)) {
    return d;
  }

  return Math.min(a, b, c, d);
};

const sum = (holes) => {
  const result = holes.reduce((total, num) => total + (typeof num === 'string' ? 0 : num));

  if (typeof result === 'string') {
    return 0;
  }
  return result;
};

const getBest = (golfData) => {
  const data = golfData.map(x => filterScores(x.scores));

  return _.zipWith(...data, (a, b, c, d) => min(a, b, c, d));
};

const BestBall = (props) => {
  const { data } = props;
  const scores = getBest(data);

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Best
        </TableCell>
        {scores.map((hole, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={index} align="center">
            {hole}
          </TableCell>
        ))}
        <TableCell align="center">
          {sum(scores)}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

BestBall.propTypes = {
  data: PropTypes.array.isRequired
};

export default BestBall;
