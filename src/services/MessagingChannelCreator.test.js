/*
Description: test create new messaging channel function
Authors: Hongfei Ju
Date: 10/20/2019
*/

import MessagingChannelCreator from "./MessagingChannelCreator";
import firebase from "firebase";

test('should generate one string', ()=>{
    //create a test channel
    (new MessagingChannelCreator()).createChannel(9999, 'test channel', 'test creator');

    let title='';
    let creator='';
    let messages=[];

    //get channel info from the created channel
    firebase.database().ref('channels/9999').on('value', (snapshot)=>{
        const channel = snapshot.val();
        if(channel!=null){
            title=channel.title;
            creator=channel.creator;
            messages=channel.messages;
        }
    });

    //check the value of the created channel
    expect(title).equals('test channel');
    expect(creator).equals('test creator');
    expect(messages).toHaveLength(1);

    //remove test channel
    firebase.database().ref('channels/9999').remove();
});
