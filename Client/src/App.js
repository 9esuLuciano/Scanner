import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import FileUploader from './FileUploader'
import Slogan from './Slogan'
import Logo from './Logo'
import Report from './Report'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="mailto:VBACOMVSTOFC@microsoft.com">
        OP Beijing In Market Feature Crew
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  applogo: {
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginTop: theme.spacing(8),
  },
  dropzone: {
    margin: theme.spacing(3, 0, 2),
  },
  fullList: {
    width: 'auto',
  },
}));

class AppCore extends Component {
  constructor(props) {
      super(props);
  }

  state = { 
    submiterror: null,
    reportdetail: null,
    showdrawer: false,
  }

  onScriptAnalyzeCompleted = (err, report) => {
    console.log(err);
    this.setState({
      submiterror: err, 
      reportdetail: report,
      showdrawer: report != null
    })
  }

  toggleDrawer = (open) => event => {
    this.setState({ showdrawer: open });
  }

  render() {
    const classes = this.props.classes;
    let self = this;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Logo />
          <Slogan />
          <div hidden={self.state.submiterror == null}>
            <font color='red'>Something went wrong, please try it again.</font>
          </div>
          <div className={classes.dropzone}>
            <FileUploader onAnalyzeCompleted={self.onScriptAnalyzeCompleted}/>
          </div>
        </div>
        <div>
          <Drawer anchor="bottom" open={self.state.showdrawer} onClose={self.toggleDrawer(false)}>
            <div
              className={classes.fullList}
              role="presentation"
              onKeyDown={self.toggleDrawer(false)}
            >
              {self.state.reportdetail ? (
                <Report report={self.state.reportdetail} />
               ) : (
                <div />
               )}
            </div>
          </Drawer>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

function App() {
  const classes = useStyles();

  return (
    <AppCore classes={classes} />
  );
}

export default App;
