import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import SummaryCardHeader from './SummaryCardHeader';
import SummaryCardPlayer from './SummaryCardPlayer';

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

const SummaryCard = (props) => {
  const { classes, allRounds } = props;
  return (
    <Paper className={classes.root}>
      <Table padding="dense">
        <TableBody>
          <SummaryCardHeader />
          {allRounds.map(x => (
            <SummaryCardPlayer
              key={x.player_id}
              name={x.player}
              rounds={x.rounds}
              total={x.total}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

SummaryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  allRounds: PropTypes.array.isRequired
};

export default withStyles(styles)(SummaryCard);
