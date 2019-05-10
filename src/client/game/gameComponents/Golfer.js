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
});

const sum = holes => holes.reduce((total, num) => total + num);

const filterScores = (scores) => {
  const result = scores.filter(x => x !== 0);

  while (result.length < 18) {
    result.push('-');
  }
  return result;
};

const Golfer = (props) => {
  const { classes, name, scores } = props;
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
            <div className={classes.divStyle}>
              <Typography>{score}</Typography>
            </div>
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
  name: PropTypes.string.isRequired,
  scores: PropTypes.array.isRequired
};

export default withStyles(styles)(Golfer);
