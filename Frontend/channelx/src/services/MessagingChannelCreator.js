/*
description: cheat messaging channel based on id
author: Hongfei Ju
date: 10/16/2019
 */

import firebase from "firebase";

class MessagingChannelCreator{
    createChannel(channelID, title, creator){
        const today = new Date();

        const initialMessage = {
            id: 0,
            from: 'system',
            text: 'channel '+title +' created by ' + creator,
            timeStamp: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                +" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        };

        const newChannel = {
            title: title,
            creator: creator,
            messages:{
                0: initialMessage
            }
        };

        firebase.database().ref('channels/' + channelID).set(newChannel)
            .then(r  =>{
                console.log(r);
            }).catch(e=>{
            console.log(e)
        });
    }

}

export default MessagingChannelCreator;
