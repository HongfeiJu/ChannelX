/*
Description: Edit Channel Page 
Authors: Manisha Miriyala,Muhammad Sami
Date: 11/19/2019
*/

import React, {Component} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import ChannelEditor from "../../services/ChannelEditor";
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Moment from 'moment';
import 'date-fns';
import {db} from "../../config/Fire";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker} from '@material-ui/pickers';
import firebase from "firebase";
import swal from 'sweetalert';

let channelStartDate = null;
let channelEndDate = null;
let channelStartTime = '10:00:00';
let channelEndTime = '05:00:00';

class ChannelInfoEditor extends Component {

    constructor(props) {
        super(props);
        this.editChannel = this.editChannel.bind(this);
        this.handlechannelChange = this.handlechannelChange.bind(this);
        this.state = {
            startDate: null,
            endDate: null,
            insideEdit: false,
            channelTitle: null,
            channelPassword: null,
            editChannelId: null,
            editChannelTitle: null,
            channelStartDate: null,
            alert: null,
            showEditValues: false,
            errors: {
                channelTitle: "",
                channelPassword: "",
            }
        }


    }

    componentDidMount() {
        this.authListener();

        console.log("selected channel id in did mount" + this.props.id);

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
            title: "You're all set!!",
            text: "Channel Edited Successfully!",
            icon: "success",
        }).then(function () {
            window.location = ROUTES.HOME;
        });
    }

    showTimeAlert() {
        swal("Invalid Time!", "Please Select an appropriate time!", "warning");
    }


    editChannel(e) {

        e.preventDefault();
        var sameDay = false;
        if (channelStartDate === channelEndDate) {
            sameDay = true;
        }
        if (channelEndTime > channelStartTime && sameDay) {
            const channelEditor = new ChannelEditor();
            channelEditor.editChannel(
                this.props.id,
                this.state.channelTitle,
                this.state.channelPassword,
                channelStartDate,
                channelEndDate,
                channelStartTime,
                channelEndTime,
                this.state.UUID);
            this.showAlert();
        } else if (!sameDay) {
            const channelEditor = new ChannelEditor();
            channelEditor.editChannel(
                this.props.id,
                this.state.channelTitle,
                this.state.channelPassword,
                channelStartDate,
                channelEndDate,
                channelStartTime,
                channelEndTime,
                this.state.UUID,
            );
            this.showAlert();
        } else {
            this.showTimeAlert();
        }
    }

    routeTo = (path) => this.props.history.push(path);

    getValuesofChannel() {
        console.log(this.props.id);
        db.collection("channels").doc(this.props.id)
            .get()
            .then(doc => {
                this.setState({channelTitle: doc.get("channelTitle")});
                this.setState({channelPassword: doc.get("channelPassword")});
                channelStartTime = doc.get("channelStartTime");
                channelEndTime = doc.get("channelEndTime");
                channelStartDate = doc.get("channelStartDate");
                channelEndDate = doc.get("channelEndDate");
                this.setState({endDate: Moment(channelEndDate), startDate: Moment(channelStartDate)});
                console.log(channelStartDate);
                console.log(channelEndDate);
                this.setState({isLoaded: true});
            }).catch(error => {
            console.log(`error is ${error}`);
        });
    }



    render() {
        if (!this.props.show) {
            return null;
        }
        function MaterialUIPickersStartTime() {

            var date = '2014-08-18T' + channelStartTime;
            const [selectedDate, setSelectedDate] = React.useState(new Date(date));
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

            var date = '2014-08-18T' + channelEndTime;
            const [selectedDate, setSelectedDate] = React.useState(new Date(date));
            channelEndTime = Moment(selectedDate).format('HH:mm:ss').toString();
            const handleDateChange = date => {
                setSelectedDate(date);
                channelEndTime = Moment(date).format('HH:mm:ss').toString();
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
        console.log("selected channel id" + this.props.id);
        if (this.props.id != null && !this.state.showEditValues) {

            this.getValuesofChannel();
            this.setState({showEditValues: true});

        }
        channelStartDate = Moment(this.state.startDate).format('MM/DD/YYYY').toString();
        channelEndDate = Moment(this.state.endDate).format('MM/DD/YYYY').toString();
        return (
            <div className="CreateChannelForm">
                <form onSubmit={this.editChannel}>
                    <div className="channelTitle">
                        <input
                            type="text"
                            value={this.state.channelTitle}
                            id="channelTitle"
                            placeholder="Title"
                            name="channelTitle"
                            required
                            onChange={this.handlechannelChange}
                        />
                    </div>
                    <div className="channelPassword">
                        <input
                            type="text"
                            value={this.state.channelPassword}
                            pattern=".{10,16}"
                            id="channelPassword"
                            placeholder="Passcode"
                            name="channelPassword"
                            required
                            onChange={this.handlechannelChange}
                        />
                        {this.state.errors.channelPassword.length > 0 && (
                            <span className="errorMessage">{this.state.errors.channelPassword}</span>
                        )}
                    </div>
                    <div className="datePicker">
                        <DateRangePicker
                            // {...console.log(this.state.startDate)}
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            // {...console.log(this.state.endDate)}
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
                            onClick={() => this.props.closeEditModal()}
                        >Cancel
                        </button>
                        <button
                            type="submit"
                            id="submitButton"
                            className="createButton"
                        >Save
                        </button>
                        {this.state.alert}
                    </div>
                    <hr/>
                </form>
            </div>
        );
    }
}

export default ChannelInfoEditor;
