import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
  const details = props.data || [];

  let index = 0
  rows = [];

  details.forEach(record => {
      let message;
      let color;

      switch (record.Value) {
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
        field: record.Field,
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
          <Paper className={classes.mainFeaturedPost} style={{boxShadow: "none"}}>
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