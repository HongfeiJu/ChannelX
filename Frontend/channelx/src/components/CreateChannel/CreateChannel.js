/*
Description: Create Channel Page
Authors: Darshan Prakash, Muhammad
Date: 10/18/2019
*/

import React, {Component, useState} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import fire from '../../config/Fire'
import ChannelCreator from "../../services/ChannelCreator";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'react-moment'
import Moment from 'moment';
// import moment from 'moment';


var sdate = null;
var edate = null;

class CreateChannel extends Component {

    
    constructor(props) {


        super(props);



        this.createChannel = this.createChannel.bind(this);
        this.handlechannelChange = this.handlechannelChange.bind(this);

        this.state = {
            channelTitle: null,
            channelPassword: null,
            channelStartDate: null,
            channelEndDate: null,
            channelStartTime: null,
            channelEndTime: null,
            channelCreator: fire.auth().currentUser.uid,

            errors:{
                channelTitle: "",
                channelPassword: "",
                channelStartDate: "",
                channelEndDate: "",
                channelStartTime: "",
                channelEndTime: "",
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
            case 'channelStartDate':                    
                break;
            case 'channelEndDate':
                break;
            case 'channelStartTime':
                break;
            case 'channelEndTime':
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
            sdate,
            edate,
            this.state.channelStartTime,
            this.state.channelEndTime,
            this.state.channelCreator);
        this.routeTo(ROUTES.HOME);
    }

    routeTo = (path) => this.props.history.push(path);

    render() {



        // const today = this.state.startDate;

         sdate = Moment(this.state.startDate).format('YYYY-MM-DD').toString();

         edate = Moment(this.state.endDate).format('YYYY-MM-DD').toString();



        //  date.format('MMM-DD-YYYY')
        
        // date.moment().format("hh:mm:ss a")
        console.log(sdate);
        console.log(edate);

        // var day = today.getDate();

        // console.log(day);

        //  console.log(today.moment().toDate());

        //  const m2 = moment(today);

        //  console.log(today);

        //  console.log(today.utc().value());


        //  let newDateVar = today.utc().format();
        //  var chan = moment(today).toDate();
        //  console.log(chan);
        //  var keys = Object.keys(chan);

         

        // console.log(moment(today).format("MMMM D, YYYY"));

        // console.log(this.state.startDate);
        // console.log(this.state.endDate);

        // var plainDate = moment().toDate();
        // console.log(this.state.startDate.toDate());

        // channelStartDate = this.state.startDate


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
                        
                        <div className="channelStartDate">
                          
                            <DateRangePicker 
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,


  
 
/>
                            {/* <input
                                type="date"
                                id="channelStartDate"
                                name="channelStartDate"
                                required
                                
                            ></input>  */}
        
                        </div>
                         <div className="channelStartTime">
                            <text>
                                Start Time
                            </text>
                            <input
                                type="time"
                                id="channelStartTime"
                                name="channelStartTime"
                                min="00:00"
                                max="23:59"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelEndTime">
                            <text>
                                End Time
                            </text>
                            <input
                                type="time"
                                id="channelEndTime"
                                name="channelEndTime"
                                min="00:00"
                                max="23:59"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
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