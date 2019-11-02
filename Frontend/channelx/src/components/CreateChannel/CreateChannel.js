/*
Description: Create Channel Page
Authors: Darshan Prakash, Muhammad Sami
Date: 11/01/2019
*/

import React, {Component} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import fire from '../../config/Fire'
import ChannelCreator from "../../services/ChannelCreator";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Moment from 'moment';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';


var channelStartDate = null;
var channelEndDate = null;
var channelStartTime = null;
var channelEndTime = null;


class CreateChannel extends Component {

    
    constructor(props) {


        super(props);

          

        this.createChannel = this.createChannel.bind(this);
        this.handlechannelChange = this.handlechannelChange.bind(this);

        this.state = {
            channelTitle: null,
            channelPassword: null,
            channelCreator: fire.auth().currentUser.uid,

            errors:{
                channelTitle: "",
                channelPassword: "",
            }
        }
    }



    handlechannelChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.errors;

        switch (name) {
            case 'channelTitle':
                break;
            case 'channelPassword':
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };
    

    createChannel(e) {
        e.preventDefault();
        const channelCreator=new ChannelCreator();
        channelCreator.creatNewChannel(
            this.state.channelTitle,
            this.state.channelPassword,
            channelStartDate,
            channelEndDate,
            channelStartTime,
            channelEndTime,
            this.state.channelCreator);
        this.routeTo(ROUTES.HOME);
    }

    routeTo = (path) => this.props.history.push(path);

    render() {

        channelStartDate = Moment(this.state.startDate).format('YYYY-MM-DD').toString();

         channelEndDate = Moment(this.state.endDate).format('YYYY-MM-DD').toString();

        // console.log(channelStartDate);
        // console.log(channelEndDate);

        return (


           
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="FormTitle">
                        <h1>Create your Channel</h1>
                    </div>
                    <form onSubmit={this.createChannel}>


                        <div className="channelTitle">
                            <input
                                type="text"
                                id="channelTitle"
                                placeholder="Title"
                                name="channelTitle"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelPassword">
                            <input
                                type="text"
                                id="channelPassword"
                                placeholder="Password"
                                name="channelPassword"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        
                        <div className="startDate">
                          
                            <DateRangePicker 
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>
        
                        </div>
                         <div className="channelStartTime">
                            <text>
                                Start Time
                            </text>

                            <MaterialUIPickersStartTime/>
                        </div>
                        <div className="channelEndTime">
                             <text>
                                End Time
                            </text>
                            <MaterialUIPickersEndTime/>
                        </div> 
                        <div className="createChannel">
                            <button
                                type="button"
                                id="cancelButton"
                                className="leaveButton"
                                onClick={() => this.routeTo(ROUTES.HOME)}
                            >Leave
                            </button>
                            <button
                                type="submit"
                                id="submitButton"
                                className="createButton"
                            >Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default CreateChannel;


function MaterialUIPickersStartTime() {
  
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T00:00:00'));
  
    const handleDateChange = date => {
      setSelectedDate(date);
      channelStartTime = Moment(date).format('LT').toString();
    //   console.log("start time" +channelStartTime);
  
    
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

  function MaterialUIPickersEndTime() {
  
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T00:00:00'));
  
    const handleDateChange = date => {
      setSelectedDate(date);
      channelEndTime = Moment(date).format('LT').toString();
    //   console.log("end time" +channelEndTime);
  
    
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