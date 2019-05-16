import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = () => ({
  root: {
    width: 'auto',
    margin: '10px',
    overflowX: 'auto',
  },
  textStyle: {
    textAlign: 'center'
  }
});

const addMisingRounds = (rounds) => {
  const result = rounds;

  if (rounds.length === 4) {
    return rounds;
  }

  let roundStart = rounds.length + 1;

  while (result.length < 4) {
    const x = {
      toPar: '-',
      round: roundStart
    };
    result.push(x);
    roundStart += 1;
  }
  return result;
};

const SummaryCardPlayer = (props) => {
  const {
    classes,
    rounds,
    name,
    total
  } = props;
  const filteredRounds = addMisingRounds(rounds);

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">
        {name}
      </TableCell>
      {filteredRounds.map(x => (
        <TableCell key={x.round} align="center" scope="row">
          {x.toPar}
        </TableCell>
      ))}
      <TableCell align="center" scope="row">
        {total}
      </TableCell>
    </TableRow>
  );
};

SummaryCardPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
  rounds: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
};

export default withStyles(styles)(SummaryCardPlayer);
