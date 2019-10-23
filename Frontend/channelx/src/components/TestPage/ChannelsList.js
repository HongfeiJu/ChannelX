import React, {useState, useEffect} from 'react';
import fire from "../../config/Fire";

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
             <h2>{ch.Title}</h2>
               <code className="channel">{ch.ValidDate}</code>
               <code className="channel">{ch.ValidTime}</code>
               <code className="channel">{ch.CreatorID}</code>
             </div>
            </li>
            )}
        </ol>
     </div>
    )
}

export default ChannelsList