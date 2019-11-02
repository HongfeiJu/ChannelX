import 'date-fns';
import React from 'react';
import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';


 var time;


export default function MaterialUIPickers() {
  
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T00:00:00'));

  const handleDateChange = date => {
    setSelectedDate(date);
    time = Moment(date).format('LT').toString();
    console.log("mera time in materiaql" +time);

  
  };

  return (

    
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          // label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
            
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

// console.log(value);

// export { time }