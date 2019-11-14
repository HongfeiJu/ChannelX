/*
description: get channel id by private passcode
author: Hongfei Ju
date: 11/4/2019
 */

import firebase from "firebase";

class ChannelIDGetter{

    getChannelID(privatePasscode){
        return firebase.database().ref('privatePasscodes/'+privatePasscode).once('value', (r)=>{
            return r.val();
        })
    }
}

export default ChannelIDGetter;
