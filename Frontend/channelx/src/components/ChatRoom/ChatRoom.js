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

class ChatRoom extends Component{
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
        this.state = {
            username: '',
            message:'',
            messages : []
        }
    }

    componentDidMount() {
        this.scrollToBottom();

        this.setState({
            username: this.fetchUsername()
        });

        firebase.database().ref('message/').on('value', (snapshot)=>{
            const currentMessages = snapshot.val();
            if(currentMessages!=null){
                this.setState({
                    messages: currentMessages
                });
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
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

        firebase.database().ref('message/' + newMessage.id).set(newMessage)
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
    routeTo(path) {
        this.props.history.push(path);
    }

    render() {
        const currentMessage = this.state.messages.map((message, i)=>{
           return (
               <ChatMessage key={i} user={message.from} text={message.text} time={message.timeStamp}/>
           )
        });
        return (
            <div className="chatRoom">
                <div className="roomTitle">
                    <h3>Chat Window</h3>
                </div>
                <div className="messagePanel"
                     ref={(el) => { this.messagesEnd = el; }}>
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
