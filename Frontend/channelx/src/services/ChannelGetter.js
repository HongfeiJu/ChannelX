/*
description: Created channels getter
//Basic structure of code that retrieves channelTitle from the database in Firebase
author: Manisha Miriyala
date: 10/23/2019
 */

import fire from "../config/Fire";

function getCreateChannelName() {
    return fire.auth().currentUser.channelTitle;
}
export default getCreateChannelName;
