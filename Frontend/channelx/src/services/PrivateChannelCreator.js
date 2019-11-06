/*
description: generate private channel
author: Darshan Prakash
date: 10/30/2019
 */

import firebase from "firebase";
import ChannelIDCreator from "./ChannelIDCreator";
import MessagingChannelCreator from "./MessagingChannelCreator";
import fire from "../config/Fire";

class PrivateChannelCreator {

    creatNewPrivateChannel(title,privatePasscode,creator){
        const channelIDCreator=new ChannelIDCreator();
        const messagingChannelCreator=new MessagingChannelCreator();
        channelIDCreator.getNewChannelID().then(r=>{
            const messagingChannelID = r.val().toString();
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
            const type = 'private';
            messagingChannelCreator.createChannel(messagingChannelID, title, creator,type);
            alert('channel created');
        }).catch(e=>{
            alert(e);
            alert('channel not created');
        })
    }
}

export default PrivateChannelCreator;
