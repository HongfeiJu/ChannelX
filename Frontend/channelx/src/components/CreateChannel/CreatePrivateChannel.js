/*
Description: Create Private Channel Page
Authors: Darshan Prakash
Date: 11/04/2019
*/

import React, {Component} from 'react';
import './CreateChannel.css'
import * as ROUTES from "../../constants/routes";
import PrivateChannelCreator from "../../services/PrivateChannelCreator";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'date-fns';
import firebase from "firebase";

class CreatePrivateChannel extends Component {

    constructor(props) {
        super(props);
        this.createChannel = this.createChannel.bind(this);
        this.handlechannelChange = this.handlechannelChange.bind(this);
        this.state = {
            channelTitle: null,
            alert: null,
            errors: {
                channelTitle: "",
            }
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                this.setState({
                    UUID: user.uid,
                    user
                });
            } else {
                this.setState({user: null});
                this.routeTo(ROUTES.LANDING);
            }
        });
    }

    handlechannelChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.errors;
        switch (name) {
            case 'channelTitle':
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => console.log(this.state));
    };

    createChannel(e) {
        e.preventDefault();
        const privateChannelCreator = new PrivateChannelCreator();
        privateChannelCreator.creatNewPrivateChannel(
            this.state.channelTitle,
            this.state.UUID);
        this.routeTo(ROUTES.HOME);
    }

    routeTo = (path) => this.props.history.push(path);

    render() {
        if (!this.props.show){
            return null;
        }
        return (
            <div className="CreateChannelForm">
                <form onSubmit={this.createChannel}>
                    <div className="ModalArrowRight">
                        &#11014;
                    </div>
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
                    <div className="createChannel">
                        <button
                            type="button"
                            id="cancelButton"
                            className="leaveButton"
                            onClick={() => {this.props.closePrivateModal()}}
                        >Close
                        </button>
                        <button
                            type="submit"
                            id="submitButton"
                            className="createButton"
                        >Create
                        </button>
                    </div>
                    <hr/>
                </form>
            </div>
        );
    }
}

export default CreatePrivateChannel;
