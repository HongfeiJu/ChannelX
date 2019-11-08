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
            console.log(passcode)
            console.log(passcodesObjects);
            let passcodes=Object.keys(passcodesObjects);
            // console.log("passcodes: "+passcodes);
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


    // checkOnetimePasscodefin(channelID, passcode){
    //     return firebase.database().ref('channels/' + channelID + '/passcodes')
    //         .once('value').then(snapshot=>{
    //         const passcodesObjects = snapshot.val();
    //         console.log(passcode)
    //         console.log(passcodesObjects);
    //         let passcodes=Object.keys(passcodesObjects);
    //         // console.log("passcodes: "+passcodes);
    //         if(passcodes!=null)
    //         {
    //             // alert('invalid passcode');
    //             // console.log("nae mil raha");
    //             // return false;

    //             // let filteredClasses = passcodesObjects.filter(passcode => passcodesObjects.includes(passcode));

    //             console.log(passcodesObjects[0]);
                
                
    //             if(passcodesObjects[1] === passcode) {
    //                 return true;
    //             } else {

    //                 return false;
                    
    //             }

                
    //         }else{
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


    // checkOnetimePasscodefin = (channelID, passcode) => {
    //     return firebase.database().ref('channels/' + channelID + '/passcodes')
    //         .once('value').then(snapshot=>{
    //         const passcodesObjects = snapshot.val();
    //         console.log(passcode)
    //         console.log(passcodesObjects);
    //         let passcodes=Object.keys(passcodesObjects);
    //         // console.log("passcodes: "+passcodes);
    //         if(passcodes==null||!snapshot.val().(passcode)){
    //             alert('invalid passcode');
    //             console.log("nae mil raha");
    //             return false;
                
    //         }else{
    //             return true;
    //         }
    //     }
    
    //         )}






    checkUser(channelID, passcode){
        return firebase.database().ref('channels/' + channelID + '/passcodes/' + passcode)
            .once('value').then((snapshot)=>{
                const visitedUsers=snapshot.val();
                console.log('users: '+visitedUsers);
                if(visitedUsers==null){
                    firebase.database().ref('channels/'+ channelID+'/passcodes/' + passcode +'/0')
                        .set(this.getCurrentUserUid()).then(r  =>{
                        console.log(r);
                    }).catch(e=>{
                        console.log(e)
                    });
                    return true;
                }else{
                    if(visitedUsers.includes(this.getCurrentUserUid())){
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
        return fire.auth().currentUser.uid;
    }
}

export default PasscodeChecker;
