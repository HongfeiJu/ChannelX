/*
Description: Home page
Authors: Hongfei Ju
Date: 9/3/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";
import './ChatRoom.css';
import ChatMessage from "./ChatMessage/ChatMessage";

class ChatRoom extends Component{
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.state = {
            username: "user "+ Math.floor(Math.random()*100),
            message:'',
            messages : []
        }
    }

    componentDidMount() {
        this.scrollToBottom();
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
        console.log(e.target.value);
        this.setState({
            message:e.target.value
        });
    }

    submitMessage(){
        console.log("submit"+this.state.message);
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

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        this.messagesEnd.scrollTo(0, this.messagesEnd.scrollHeight);
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
                    <h3>sample channel</h3>
                </div>
                <div className="messagePanel"
                     ref={(el) => { this.messagesEnd = el; }}>
                    {currentMessage}
                </div>
                <div className="messageSending">
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
