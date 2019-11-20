/*
description: Update edited channel in Firebase
author: Manisha Miriyala, Muhammed Sami
date: 11/19/2019
 */

import fire from "../config/Fire";

class ChannelEditor {

    editChannel(id_channel,title,password, startDate, endDate,startTime,endTime,creator){
        console.log("id extracted from channelinfoeditor:", id_channel);
        fire.firestore().collection('channels').doc(id_channel).set({
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
