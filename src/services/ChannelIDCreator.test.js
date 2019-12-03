/*
Description: test channel id generator
Authors: Hongfei Ju
Date: 10/16/2019
*/

import ChannelIDCreator from "./ChannelIDCreator";

test('should generate one string', ()=>{
    console.log((new ChannelIDCreator()).getNewChannelID());
});
