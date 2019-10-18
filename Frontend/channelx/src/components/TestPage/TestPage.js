/*
Description: test page
Authors: Hongfei Ju
Date: 9/24/2019
*/

import React, {Component} from 'react';
import PasscodeGenerator from "../../services/PasscodeGenerator";
import ChannelIDCreator from "../../services/ChannelIDCreator";
import MessagingChannelCreator from "../../services/MessagingChannelCreator";

class TestPage extends Component{
    constructor(props){
        super(props);
        this.passcodeGenerator=new PasscodeGenerator();
        this.channelIDCreator=new ChannelIDCreator();
        this.msgChannelCreator=new MessagingChannelCreator();
    }

    showPasscode(){
        alert(this.passcodeGenerator.generateOnetimePasscode());
    }

    showChannelID(){
        this.channelIDCreator.getNewChannelID().then(r=>{
            alert(r.val());
        }).catch(e=>{
            alert(e);
        })
    }

    createNewChannel(){
        this.channelIDCreator.getNewChannelID().then(r=>{
            this.msgChannelCreator.createChannel(r.val(), 'channel '+ Math.floor(Math.random()*100), 'dummy user');
            alert('channel '+ r.val()+ ' created');
        }).catch(e=>{
            alert(e);
            alert('channel not created');
        })
    }

    render() {
        return (
            <div className="Home">
                <div className = "Header">
                    <button id="onetimePasscode_botton"
                            type="button"
                            style={{ marginLeft: "auto" }}
                            onClick={() => this.showPasscode()}

                    >show one time passcode</button>
                    <button id="channelID_botton"
                            type="button"
                            style={{ marginLeft: "auto" }}
                            onClick={() => this.showChannelID()}

                    >get channel id</button>
                    <button id="newChannel_btn"
                            type="button"
                            style={{ marginLeft: "auto" }}
                            onClick={() => this.createNewChannel()}

                    >create new channel</button>
                </div>
                <div className = "Main">
                </div>
                <div className = "Footer">
                </div>

            </div>
        );
    }

}

export default TestPage;
