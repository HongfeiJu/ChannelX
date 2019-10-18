/*
description: generate channel
author:
date:
 */

import firebase from "firebase";
import ChannelIDCreator from "./ChannelIDCreator";
import MessagingChannelCreator from "./MessagingChannelCreator";

class ChannelCreator{

    creatNewChannel(){
        const channelIDCreator=new ChannelIDCreator();
        const messagingChannelCreator=new MessagingChannelCreator();
        channelIDCreator.getNewChannelID().then(r=>{
            const messagingChannelID = r.val();
            //create new channel in firestore;

            messagingChannelCreator.createChannel(messagingChannelID, 'dummy title', 'dummy creator');
            alert('channel '+ r.val()+ ' created');
        }).catch(e=>{
            alert(e);
            alert('channel not created');
        })
    }
}

export default ChannelCreator;
