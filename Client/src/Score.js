import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

let buildMessage = function (msg) {
    return <p>{msg}</p>
}

export default function Score(props) {
    let message;
    let frontColor;

    if (props.data == 100)
    {
        message = buildMessage("Congratulation! No one can beat you!");
    }
    else if (props.data > 80)
    {
        message = buildMessage("Awesome! Your document is very safe!");
    }
    else if (props.data > 60)
    {
        message = buildMessage("That is OK, but there's some issue we'd suggest to fix.");
    }
    else if (props.data > 40)
    {
        message = buildMessage("There's a lot of issues we'd suggest you fix that immediately.");
    }
    else if (props.data > 20)
    {
        message = buildMessage("Ton of issue, don't open this file!");
    }
    else
    {
        message = buildMessage("Your file is a disaster, delete it and forget it!");
    }

  return (
      
    <Typography component="h2" variant="body1" color="primary" gutterBottom>
        <span> Your Final Score Is </span>
        <Typography component="h2" variant="h2" color="secondary" gutterBottom>
            {props.data}
        </Typography>
        {message}
    </Typography>
  );
}

Score.propTypes = {
  children: PropTypes.node,
};