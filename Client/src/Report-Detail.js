import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import Title from './Title';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
  

let rows = [];

export default function ReportDetails(props) {
  const classes = useStyles();

  rows = [];

  props.data.forEach(record => {
    rows.push(record);
  });

  return (
    <React.Fragment>
      <Title>Issues List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>category</TableCell>
            <TableCell>keyword</TableCell>
            <TableCell>description</TableCell>
            <TableCell>severity</TableCell>
            <TableCell align="right">detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.keyword}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.severity}</TableCell>
              <TableCell align="right">{row.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeFullLog}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>See Full Log</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {props.detail}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </React.Fragment>
  );
}