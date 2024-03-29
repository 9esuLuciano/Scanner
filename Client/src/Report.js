import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Summerize from './Summerize'
import Score from './Score'
import Detail from './Report-Detail'
import FullLog from './FullLog'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

export default function Report(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperHero = clsx(fixedHeightPaper, classes.mainFeaturedPost);
  const report = props.report;
  const score = report.Score;
  const summery = report.Summary;
  const detail = report.Detail;
  const fulllog = report.FullLog;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={4}>
            {/* Summerazation */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaperHero}>  
                <Summerize data={summery} />
              </Paper>
            </Grid>
            {/* Score */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Score data={score} />
              </Paper>
            </Grid>
            {/* Detail lists */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Detail data={detail}/>
              </Paper>
            </Grid>
            {/* Full log */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FullLog data={fulllog}/>
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </main>
    </div>
  );
}