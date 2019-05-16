import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = () => ({
  divStyle: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #FFFFFF',
  },
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

const sum = holes => holes.reduce((total, num) => total + num);

const filterScores = (scores) => {
  // const result = scores.filter(x => x !== 0);
  const result = scores.map((x) => {
    if (x === 0) {
      return '-';
    }
    return x;
  });

  while (result.length < 18) {
    result.push('-');
  }
  return result;
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
  if (par >= 2) {
    return (
      <div className={style.doubleBogie}>
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
    <div className={style.par}>
      <Typography>{score}</Typography>
    </div>
  );
};

const Golfer = (props) => {
  const {
    classes,
    holes,
    name,
    scores
  } = props;
  const filteredScores = filterScores(scores);
  const symbols = toPar(filteredScores, holes);

  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          {name}
        </TableCell>
        {filteredScores.map((score, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={i} align="center">
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

Golfer.propTypes = {
  classes: PropTypes.object.isRequired,
  holes: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  scores: PropTypes.array.isRequired
};

GolfSymbol.propTypes = {
  style: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  par: PropTypes.number.isRequired
};

export default withStyles(styles)(Golfer);
