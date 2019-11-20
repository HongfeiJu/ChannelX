/*
description: edit channel
author: Manisha, Sami
date: 11/19/2019
 */

import firebase from "firebase";
// import ChannelIDCreator from "./ChannelIDCreator";
// import MessagingChannelCreator from "./MessagingChannelCreator";
import fire from "../config/Fire";

class ChannelEditor {

    editChannel(title,password, startDate, endDate,startTime,endTime,creator,id){

        console.log(id);

        // const messagingChannelCreator=new MessagingChannelCreator();
        // let messagingChannelID = (new ChannelIDCreator()).getNewChannelID();
        fire.firestore().collection('channels').doc(id).set({
            channelTitle : title,
            channelPassword : password,
            channelStartDate : startDate,
            channelEndDate : endDate,
            channelStartTime : startTime,
            channelEndTime : endTime,
            channelCreator : creator
        });
        // fire.firestore().collection('users').doc(creator).update(
        //     {
        //         channelsCreated: firebase.firestore.FieldValue.arrayUnion(messagingChannelID)
        //     }
        // );
        const type = 'public';
        // messagingChannelCreator.createChannel(messagingChannelID, title, creator,type);
        // alert('channel created');
    }
}

export default ChannelEditor;
