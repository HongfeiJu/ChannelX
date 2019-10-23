/*
description: current UUID getter
author: Darshan Prakash
date: 10/21/2019
 */

import fire from "../config/Fire";

function getCurrentUserUid() {
    return fire.auth().currentUser.uid;
}
export default getCurrentUserUid;
