/*
description: get public channel data by id
author: Manisha Miriyala
date: 11/6/2019
 */

import { db } from "../config/Fire";

class ChannelDataGetter {

    getPublicChannelPassword(id){
        db.collection("channels").doc(id).get().then(doc => {
            if (doc.exists) {
                return doc.get("channelPassword")
            } else {
                return null
            }
        })
    }
}

export default ChannelDataGetter;
