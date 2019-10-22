/*
Description: Home page
Authors: Hongfei Ju
Date: 9/3/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";
import './ChatRoom.css';
import ChatMessage from "./ChatMessage/ChatMessage";
import PasscodeGenerator from "../../services/PasscodeGenerator";

class ChatRoom extends Component{
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.state = {
            id:this.props.match.params.id,
            title:'',
            creator:'',
            username: '',
            message:'',
            messages : []
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
                    messages: channel.messages
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

        firebase.database().ref('channels/test/messages/' + newMessage.id).set(newMessage)
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

        //const uid = firebase.auth().currentUser.displayName;
        // return firebase.firestore().collection('users').doc(uid).;

    }

    fetchUserID(){
        return 'dummy user';
    }

    addNewPasscode(){
        const newPasscode = (new PasscodeGenerator()).generateOnetimePasscode();
        //add newPasscode to firebase
    }

    getControlBar(){
        if(this.fetchUserID()===this.state.creator){
            return (<div className="control_bar">
                <button className="control_button">generate passcode</button>
            </div>);
        }
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
                </div>
            </div>
        );
    }

}

export default ChatRoom;
