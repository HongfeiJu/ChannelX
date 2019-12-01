/*
description: generate private channel
author: Darshan Prakash, Muhammad Sami
date: 11/19/2019
 */

import firebase from "firebase";
import ChannelIDCreator from "./ChannelIDCreator";
import MessagingChannelCreator from "./MessagingChannelCreator";
import PrivatePasscodeGenerator from "../services/PrivatePasscodeGenertor";
import fire from "../config/Fire";

class PrivateChannelCreator {

    

    creatNewPrivateChannel(title,creator){
        const messagingChannelCreator=new MessagingChannelCreator();
        const privatePasscodeGenerator=new PrivatePasscodeGenerator();
        let messagingChannelID = (new ChannelIDCreator()).getNewChannelID();
        privatePasscodeGenerator.generatePrivatePasscode(messagingChannelID).then(privatePasscode=>{
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
        });
        const type = 'private';
        messagingChannelCreator.createChannel(messagingChannelID, title, creator,type);
    }

    showAlert() {

        swal({
            title: "Private Channel Created Successfully!",
            text: "Passcode:  "+ mypasscode,
            icon: "success",
            button: "Copy Passcode",
          }).then(function() {

            var dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute('value', mypasscode);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);

            swal({
                title: "Passcode Copied Successfully!",
                icon: "success",
              }).then(function() {

                window.location = ROUTES.HOME;

              });

        });
    }
}

export default PrivateChannelCreator;
