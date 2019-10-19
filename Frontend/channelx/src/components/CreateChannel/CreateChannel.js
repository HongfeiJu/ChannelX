/*
Description: Create Channel Page
Authors: Darshan Prakash
Date: 10/18/2019
*/

import React, {Component} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";

class CreateChannel extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            channelTitle: null,
            channelPassword: null,
            channelOnePassword: null,
            channelStartDate: null,
            channelEndDate: null,
            channelStartTime: null,
            channelEndTime: null,
            errors:{
                channelTitle: "",
                channelPassword: "",
                channelOnePassword: "",
                channelStartDate: "",
                channelEndDate: "",
                channelStartTime: "",
                channelEndTime: ""
            }
        }
    }

    routeTo = (path) => this.props.history.push(path);

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="FormTitle">
                        <h1>Create your Channel</h1>
                    </div>
                    <form>
                        <div className="channelTitle">
                            <input
                                type="text"
                                placeholder="Title"
                                required
                            ></input>
                        </div>
                        <div className="channelPassword">
                            <input
                                type="text"
                                placeholder="Password"
                                required
                            ></input>
                        </div>
                        <div className="channelOnePassword">
                            <input
                                type="text"
                                placeholder="One time Password"
                                required
                            ></input>
                        </div>
                        <div className="channelStartDate">
                            <text>
                                Start Date
                            </text>
                            <input
                                type="date"
                                required
                            ></input>
                        </div>
                        <div className="channelEndDate">
                            <text>
                                End Date
                            </text>
                            <input
                                type="date"
                                required
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
                                required
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