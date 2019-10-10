/*
Description: Chat message
Authors: Hongfei Ju
Date: 10/1/2019
*/

import React, {Component} from 'react';
import './ChatMessage.css'

class ChatMessage extends Component{
    render() {
        return (
            <div className="message">
                <div className="messageUser">{this.props.user+": "}</div>
                <div className="messageText">{this.props.text}</div>
                <div className="messageTimestamp" style={{float:"right"}}>{this.props.time}</div>
            </div>
        );
    }

}

export default ChatMessage;
