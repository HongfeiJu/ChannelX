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
            username: "user "+ Math.floor(Math.random()*100),
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
                console.log(r)
            }).catch(e=>{
                console.log(e)
            });
    }

    render() {
        const currentMessage = this.state.messages.map((message, i)=>{
           return (
               <li className="message" key={message.id}>
                   <p>{message.from+"says:"}</p>
                   <p>{message.text}</p>
                   <p>{message.timeStamp}</p>
               </li>
           )
        });
        const today = new Date();
        return (
            <div className="Register">
                <p>{today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                +" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()}</p>
                <div className="channelTitle">
                    <h3>sample channel</h3>
                </div>
                <div className="messagePanel">
                    <ol>
                        {currentMessage}
                    </ol>
                </div>
                <div className="messageSending">
                    <input
                        type="text"
                        placeholder="newMessage"
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
