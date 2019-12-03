/*
description: cheat messaging channel based on id
author: Hongfei Ju
date: 10/16/2019
 */

import firebase from "firebase";

class MessagingChannelCreator{
    createChannel(channelID, title, creator, type){
        const today = new Date();

        const initialMessage = {
            id: 0,
            from: 'system',
            text: 'channel '+title +' created',
            timeStamp: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                +" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        };

        const newChannel = {
            title: title,
            type: type,
            creator: creator,
            messages:{
                0: initialMessage
            },
            passcodes:[]
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
