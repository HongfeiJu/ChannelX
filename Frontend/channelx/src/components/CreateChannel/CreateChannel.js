/*
Description: Create Channel Page
Authors: Darshan Prakash
Date: 10/18/2019
*/

import React, {Component,useState} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import fire from '../../config/Fire'

const CreateChannel = () => {
    const [channelTitle, setTitle] = useState('')
    const [channelPassword, setPassword] = useState('')
    const [channelOnePassword, setOneTimePassword] = useState('')
    const [channelStartDate, setValidStartDate] = useState('')
    const [channelEndDate, setValidEndDate] = useState('')
    const [channelStartTime, setValidStartTime] = useState('')
    const [channelEndTime, setValidEndTime] = useState('')
    const [channelCreator, setCreatorID] = useState('')

    function createChannel(e) {
        e.preventDefault();
        fire
        .firestore()
        .collection('channels')
        .add({
            channelTitle,
            channelPassword,
            channelOnePassword,
            channelStartDate,
            channelEndDate,
            channelStartTime,
            channelEndTime,
        })
        .then(() => {
            setTitle('')
            setPassword('')
            setOneTimePassword('')
            setValidStartDate('')
            setValidEndDate('')
            setValidStartTime('')
            setValidEndTime('')
            setCreatorID('')

        })
    }

    return(
        <div className="wrapper">
                <div className="form-wrapper">
                    <div className="FormTitle">
                        <h1>Create your Channel</h1>
                    </div>
                    <form onSubmit={createChannel}>
                        <div className="channelTitle">
                            <input
                                type="text"
                                placeholder="Title"
                                required
                                value={channelTitle} 
                                onChange={e => setTitle(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="channelPassword">
                            <input
                                type="text"
                                placeholder="Password"
                                required
                                value={channelPassword} 
                                onChange={e => setPassword(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="channelOnePassword">
                            <input
                                type="text"
                                placeholder="One time Password"
                                required
                                value={channelOnePassword} 
                                onChange={e => setOneTimePassword(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="channelStartDate">
                            <text>
                                Start Date
                            </text>
                            <input
                                type="date"
                                required
                                value={channelStartDate} 
                                onChange={e => setValidStartDate(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="channelEndDate">
                            <text>
                                End Date
                            </text>
                            <input
                                type="date"
                                required
                                value={channelEndDate} 
                                onChange={e => setValidEndDate(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="channelStartTime">
                            <text>
                                Start Time
                            </text>
                            <input
                                type="time"
                                min="00:00"
                                max="23:59"
                                required
                                value={channelStartTime} 
                                onChange={e => setValidStartTime(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="channelEndTime">
                            <text>
                                End Time
                            </text>
                            <input
                                type="time"
                                min="00:00"
                                max="23:59"
                                value={channelEndTime} 
                                onChange={e => setValidEndTime(e.currentTarget.value)}
                            ></input>
                        </div>
                        <div className="createChannel">
                            <button
                                type="button"
                                id="cancelButton"
                                className="leaveButton"
                                onClick={() => this.routeTo(ROUTES.HOME)}
                            >Leave
                            </button>
                            <button
                                type="submit"
                                id="submitButton"
                                className="createButton"
                            >Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );

}
export default CreateChannel

// class CreateChannel extends Component {
    
//     constructor(props) {
//         super(props);
//         this.handleChannelchange = this.handleChannelchange.bind(this);
//         this.createChannel = this.createChannel.bind(this);
//         this.state = {
//             channelTitle: null,
//             channelPassword: null,
//             channelOnePassword: null,
//             channelStartDate: null,
//             channelEndDate: null,
//             channelStartTime: null,
//             channelEndTime: null,
//             channelCreator: fire.auth().currentUser.uid,
//             errors:{
//                 channelTitle: "",
//                 channelPassword: "",
//                 channelOnePassword: "",
//                 channelStartDate: "",
//                 channelEndDate: "",
//                 channelStartTime: "",
//                 channelEndTime: ""
//             }
//         }
//     }

//     handleChannelchange = e => {
//         e.preventdefault();
//         const{name,value} = e.target;
//         let formErrors = this.state.errors;

//         this.setState({formErrors,[name]:value},() => console.log(this.state));
//     }

    

//     createChannel(e) {
//         e.preventDefault();
//         alert(this.state.channelCreator);

//         // fire.firestore().collection('channels').doc("1").set({
//         //     channelTitle : this.state.channelTitle,
//         //     channelPassword : this.state.channelPassword,
//         //     channelOnePassword : this.state.channelOnePassword,
//         //     channelStartDate : this.state.channelStartDate,
//         //     channelEndDate : this.state.channelEndDate,
//         //     channelStartTime : this.state.channelStartTime,
//         //     channelEndTime : this.state.channelEndTime,
//         //     channelCreator : this.state.channelCreator

//         // })

//         fire
//         .firestore()
//         .collection('channels')
//         .add({
//             channelTitle,
//             channelPassword,
//             channelOnePassword,
//             channelStartDate,
//             channelEndDate,
//             channelStartTime,
//             channelEndTime,
//             channelCreator
//         })
//         .then(() => {
//             setTitle('')
//             setPassword('')
//             setOneTimePassword('')
//             setValidStartDate('')
//             setValidEndDate('')
//             setValidStartTime('')
//             setValidEndTime('')
//             setCreatorID('')

//         })
//     }

//     routeTo = (path) => this.props.history.push(path);

//     render() {
//         return (
//             <div className="wrapper">
//                 <div className="form-wrapper">
//                     <div className="FormTitle">
//                         <h1>Create your Channel</h1>
//                     </div>
//                     <form onSubmit={this.createChannel}>
//                         <div className="channelTitle">
//                             <input
//                                 type="text"
//                                 placeholder="Title"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="channelPassword">
//                             <input
//                                 type="text"
//                                 placeholder="Password"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="channelOnePassword">
//                             <input
//                                 type="text"
//                                 placeholder="One time Password"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="channelStartDate">
//                             <text>
//                                 Start Date
//                             </text>
//                             <input
//                                 type="date"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="channelEndDate">
//                             <text>
//                                 End Date
//                             </text>
//                             <input
//                                 type="date"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="channelStartTime">
//                             <text>
//                                 Start Time
//                             </text>
//                             <input
//                                 type="time"
//                                 min="00:00"
//                                 max="23:59"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="channelEndTime">
//                             <text>
//                                 End Time
//                             </text>
//                             <input
//                                 type="time"
//                                 min="00:00"
//                                 max="23:59"
//                                 required
//                                 onChange={this.handleChannelchange}
//                             ></input>
//                         </div>
//                         <div className="createChannel">
//                             <button
//                                 type="button"
//                                 id="cancelButton"
//                                 className="leaveButton"
//                                 onClick={() => this.routeTo(ROUTES.HOME)}
//                             >Leave
//                             </button>
//                             <button
//                                 type="submit"
//                                 id="submitButton"
//                                 className="createButton"
//                             >Create
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//         );
//     }

// }

// export default CreateChannel;