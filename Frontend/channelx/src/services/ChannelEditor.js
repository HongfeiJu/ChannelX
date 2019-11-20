/*
description: Update edited channel in Firebase
author: Manisha Miriyala
date: 10/22/2019
 */

import firebase from "firebase";
import ChannelIDCreator from "./ChannelIDCreator";
import fire from "../config/Fire";

class ChannelEditor {

    editChannel(title,password, startDate, endDate,startTime,endTime,creator,id){
        fire.firestore().collection('channels').doc(id).set({
            channelTitle : title,
            channelPassword : password,
            channelStartDate : startDate,
            channelEndDate : endDate,
            channelStartTime : startTime,
            channelEndTime : endTime,
            channelCreator : creator
        });

    }
}

export default ChannelEditor;
