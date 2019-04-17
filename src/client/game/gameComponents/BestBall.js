import React from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import seed from './seed';

const _ = require('lodash');

const parseData = scores => scores.map(x => (x === '-' ? 999 : x));

const getBest = (golfData) => {
  const data = golfData.map(x => x.scores);

  const g1 = parseData(data[0]);
  const g2 = parseData(data[1]);
  const g3 = parseData(data[2]);
  const g4 = parseData(data[3]);

  const result = _.zipWith(g1, g2, g3, g4, (a, b, c, d) => Math.min(a, b, c, d));

  console.log(result);

  return result;
};

let id=1;

const BestBall = (props) => {
  const { classes, data } = props;

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Best
        </TableCell>
        {getBest(data).map(hole => (
          <TableCell key={id++} align="center">
            {hole}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
};


export default BestBall;
