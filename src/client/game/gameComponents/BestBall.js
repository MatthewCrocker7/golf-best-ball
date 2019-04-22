import React from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const _ = require('lodash');

const parseData = scores => scores.map(x => (x === '-' ? 999 : x));

const getBest = (golfData) => {
  const data = golfData.map(x => x.scores);

  const g1 = parseData(data[0]);
  const g2 = parseData(data[1]);
  const g3 = parseData(data[2]);
  const g4 = parseData(data[3]);

  return _.zipWith(g1, g2, g3, g4, (a, b, c, d) => Math.min(a, b, c, d));
};

const sum = holes => holes.reduce((total, num) => total + num);

let id = 1;

const BestBall = (props) => {
  const { classes, data } = props;
  const scores = getBest(data);

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Best
        </TableCell>
        {scores.map(hole => (
          <TableCell key={id++} align="center">
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
  // classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default BestBall;
