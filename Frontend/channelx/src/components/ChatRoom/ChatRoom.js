/*
Description: Home page
Authors: Hongfei Ju, Muhammad Sami, Darshan Prakash
Date: 11/02/2019
Last updated: 11/7/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";
import './ChatRoom.css';
import ChatMessage from "./ChatMessage/ChatMessage";
import * as ROUTES from "../../constants/routes";
import PasscodeGenerator from "../../services/PasscodeGenerator";
import SweetAlert from "react-bootstrap-sweetalert";
import {db} from "../../config/Fire";
import Moment from 'moment';

class ChatRoom extends Component {
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.addNewPasscode = this.addNewPasscode.bind(this);
        this.showPasscodes = this.showPasscodes.bind(this);
        this.state = {
            id: this.props.match.params.id,
            title: '',
            type: '',
            creator: '',
            username: '',
            message: '',
            messages: [],
            passcodes: [],
            alert: null,
            isChatEnable: null,
        }
    }

    componentDidMount() {

        this.authListener();
        this.getChannnelDatesandTimes();
        this.setState({
            username: this.fetchUsername()
        });
        firebase.database().ref('channels/' + this.state.id).on('value', (snapshot) => {
            const channel = snapshot.val();
            console.log(this.id + " " + channel);
            if (channel != null) {
                this.setState({
                    title: channel.title,
                    type: channel.type,
                    creator: channel.creator,
                    messages: channel.messages,
                    passcodes: channel.passcodes
                });
            }
        });
        if (this.state.messages.length !== 0) {
            this.scrollToBottom();
        }
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.messages.length !== 0) {
            this.scrollToBottom();
        }
    }

    updateMessage(e) {
        this.setState({
            message: e.target.value
        });
    }


    showAlert() {
        const getAlert = () => (
            <SweetAlert
                warning
                title="Channel is not Active Now!"
                onConfirm={() => this.hideAlert()}
            >
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
            alert: null
        });
    }

    submitMessage() {
        console.log("submit " + this.state.message);
        const today = new Date();
        const newMessage = {
            id: this.state.messages.length,
            from: this.state.username,
            text: this.state.message,
            timeStamp: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        };

        if (this.state.message.length > 0) {
            firebase.database().ref('channels/' + this.state.id + '/messages/' + newMessage.id).set(newMessage)
                .then(r => {
                    console.log(r);
                    this.setState({message: ''});
                }).catch(e => {
                console.log(e)
            });
        }
    }

    clearMessage() {
        console.log('clear message');
        const sysMsg = this.state.messages[0];
        firebase.database().ref('channels/' + this.state.id + '/messages/').set({0: sysMsg})
            .then(r => {
                console.log(r);
                this.setState({
                    messages: [sysMsg]
                });
            }).catch(e => {
            console.log(e)
        });
    }


    getChannnelDatesandTimes = () => {

        var startDate;
        var endDate;
        var startTime;
        var endTime;
        var time;
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        time = Moment(today).format('HH:mm:ss').toString();
        console.log(date);
        console.log(time);
        db.collection("channels").doc(this.state.id)
            .get()
            .then(doc => {
                startDate = doc.get("channelStartDate");
                endDate = doc.get("channelEndDate");
                startTime = doc.get("channelStartTime");
                endTime = doc.get("channelEndTime");
                var nextDay = false;
                var dt = new Date();
                var s = startTime.split(':');
                var e = endTime.split(':');
                var dt2
                if (parseInt(e[0]) - parseInt(s[0]) <= 0) {
                    nextDay = true;
                }
                var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                if (nextDay) {
                    dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1, parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                } else {
                    dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                }
                var validTime = Moment(dt).isBetween(dt1, dt2);
                var validDate = Moment(date).isSameOrAfter(startDate) && Moment(date).isSameOrBefore(endDate);
                if (validDate && validTime) {
                    this.setState({isChatEnable: true})
                } else {
                    this.setState({isChatEnable: false})
                }
            }).catch(error => {
            console.log(`error is ${error}`);
        });
    };

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
        this.messagesEnd.scrollTo(0, this.messagesEnd.scrollHeight);
    }

    fetchUsername() {
        return "user " + Math.floor(Math.random() * 100);
    }

    addNewPasscode() {
        const pg = new PasscodeGenerator();
        let newPasscode = pg.generateOnetimePasscode();
        let id = 0;
        let useOut = false;
        if (this.state.passcodes !== undefined) {
            id = this.state.passcodes.length;
            let count = 0;
            console.log("passcodes " + this.state.passcodes);
            console.log("new" + newPasscode);
            let passcodeKeys=Object.keys(this.state.passcodes);
            while (passcodeKeys.includes(newPasscode) && count < 100) {
                newPasscode = pg.generateOnetimePasscode();
                count++;
            }
            if (count === 100) useOut = true;
        }
        if (useOut) {
            alert("passcodes used out");
            return;
        }
        firebase.database().ref('channels/' + this.state.id + '/passcodes/' + id).set(newPasscode)
            .then(r => {
                console.log(r);
                alert(newPasscode + " added");
            }).catch(e => {
            console.log(e)
        });

    }

    showPasscodes() {
        alert(Object.keys(this.state.passcodes));
    }

    getControlBar() {
        if (this.state.UUID === this.state.creator && this.state.type !== 'private') {
            return (<div className="control_bar">
                <button className="control_button" onClick={this.addNewPasscode}>generate passcode</button>
                <button className="control_button" onClick={this.showPasscodes}>show passcodes</button>
                <button className="control_button" onClick={this.clearMessage}>clear history</button>
            </div>);
        }
    }

    routeTo(path) {
        this.props.history.push(path);
    }

    handleKeyDown = (e) => {
        console.log(this.state.isChatEnable);
        if (e.key === 'Enter') {
            if (this.state.isChatEnable) {
                this.submitMessage();
            } else {
                this.showAlert();
                // eslint-disable-next-line no-unused-expressions
                this.state.alert;
            }
        }
    };

    render() {
        const currentMessage = this.state.messages.map((message, i) => {
            return (
                <ChatMessage key={i} user={message.from} text={message.text} time={message.timeStamp}/>
            )
        });

        return (
            <div className="chatRoom">
                <div className="roomTitle">
                    <h3>{this.state.title}</h3>
                    <button
                        className="goBack"
                        onClick={() => this.routeTo(ROUTES.HOME)}
                    >Back
                    </button>
                </div>
                <div className="messagePanel"
                     ref={(el) => {
                         this.messagesEnd = el;
                     }}>
                    {this.getControlBar()}
                    {currentMessage}
                </div>
                <div className="messageSending">
                    <input
                        type="text"
                        className="newMessage"
                        placeholder="input new message"
                        value={this.state.message}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.updateMessage}
                    />
                    <button
                        className="sendButton"
                        onClick={
                            this.state.type === 'private' ? this.state.isChatEnable = true :
                                (this.state.isChatEnable ? this.submitMessage : () => (this.showAlert()))
                        }
                    >send
                    </button>
                    {this.state.alert}
                </div>
            </div>
        );
    }
}

export default ChatRoom;
