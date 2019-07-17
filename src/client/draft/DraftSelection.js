import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  textStyle: {
    fontWeight: theme.typography.fontWeightRegular * 2,
  },
});

const DraftSelection = (props) => {
  const { classes, players } = props;

  return (
    <Table padding="dense">
      <TableBody>
        <TableRow>
          <TableCell className={classes.textStyle} align="center" component="th" scope="row">
            Players
          </TableCell>
          <TableCell className={classes.textStyle} align="center" component="th" scope="row">
            Golfer 1
          </TableCell>
          <TableCell className={classes.textStyle} align="center" component="th" scope="row">
            Golfer 2
          </TableCell>
          <TableCell className={classes.textStyle} align="center" component="th" scope="row">
            Golfer 3
          </TableCell>
          <TableCell className={classes.textStyle} align="center" component="th" scope="row">
            Golfer 4
          </TableCell>
        </TableRow>
        {players.map(player => (
          <TableRow key={player.name}>
            <TableCell className={classes.textStyle} align="center" component="th" scope="row">
              {player.name}
            </TableCell>
            {player.golfers.map(x => (
              <TableCell key={x.id} align="center">
                {x.name}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

DraftSelection.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired
};

export default withStyles(styles)(DraftSelection);
