/*
Description: test page
Authors: Hongfei Ju , Sami
Date: 9/24/2019
*/

import React, {Component} from 'react';
import PasscodeGenerator from "../../services/PasscodeGenerator";
import ChannelIDCreator from "../../services/ChannelIDCreator";
import MessagingChannelCreator from "../../services/MessagingChannelCreator";
import Fire from "../../config/Fire";
import AddChannelEntryForm from "./AddChannelEntryForm";
import ChannelsList from "./ChannelsList"
import PasscodeChecker from "../../services/PasscodeChecker";
import PrivatePasscodeGenerator from "../../services/PrivatePasscodeGenertor";
import ChannelIDGetter from "../../services/ChannelIDGetter";
import MessagingChannelDeleter from "../../services/MessagingChannelDeleter";



class TestPage extends Component{
    constructor(props){
        super(props);
        this.passcodeGenerator=new PasscodeGenerator();
        this.channelIDCreator=new ChannelIDCreator();
        this.msgChannelCreator=new MessagingChannelCreator();
        this.passcodeChecker=new PasscodeChecker();
        this.privatePasscodeGenerator=new PrivatePasscodeGenerator();
        this.channelIDGetter=new ChannelIDGetter();
        this.messagingChannelDeleter=new MessagingChannelDeleter();
    }

    showPasscode(){
        alert(this.passcodeGenerator.generateOnetimePasscode());
    }

    showChannelID(){
        alert(this.channelIDCreator.getNewChannelID());
    }

    createNewChannel(){
        const id=this.channelIDCreator.getNewChannelID();
        this.msgChannelCreator.createChannel(id,
            'channel '+ Math.floor(Math.random()*100), 'dummy user', 'true');
        alert('channel '+id+'created');

    }

    checkUser(){
        this.passcodeChecker.checkOnetimePasscode('1f7c4b3h1f9a6', 'RedPig').then(r=>{
            alert('final:'+r);
        });
    }

    getPrivatePasscode(){
        this.privatePasscodeGenerator.generatePrivatePasscode('testID').then(r=>{
            alert('get '+r);
        })

    }

    getChannelID(){
        this.channelIDGetter.getChannelID('2001GreenBenzGasPickup').then(r=>{
            alert(r.val());
        })
    }

    deleteChannel(){
        this.messagingChannelDeleter.deleteChannel('1f7d5d7e8f3c5');
    }


    render() {
        return (
            <div className="Home">
                
                <div className = "Header">
                <h1>
                    Test For Create Channel
                </h1>
                    <div>
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
                        <button id="newChannel_btn"
                                type="button"
                                style={{ marginLeft: "auto" }}
                                onClick={() => this.checkUser()}
                        >check user</button>
                        <button id="newChannel_btn"
                                type="button"
                                style={{ marginLeft: "auto" }}
                                onClick={() => {
                                    this.getPrivatePasscode()
                                }}
                        >private passcode</button>
                        <button id="newChannel_btn"
                                type="button"
                                style={{ marginLeft: "auto" }}
                                onClick={() => {
                                    this.getChannelID()
                                }}
                        >get channel id</button>
                        <button id="newChannel_btn"
                                type="button"
                                style={{ marginLeft: "auto" }}
                                onClick={() => {
                                    this.deleteChannel()
                                }}
                        >delete channel</button>
                    </div>
                    <ChannelsList/>
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
