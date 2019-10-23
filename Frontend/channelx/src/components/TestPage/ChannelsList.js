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
var li
var titles = [0,1,2,3,4];

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

function gotData(data) {

    var userId = fire.auth().currentUser.uid;
    console.log(userId);

   var chan = data.val();
//    console.log(chan);
   var keys = Object.keys(chan);
   console.log(keys);
for(var i = 0; i<keys.length; i++)  {
    // console.log(keys[i]);
    var k = keys[i];
    var title = chan[k].title;
    var creator = chan[k].creator

    if(creator !== userId) {

        console.log(title, creator);
        createElement('li', title );
        console.log(li);
        // li.class("channellisting");
        // li.parent("channellist");

        // titles = title;

    } 

    

    
}
}

function errData(err) {
    console.log('error');
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
     <body>
            <h2>Channel List</h2>
        
        <ol id = "channellist"> 
            
            
        </ol>
     </body>
    )
}


  




export default ChannelsList