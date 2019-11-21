import React from 'react';
import Typography from '@material-ui/core/Typography';
import Cursor from './cursor-blink.gif'

function Slogan() {  
    return (
        <Typography component="h1" variant="h5">
        <p>
            <span>> VBA_Malicious_Code_Scanner</span>
            <img className="blinking-cursor" style={{verticalAlign: "text-bottom"}} height="25px" src={Cursor} />
        </p>
      </Typography>
    );
  }
  
  export default Slogan;