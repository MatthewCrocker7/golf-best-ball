import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = () => ({
  cellStyle: {
    padding: '0px'
  },
  divStyle: {
    padding: '1px',
    height: '100%',
    width: '100%',
    border: '3px solid #FFFFFF',
  },
});

const sum = holes => holes.map(x => x.par).reduce((total, num) => total + num);

const GameHeader = (props) => {
  const { classes, holes } = props;
  return (
    <TableBody>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Hole
        </TableCell>
        {holes.map(hole => (
          <TableCell className={classes.cellStyle} key={hole.number} align="center">
            <div className={classes.divStyle}>
              <Typography>{hole.number}</Typography>
            </div>
          </TableCell>
        ))}
        <TableCell align="center">
          Total
        </TableCell>
        <TableCell align="center" />
      </TableRow>
      <TableRow>
        <TableCell align="left" component="th" scope="row">
          Par
        </TableCell>
        {holes.map(hole => (
          <TableCell key={hole.number} align="center">
            <div className={classes.divStyle}>
              <Typography>{hole.par}</Typography>
            </div>
          </TableCell>
        ))}
        <TableCell align="center">
          {sum(holes)}
        </TableCell>
        <TableCell align="center">
          To Par
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

GameHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  holes: PropTypes.array.isRequired
};

export default withStyles(styles)(GameHeader);
