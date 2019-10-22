/*
Description: Create Channel Page
Authors: Darshan Prakash
Date: 10/18/2019
*/

import React, {Component} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import fire from '../../config/Fire'
import ChannelCreator from "../../services/ChannelCreator";


class CreateChannel extends Component {
    
    constructor(props) {
        super(props);
        this.createChannel = this.createChannel.bind(this);
        this.handlechannelChange = this.handlechannelChange.bind(this);
        this.state = {
            channelTitle: null,
            channelPassword: null,
            channelStartDate: null,
            channelEndDate: null,
            channelStartTime: null,
            channelEndTime: null,
            channelCreator: fire.auth().currentUser.uid,

            errors:{
                channelTitle: "",
                channelPassword: "",
                channelStartDate: "",
                channelEndDate: "",
                channelStartTime: "",
                channelEndTime: "",
            }
        }
    }

    handlechannelChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.errors;

        switch (name) {
            case 'channelTitle':
                break;
            case 'channelPassword':
                break;
            case 'channelStartDate':
                break;
            case 'channelEndDate':
                break;
            case 'channelStartTime':
                break;
            case 'channelEndTime':
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    

    createChannel(e) {
        e.preventDefault();
        const channelCreator=new ChannelCreator();
        channelCreator.creatNewChannel(
            this.state.channelTitle,
            this.state.channelPassword,
            this.state.channelStartDate,
            this.state.channelEndDate,
            this.state.channelStartTime,
            this.state.channelEndTime,
            this.state.channelCreator);
        this.routeTo(ROUTES.HOME);
    }

    routeTo = (path) => this.props.history.push(path);

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="FormTitle">
                        <h1>Create your Channel</h1>
                    </div>
                    <form onSubmit={this.createChannel}>
                        <div className="channelTitle">
                            <input
                                type="text"
                                id="channelTitle"
                                placeholder="Title"
                                name="channelTitle"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelPassword">
                            <input
                                type="text"
                                id="channelPassword"
                                placeholder="Password"
                                name="channelPassword"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelStartDate">
                            <text>
                                Start Date
                            </text>
                            <input
                                type="date"
                                id="channelStartDate"
                                name="channelStartDate"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelEndDate">
                            <text>
                                End Date
                            </text>
                            <input
                                type="date"
                                id="channelEndDate"
                                name="channelEndDate"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelStartTime">
                            <text>
                                Start Time
                            </text>
                            <input
                                type="time"
                                id="channelStartTime"
                                name="channelStartTime"
                                min="00:00"
                                max="23:59"
                                required
                                onChange={this.handlechannelChange}
                            ></input>
                        </div>
                        <div className="channelEndTime">
                            <text>
                                End Time
                            </text>
                            <input
                                type="time"
                                id="channelEndTime"
                                name="channelEndTime"
                                min="00:00"
                                max="23:59"
                                required
                                onChange={this.handlechannelChange}
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

}

export default CreateChannel;