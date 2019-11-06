/*
description: generate unique channel id
author: Hongfei Ju
date: 10/29/2019
 */

class ChannelIDCreator{
    getNewChannelID(){
        const today = new Date();
        let time=today.getTime();
        let res='';
        let str=time.toString();
        for(let i=0;i<str.length;i++){
            if(i%2===0) res+=str.charAt(i);
            else{
                let sub='a';
                switch (str.charAt(i)) {
                    case '0': sub='a';
                        break;
                    case '1': sub='b';
                        break;
                    case '2': sub='c';
                        break;
                    case '3': sub='d';
                        break;
                    case '4': sub='e';
                        break;
                    case '5': sub='f';
                        break;
                    case '6': sub='g';
                        break;
                    case '7': sub='h';
                        break;
                    case '8': sub='i';
                        break;
                    case '9': sub='j';
                        break;
                    default:sub='0';
                }
                res+=sub;
            }
        }
        return res;
    }
}

export default ChannelIDCreator;
