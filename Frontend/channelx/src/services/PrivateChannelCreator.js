/*
description: generate private channel
author: Darshan Prakash
date: 10/30/2019
 */

import firebase from "firebase";
import ChannelIDCreator from "./ChannelIDCreator";
import MessagingChannelCreator from "./MessagingChannelCreator";
import PrivatePasscodeGenerator from "../services/PrivatePasscodeGenertor";
import fire from "../config/Fire";

class PrivateChannelCreator {

    creatNewPrivateChannel(title,creator){
        const messagingChannelCreator=new MessagingChannelCreator();
        const privatePasscodeGenerator=new PrivatePasscodeGenerator();
        let messagingChannelID = (new ChannelIDCreator()).getNewChannelID();
        privatePasscodeGenerator.generatePrivatePasscode(messagingChannelID).then(privatePasscode=>{
            fire.firestore().collection('privateChannels').doc(messagingChannelID).set({
                channelTitle : title,
                channelPassword : privatePasscode,
                channelCreator : creator
            });
            fire.firestore().collection('users').doc(creator).update(
                {
                    privateChannelsCreated: firebase.firestore.FieldValue.arrayUnion(messagingChannelID)
                }
            );
            alert('Private channel '+ title + ' created with passcode ' + privatePasscode);
        });
        const type = 'private';
        messagingChannelCreator.createChannel(messagingChannelID, title, creator,type);
    }
}

export default PrivateChannelCreator;
