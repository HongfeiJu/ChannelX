/*
description: generate unique channel id
author: Hongfei Ju
date: 10/16/2019
 */

import firebase from "firebase";

class ChannelIDCreator{
    getNewChannelID(){
        let value = -1;
        return firebase.database().ref('nextID/').once('value', (snapshot) => {
            value = snapshot.val();
            if(value!=null){
                console.log('get '+value);
                this.updateNewID(value+1);
                return value;
            }
        });
    }

     updateNewID(nextID){
        firebase.database().ref('nextID').set(nextID)
            .then(r  =>{
                console.log('put '+nextID);
                console.log(r);
            }).catch(e=>{
            console.log(e)
        });
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}

export default ChannelIDCreator;
