/*
Description: Home page
Authors: Hongfei Ju
Date: 9/28/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";

class ChatRoom extends Component{
    constructor(props, context) {
        super(props, context);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.state = {
            message:'',
            messages : []
        }
    }

    componentDidMount() {
        firebase.database().ref('message/').on('value', (snapshot)=>{
            const currentMessages = snapshot.val();
            if(currentMessages!=null){
                this.setState({
                    messages: currentMessages
                });
            }
        })
    }

    updateMessage(e){
        console.log(e.target.value);
        this.setState({
            message:e.target.value
        });
    }

    submitMessage(){
        console.log("submit"+this.state.message);
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.message
        };
        firebase.database().ref('message/' + newMessage.id).set(newMessage)
            .then(r  =>{
                console.log(r)
            }).catch(e=>{
                console.log(e)
            });
    }

    render() {
        const currentMessage = this.state.messages.map((message, i)=>{
           return (
               <li key={message.id}>{message.text}</li>
           )
        });
        return (
            <div className="Register">
                <ol>
                    {currentMessage}
                </ol>
                <input
                    type="text"
                    placeholder="message"
                    onChange={this.updateMessage}
                />
                <br/>
                <button onClick={this.submitMessage}>send</button>
            </div>
        );
    }

}

export default ChatRoom;
