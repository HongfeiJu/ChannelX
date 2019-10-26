/*
Description: Display all channels in DB 
Authors: Sami
Date: 10/18/2019
*/

import React, {useState, useEffect, createElement} from 'react';
import fire from "../../config/Fire";


// var user = fire.auth().currentUser;
// var ch = fire.collection('users').doc(user.uid).get().h2


var db = fire.database();
var ref = db.ref('channels');
ref.on('value', gotData , errData);
var li;
// var titles = [0,1,2,3,4];


function gotData(data) {
   if(fire.auth().currentUser){
    var userId = fire.auth().currentUser.uid;
    // console.log(userId);
   }

   var chan = data.val();
   var keys = Object.keys(chan);
//    console.log(keys);
for(var i = 0; i<keys.length; i++)  {
    var k = keys[i];
    var title = chan[k].title;
    var creator = chan[k].creator

    if(creator !== userId) {

        // console.log(title, creator);
        createElement('li', title );
        console.log(li);
    } 
    
}
}

function errData(err) {
    // console.log('error');
    console.log(err);
}


function useChannels() {


    const[channels,setchannels] = useState([])

    useEffect(() => {
        fire
         .firestore()
         .collection('channels')
         .onSnapshot((snapshot) =>  {
              const newChannels = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data()
              }))

              setchannels(newChannels)
         })


    }, [])

    return channels
}



const ChannelsList = () => {
    const channels = useChannels()
    return (
     <div>
            <h2>Channel List</h2>
        
        <ol> 
            {channels.map((ch) => 
            <li key = {ch.id}>
             <div className = "Channels" >
             <h2>{ch.channelTitle}</h2>
        
             </div>
            </li>
            )}
        </ol>
     </div>
    )
}


  




export default ChannelsList