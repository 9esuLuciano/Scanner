import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from "@material-ui/core/TableCell";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// disable the bottom-border of a table cell
const TableCell = withStyles({
    root: {
      borderBottom: "none"
    }
  })(MuiTableCell);

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
      paddingRight: 0,
    },
  },
  papergrey: {
    height: 75,
    width: 170,
    backgroundColor: '#b0bec5'
  },
  paperyellow: {
    height: 75,
    width: 170,
    backgroundColor: '#fff9c4'
  },
  paperred: {
    height: 75,
    width: 170,
    backgroundColor: '#ef9a9a'
  },
  papergreen: {
    height: 75,
    width: 170,
    backgroundColor: '#c8e6c9'
  },
  summarycontent: {
    paddingLeft: theme.spacing(1),
  },
}));

let rows = [];

export default function Summerize(props) {
  const classes = useStyles();
  const details = props.data;

  let index = 0
  rows = [];

  props.data.forEach(record => {
      let message;
      let color;

      switch (record.value) {
          case 1:
            message = "Low Risk";
            color = "grey";
            break;
          case 2:
            message = "Intermediate";
            color = "yellow";
            break;
          case 3:
            message = "High Risk";
            color = "red";
            break;
          default:
            message = "No Risk";
            color = "green";
            break;
      }

    rows.push({
        id: index,
        field: record.field,
        message: message,
        color: color
    });

    index++;
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Paper className={classes.mainFeaturedPost}>
            <div className={classes.overlay} />
            <Typography component="h2" variant="h3" color="inherit" gutterBottom>
                Summary
            </Typography>
            <GridList cellHeight={75} className={classes.gridList} cols={4}>
                {rows.map(tile => (
                <GridListTile key={tile.id}>
                    <Paper className={classes["paper" + tile.color]}>
                        <Typography className={classes.summarycontent} component="h2" variant="h5" color="primary" gutterBottom>
                            {tile.field}
                        </Typography>
                        <p className={classes.summarycontent}>{tile.message}</p>
                    </Paper>
                </GridListTile>
                ))}
            </GridList>
          </Paper>
          {/* End main featured post */}
        </main>
      </Container>
    </React.Fragment>
  );
}