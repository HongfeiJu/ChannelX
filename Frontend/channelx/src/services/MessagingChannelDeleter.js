/*
description: delete messaging channel based on id
author: Hongfei Ju
date: 11/11/2019
 */

import firebase from "firebase";

class MessagingChannelDeleter{
    deleteChannel(channelID){
        firebase.database().ref('channels/' + channelID).set([])
            .then(r  =>{
                console.log(r);
            }).catch(e=>{
            console.log(e)
        });
    }

}

export default MessagingChannelDeleter;
