/*
description: check one time passcode
author: Hongfei Ju
date: 10/29/2019
 */

import firebase from "firebase";
import fire from "../config/Fire";
import { debug } from "util";

class PasscodeChecker{
    checkOnetimePasscode(channelID, passcode){
        return firebase.database().ref('channels/' + channelID + '/passcodes')
            .once('value').then(snapshot=>{
            const passcodesObjects = snapshot.val();
            console.log(passcode);
            console.log(passcodesObjects);
            if(passcodesObjects === null){
                alert('invalid passcode');
                return false;
            }
            let passcodes=Object.keys(passcodesObjects);
            console.log("passcodes: "+passcodes);
            if(passcodes==null||!passcodes.includes(passcode)){
                alert('invalid passcode');
                // console.log("nae mil raha");
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

    // checkOnetimePasscodeFin(channelID, passcode){
    //     return firebase.database().ref('channels/' + channelID + '/passcodes')
    //         .once('value').then(snapshot=>{
    //         const passcodesObjects = snapshot.val();
    //         console.log(passcode)
    //         console.log(passcodesObjects);
    //         let passcodes=Object.keys(passcodesObjects);
    //         console.log("passcodes: "+passcodes);
    //         if(passcodes != null && passcodesObjects.(passcode) >= 0){
    //             // alert('invalid passcode');
    //             // console.log("nae mil raha");
    //             return true;
                
    //         }else {
    //             return false;
    //         }
    //     }).then(valid=>{
    //         if(valid){
    //             return this.checkUser(channelID, passcode)
    //         }else{
    //             return false;
    //         }
    //     }).then(valid=>{
    //         return valid;
    //     })
    // }




    checkUser(channelID, passcode){
        return firebase.database().ref('channels/' + channelID + '/passcodes/' + passcode)
            .once('value').then((snapshot)=>{
                const visitedUsers=Object.values(snapshot.val());
                console.log('visited users');
                console.log(visitedUsers);
                if(visitedUsers==null){
                    firebase.database().ref('channels/'+ channelID+'/passcodes/' + passcode +'/0/')
                        .set(this.getCurrentUserUid()).then(r  =>{
                        console.log(r);
                    }).catch(e=>{
                        console.log(e)
                    });
                    return true;
                }else{
                    if(visitedUsers ===this.getCurrentUserUid() || visitedUsers.includes(this.getCurrentUserUid())){
                        alert('passcode is used');
                        return false;
                    }else{
                        firebase.database().ref('channels/'+ channelID+'/passcodes/' + passcode +'/'+visitedUsers.length)
                            .set(this.getCurrentUserUid()).then(r  =>{
                            console.log(r);
                        }).catch(e=>{
                            console.log(e)
                        });
                        return true;
                    }
                }
            })
    }

    getCurrentUserUid(){
        console.log(fire.auth().currentUser.uid)
        return fire.auth().currentUser.uid;
    }
}

export default PasscodeChecker;
