/*
Description: Home page
Authors: Hongfei Ju
Date: 9/3/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";
import './ChatRoom.css';
import ChatMessage from "./ChatMessage/ChatMessage";
import * as ROUTES from "../../constants/routes";
import PasscodeGenerator from "../../services/PasscodeGenerator";
import getCurrentUserUid from "../../services/currentUuidGetter";


class ChatRoom extends Component{
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.addNewPasscode = this.addNewPasscode.bind(this);
        this.showPasscodes = this.showPasscodes.bind(this);
        this.state = {
            id:this.props.match.params.id,
            title:'',
            creator:'',
            username: '',
            message:'',
            messages : [],
            passcodes: []
        }
    }

    componentDidMount() {

        this.setState({
            username: this.fetchUsername()
        });

        firebase.database().ref('channels/' + this.state.id).on('value', (snapshot)=>{
            const channel = snapshot.val();
            console.log(this.id+" " +channel);
            if(channel!=null){
                this.setState({
                    title:channel.title,
                    creator:channel.creator,
                    messages: channel.messages,
                    passcodes: channel.passcodes
                });
            }
        });

        if(this.state.messages.length !== 0){
            this.scrollToBottom();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.messages.length !== 0){
            this.scrollToBottom();
        }
    }

    updateMessage(e){
        this.setState({
            message:e.target.value
        });
    }

    submitMessage(){
        console.log("submit "+this.state.message);
        const today = new Date();
        const newMessage = {
            id: this.state.messages.length,
            from: this.state.username,
            text: this.state.message,
            timeStamp: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            +" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        };

        firebase.database().ref('channels/'+ this.state.id+'/messages/' + newMessage.id).set(newMessage)
            .then(r  =>{
                console.log(r);
                this.setState({message:''});
            }).catch(e=>{
                console.log(e)
            });
    }

    clearMessage(){
        console.log('clear message');
        firebase.database().ref('message/').set([])
            .then(r  =>{
                console.log(r);
                this.setState({
                    messages: []
                });
            }).catch(e=>{
                console.log(e)
            });
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        this.messagesEnd.scrollTo(0, this.messagesEnd.scrollHeight);
    }

    fetchUsername(){
        return "user "+ Math.floor(Math.random()*100);
    }

    addNewPasscode(){
        console.log(this.state.passcodes);
        const pg = new PasscodeGenerator();
        let newPasscode = pg.generateOnetimePasscode();
        let id=0;
        if(this.state.passcodes!==undefined){
            id=this.state.passcodes.length;
            while(this.state.passcodes.includes(newPasscode.value)){
                newPasscode = pg.generateOnetimePasscode();
            }
        }

        firebase.database().ref('channels/'+ this.state.id+'/passcodes/'+id).set(newPasscode)
            .then(r  =>{
                console.log(r);
                alert(newPasscode + " added");
            }).catch(e=>{
            console.log(e)
        });

    }

    showPasscodes(){
        alert(this.state.passcodes);
    }

    getControlBar(){
        if(getCurrentUserUid()===this.state.creator){
            return (<div className="control_bar">
                <button className="control_button" onClick={this.addNewPasscode}>generate passcode</button>
                <button className="control_button" onClick={this.showPasscodes}>show passcodes</button>
            </div>);
        }
    }
    routeTo(path) {
        this.props.history.push(path);
    }

    render() {
        const currentMessage = this.state.messages.map((message, i)=>{
           return (
               <ChatMessage key={i} user={message.from} text={message.text} time={message.timeStamp}/>
           )
        });

        if(this.state.messages.length === 0){
            return (
              <h1>channel doesn't exist</h1>
            );
        }

        return (
            <div className="chatRoom">
                <div className="roomTitle">
                    <h3>{this.state.title}</h3>

                </div>
                <div className="messagePanel"
                     ref={(el) => { this.messagesEnd = el; }}>
                    {this.getControlBar()}
                    {currentMessage}
                </div>
                <div className="messageSending">
                    <button
                        className="clearButton"
                        onClick={this.clearMessage}
                    >clear</button>
                    <input
                        type="text"
                        className="newMessage"
                        placeholder="input new message"
                        value={this.state.message}
                        onChange={this.updateMessage}
                    />
                    <button
                        className="sendButton"
                        onClick={this.submitMessage}
                    >send</button>
                    <button
                        className="goBack"
                        onClick={() => this.routeTo(ROUTES.HOME)}
                    >Back</button>

                </div>
            </div>
        );
    }

}

export default ChatRoom;
