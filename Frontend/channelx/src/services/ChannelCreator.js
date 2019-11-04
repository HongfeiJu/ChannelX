/*
description: generate channel
author: Hongfei Ju, Darshan Prakash
date: 10/22/2019
 */

import firebase from "firebase";
import ChannelIDCreator from "./ChannelIDCreator";
import MessagingChannelCreator from "./MessagingChannelCreator";
import fire from "../config/Fire";

class ChannelCreator {

    creatNewChannel(title,password, startDate, endDate,startTime,endTime,creator){
        const channelIDCreator=new ChannelIDCreator();
        const messagingChannelCreator=new MessagingChannelCreator();
        channelIDCreator.getNewChannelID().then(r=>{
            const messagingChannelID = r.val().toString();
            fire.firestore().collection('channels').doc(messagingChannelID).set({
                channelTitle : title,
                channelPassword : password,
                channelStartDate : startDate,
                channelEndDate : endDate,
                channelStartTime : startTime,
                channelEndTime : endTime,
                channelCreator : creator
            });
            fire.firestore().collection('users').doc(creator).update(
                {
                    channelsCreated: firebase.firestore.FieldValue.arrayUnion(messagingChannelID)
                }
            );
            messagingChannelCreator.createChannel(messagingChannelID, title, creator);
            alert('channel created');
        }).catch(e=>{
            alert(e);
            alert('channel not created');
        })
    }
}

export default ChannelCreator;
