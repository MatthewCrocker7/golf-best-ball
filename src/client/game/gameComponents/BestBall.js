import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const _ = require('lodash');

const styles = () => ({
  par: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #ffffff',
    borderRadius: '50%',
  },
  birdie: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #add8e6',
    borderRadius: '50%',
  },
  eagle: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #add8e6',
    borderRadius: '50%',
    backgroundColor: '#add8e6'
  },
  bogie: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #F99245',
  },
  doubleBogie: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #F99245',
    backgroundColor: '#F99245'
  },
});

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

const toPar = (scores, holes) => scores.map((x, index) => x - holes[index].par);

const GolfSymbol = (props) => {
  const { style, par, score } = props;
  if (par <= -2) {
    return (
      <div className={style.eagle}>
        <Typography>{score}</Typography>
      </div>
    );
  }
  if (par === -1) {
    return (
      <div className={style.birdie}>
        <Typography>{score}</Typography>
      </div>
    );
  }
  if (par === 0) {
    return (
      <div className={style.par}>
        <Typography>{score}</Typography>
      </div>
    );
  }
  if (par === 1) {
    return (
      <div className={style.bogie}>
        <Typography>{score}</Typography>
      </div>
    );
  }
  return (
    <div className={style.doubleBogie}>
      <Typography>{score}</Typography>
    </div>
  );
};

const BestBall = (props) => {
  const { classes, data, holes } = props;
  const scores = getBest(data);
  const symbols = toPar(scores, holes);
  console.log(symbols);

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Best
        </TableCell>
        {scores.map((score, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell className={classes.cellStyle} key={i} align="center">
            <GolfSymbol score={score} par={symbols[i]} style={classes} />
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
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  holes: PropTypes.array.isRequired,
};

GolfSymbol.propTypes = {
  style: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  par: PropTypes.number.isRequired
};

export default withStyles(styles)(BestBall);
