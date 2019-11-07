/*
description: get channel id by private passcode
author: Hongfei Ju
date: 11/42019
 */

import firebase from "firebase";

class ChannelIDGetter{

    generateChannelID(privatePasscode){
        return firebase.database().ref('privatePasscodes/'+privatePasscode).once('value', (r)=>{
            return r.val();
        })
    }
}

export default ChannelIDGetter;
