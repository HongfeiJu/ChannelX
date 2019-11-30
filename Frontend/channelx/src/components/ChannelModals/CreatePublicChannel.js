/*
Description: Create Channel Page
Authors: Darshan Prakash, Muhammad Sami
Date: 11/14/2019
*/

import React, {Component} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import ChannelCreator from "../../services/ChannelCreator";
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Moment from 'moment';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import firebase from "firebase";
import swal from 'sweetalert';


let channelStartDate = null;
let channelEndDate = null;
let channelStartTime = null;
let channelEndTime = null;


class CreatePublicChannel extends Component {

    constructor(props) {
        super(props);
        this.createChannel = this.createChannel.bind(this);
        this.handlechannelChange = this.handlechannelChange.bind(this);
        this.state = {
            channelTitle: null,
            channelPassword: null,
            alert: null,
            errors: {
                channelTitle: "",
                channelPassword: "",
            }
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                this.setState({
                    UUID: user.uid,
                    user
                });
            } else {
                this.setState({user: null});
                this.routeTo(ROUTES.LANDING);
            }
        });
    }

    handlechannelChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.errors;
        switch (name) {
            case 'channelTitle':
                break;
            case 'channelPassword':
                formErrors.channelPassword = value.length < 10 || value.length > 16 ? 'password length should be between 10 and 16 characters' : '';
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    showAlert() {
        swal({
            title: "Channel Created !!",
            text: "Channel Created Successfully!",
            icon: "success",
        }).then(function () {
            window.location = ROUTES.HOME;
        });

    }

    showTimeAlert() {
        swal("Invalid Time!", "Please Select an appropriate time!", "warning");
    }

    createChannel(e) {
        e.preventDefault();
        console.log(channelStartTime);
        console.log(channelEndTime);
        var sameDay = false;
        if (channelStartDate === channelEndDate) {
            sameDay = true;
        }
        if (channelEndTime > channelStartTime && sameDay) {
            // alert('channel created');
            const channelCreator = new ChannelCreator();
            channelCreator.creatNewChannel(
                this.state.channelTitle,
                this.state.channelPassword,
                channelStartDate,
                channelEndDate,
                channelStartTime,
                channelEndTime,
                this.state.UUID);
            this.showAlert();
        } else if (!sameDay) {
            const channelCreator = new ChannelCreator();
            channelCreator.creatNewChannel(
                this.state.channelTitle,
                this.state.channelPassword,
                channelStartDate,
                channelEndDate,
                channelStartTime,
                channelEndTime,
                this.state.UUID);
            this.showAlert();
        } else {
            this.showTimeAlert();
        }
    }

    routeTo = (path) => this.props.history.push(path);

    render() {
        if (!this.props.show) {
            return null;
        }
        channelStartDate = Moment(this.state.startDate).format('MM/DD/YYYY').toString();
        channelEndDate = Moment(this.state.endDate).format('MM/DD/YYYY').toString();
        return (
            <div className="CreateChannelForm">
                <form onSubmit={this.createChannel}>
                    <div className="ModalArrowLeft">
                        &#11014;
                    </div>
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
                            pattern=".{10,16}"
                            id="channelPassword"
                            placeholder="Passcode"
                            name="channelPassword"
                            required
                            onChange={this.handlechannelChange}
                        ></input>
                        {this.state.errors.channelPassword.length > 0 && (
                            <span className="errorMessage">{this.state.errors.channelPassword}</span>
                        )}
                    </div>
                    <div className="datePicker">
                        <DateRangePicker
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDate={this.state.endDate}
                            endDateId="your_unique_end_date_id"
                            onDatesChange={({startDate, endDate}) => this.setState({
                                startDate,
                                endDate
                            })}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({focusedInput})}
                            required
                            minimumNights={0}
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
                            onClick={()=>{this.props.closePublicModal()}}
                        >Close
                        </button>
                        <button
                            type="submit"
                            id="submitButton"
                            className="createButton"
                        >Create
                        </button>
                        {this.state.alert}
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePublicChannel;


function MaterialUIPickersStartTime() {

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T10:00:00'));
    channelStartTime = Moment(selectedDate).format('HH:mm:ss').toString();
    const handleDateChange = date => {
        setSelectedDate(date);
        channelStartTime = Moment(date).format('HH:mm:ss').toString();
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
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

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-09-18T17:00:00'));
    channelEndTime = Moment(selectedDate).format('HH:mm:ss').toString();
    const handleDateChange = date => {
        setSelectedDate(date);
        channelEndTime = Moment(date).format('HH:mm:ss').toString();
        console.log(channelEndTime);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time'
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
