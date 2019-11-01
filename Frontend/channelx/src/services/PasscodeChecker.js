/*
description: check one time passcode
author: Hongfei Ju
date: 10/29/2019
 */

import firebase from "firebase";
import getCurrentUserUid from "./currentUuidGetter";

class PasscodeChecker{
    checkOnetimePasscode(channelID, passcode){
        return firebase.database().ref('channels/' + channelID + '/passcodes')
            .once('value').then(snapshot=>{
            const passcodesObjects = snapshot.val();
            //console.log(passcodesObjects);
            let passcodes=Object.keys(passcodesObjects);
            //console.log("passcodes: "+passcodes);
            if(passcodes==null||!passcodes.includes(passcode)){
                alert('invalid passcode');
                return false;
            }else{
                return true;
            }
        }).then(valid=>{
            if(valid){
                return this.checkUser(channelID, passcode)
            }else{
                return false;
            }
        }).then(valid=>{
            return valid;
        })
    }

    checkUser(channelID, passcode){
        return firebase.database().ref('channels/' + channelID + '/passcodes/' + passcode)
            .once('value').then((snapshot)=>{
                const visitedUsers=snapshot.val();
                console.log('users: '+visitedUsers);
                if(visitedUsers==null){
                    firebase.database().ref('channels/'+ channelID+'/passcodes/' + passcode +'/0')
                        .set(getCurrentUserUid()).then(r  =>{
                        console.log(r);
                    }).catch(e=>{
                        console.log(e)
                    });
                    return true;
                }else{
                    if(visitedUsers.includes(getCurrentUserUid())){
                        alert('passcode is used');
                        return false;
                    }else{
                        firebase.database().ref('channels/'+ channelID+'/passcodes/' + passcode +'/'+visitedUsers.length)
                            .set(getCurrentUserUid()).then(r  =>{
                            console.log(r);
                        }).catch(e=>{
                            console.log(e)
                        });
                        return true;
                    }
                }
            })
    }
}

export default PasscodeChecker;
