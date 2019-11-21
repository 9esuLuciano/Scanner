import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  seeFullLog: {
      backgroundColor: "#f5f5f5"
  }
}));
  
const beautifyFullLog = function (text) {
    text = text.replace(/(?:\r)/g, '');
    return text.split('\n').map((item, key) => {
        return <span key={key}>{item}<br/></span>
    })
};

export default function ReportFullLog(props) {
  const classes = useStyles();
  let detail = props.data || "";

  return (
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
              {beautifyFullLog(detail)}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
  );
}