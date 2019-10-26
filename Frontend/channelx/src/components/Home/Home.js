/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha 
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";
import {db} from "../../config/Fire";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import './Home.css'

import * as ROUTES from "../../constants/routes";
import getCurrentUserUid from '../../services/currentUuidGetter';


function getUsername() {
    var user = fire.auth().currentUser;

    if (user) {
        return user.displayName;
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.getCreatedChannels();
        this.getData();
    }

    routeTo = (path) => this.props.history.push(path);

    logout() {
        fire.auth().signOut();
    }

    state = {
        channels: null,
        data: [],
        filteredData: [],
        userCreatedChannels: [],
        selectedChannel: null,
    };

    handleSelectChange = event => {
        const selectedChannel = event.target.value;
        console.log(selectedChannel);
        this.setState(() => {
            return {
                selectedChannel
            };
        });
    };


    handleInputChange = event => {
        const query = event.target.value;
        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.toLowerCase().includes(query.toLowerCase());
            });
            return {
                query,
                filteredData
            };
        });
    };

    getChannelId = () => {
        console.log("Join Channel clicked");
        var selectedChannel = document.getElementById("channelDrop").value;
        console.log(selectedChannel);

        if (selectedChannel == "Select Channel") {
            alert("Please select a channel to join");
        } else {
            db.collection("channels").where("channelTitle", "==", selectedChannel)
                .get()
                .then(snapshot => {
                    snapshot
                        .docs
                        .forEach(doc => {
                            console.log("channelId    => ");
                            console.log(doc.id);
                            this.routeTo("/channel/" + doc.id)
                        });
                });
        }
    };

    getCreatedChannels = () => {
        db.collection("channels").where("channelCreator", "==", getCurrentUserUid())
            .get()
            .then(snapshot => {
                const userCreatedChannels = [];
                snapshot
                    .docs
                    .forEach(doc => {
                        userCreatedChannels.push(doc.get("channelTitle"));
                    });
                this.setState({
                    userCreatedChannels
                });
            });
    };

    getData = () => {
        db.collection("channels")
            .get()
            .then(snapshot => {
                const data = [];
                let i = 0;
                snapshot
                    .docs
                    .forEach(doc => {
                        if (i == 0) {
                            data.push("Select Channel");
                        }
                        i = i + 1;
                        data.push(doc.get("channelTitle"));
                    });
                return data;
            })
            .then(data => {
                const {query} = this.state;
                const filteredData = data;
                this.setState({
                    data,
                    filteredData,
                });
            });
    };

    channelListItemClick = (channelTitle) => {
        db.collection("channels").where("channelTitle", "==", channelTitle)
            .get()
            .then(snapshot => {
                snapshot
                    .docs
                    .forEach(doc => {
                        this.routeTo("/channel/" + doc.id)
                    })
            });
    };

    userCreatedChannels = () => {
        let data = this.state.userCreatedChannels
        return data.map((channelTitle) => {
            return (
                <ListItem button onClick={() => this.channelListItemClick(channelTitle)}>
                    <ListItemText primary={channelTitle}/>
                    <Divider/>
                </ListItem>
            )
        })
    };

    render() {
        const {filteredData} = this.state;
        let channelList = filteredData.length > 0
            && filteredData.map((channel, i) => {
                return (
                    <option key={i} value={channel}>{channel}</option>
                )
            }, this);

        return (
            <div className="Home">
                <div className="Header">
                    <h1>Hello {getUsername()}</h1>
                    <button id="createChannel"
                            type="button"
                            style={{marginLeft: "auto"}}
                            className="CreateChannel"
                            onClick={() => this.routeTo(ROUTES.CREATE_CHANNEL)}
                    >Create Channel
                    </button>
                    <button id="join"
                            type="button"
                            style={{marginLeft: "auto"}}
                            className="Join Channel"
                            onClick={this.getChannelId}
                    >
                        Join Channel
                    </button>
                    <button id="logout"
                            type="button"
                            style={{marginLeft: "auto"}}
                            className="Logout"
                            onClick={() => this.routeTo(ROUTES.LANDING)}
                    >Logout
                    </button>
                </div>
                <div className="Main">
                    <div id="searchForm">
                        <input
                            placeholder="Search for channels"
                            value={this.state.query}
                            onChange={this.handleInputChange}
                        />
                        <select id="channelDrop"
                                onChange={this.handleSelectChange}>
                            {channelList}
                        </select>
                    </div>
                    <div className="channelsList">
                        <List>
                            {this.userCreatedChannels()}
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
