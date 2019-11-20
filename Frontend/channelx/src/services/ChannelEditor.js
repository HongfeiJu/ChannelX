/*
description: edit channel
author: Manisha, Sami
date: 11/19/2019
 */

import firebase from "firebase";
import fire from "../config/Fire";

class ChannelEditor {

    editChannel(title,password, startDate, endDate,startTime,endTime,creator,id){

        console.log(id);
        fire.firestore().collection('channels').doc(id).set({
            channelTitle : title,
            channelPassword : password,
            channelStartDate : startDate,
            channelEndDate : endDate,
            channelStartTime : startTime,
            channelEndTime : endTime,
            channelCreator : creator
        });
        // const type = 'public';
    }
}

export default ChannelEditor;
