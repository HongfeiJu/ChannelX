/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha, Subhradeep
Date: 9/24/2019
Updated: 10/31/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";
import fire from "../../config/Fire";
import {db} from "../../config/Fire";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './Home.css';
import * as ROUTES from "../../constants/routes";

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if(user) {
                this.setState({
                    UUID: user.uid,
                    displayName: user.displayName,
                    user
                });
                this.getCreatedChannels();
                this.getData();
            } else {
                this.setState({user: null});
                this.routeTo(ROUTES.LANDING);
            }
        });
    }

    routeTo = (path) => this.props.history.push(path);

    logout() {
        fire.auth().signOut();
    }

    state = {
        channels: null,
        data: [],
        filteredData: [],
        filtered: [],
        filtered_List: [],
        userCreatedChannels: [],
        selectedChannel: null,
    };

    handleSelectChange = event => {
        //event.target.blur()
        const selectedChannel = event.target.value;
        console.log(selectedChannel);
        this.setState(() => {
            return {
                selectedChannel
            };
        });
        event.target.blur()
        event.target.parentNode.blur();
    };


    handleInputChange = event => {
        const query = event.target.value;
        console.log(query);
        let filteredData = [];
        this.setState(prevState => {
            if (query == '') {
                filteredData.push("Select Channel");
            } else {
                filteredData = prevState.data.filter(element => {
                    return element.toLowerCase().includes(query.toLowerCase());
                });
            }
            return {
                query,
                filteredData
            };
        });
    };

    
    handleSelectChangeParticipated = event => {
        const selected = event.target.value;
        console.log(selected);
        this.setState(() => {
            return {
                selected
            };
        });
    };

   
    handleInputChangeParticipated = event => {
        const query_participate = event.target.value;
        
        let filtered_list = this.state.userCreatedChannels.filter(ele => {
            return ele.toLowerCase().startsWith(query_participate.toLowerCase())
        })

        console.log("Original List: ", this.state.userCreatedChannels)
        console.log("Filtered List: ", filtered_list)
        this.setState({
            filtered: filtered_list
        });
    
  };

    getChannelId = () => {
        console.log("Join Channel clicked");
        var selectedChannel = document.getElementById("channelDrop").value;
        const currUser = fire.auth().currentUser.uid
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
                            fire.firestore().collection('users').doc(currUser).update(
                                {
                                    channelsJoined: firebase.firestore.FieldValue.arrayUnion(doc.id)
                                }
                            );
                        });
                });
        }

    };

    getCreatedChannels = () => {
        db.collection("channels").where("channelCreator", "==", this.state.UUID)
            .get()
            .then(snapshot => {
                const userCreatedChannels = [];
                let i = 0;
                snapshot
                    .docs
                    .forEach(doc => {

                        userCreatedChannels.push(doc.get("channelTitle"));
                    });
                    return userCreatedChannels;
                })
            .then(userCreatedChannels => {
                const {query_participate} = this.state;
                const filtered = userCreatedChannels;
                this.setState({
                    userCreatedChannels,
                    filtered
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
                const filteredData = data.slice(0, 1);
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
        let data = this.state.filtered
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

        const {filtered} = this.state;
        let participatedList = filtered.length > 0
            && filtered.map((channel, i) => {
                return (
                    <option key={i} value={channel}>{channel}</option>
                    )
                }, this);         
        
            return (
            <div>
                <div className="Home">
                    <h1>Hello {this.state.displayName}</h1>
                        <div className="HomeHeaderButtons">
                            <button id="HomeLogout"
                            type="button"
                            className="HomeLogout"
                            onClick={() => this.routeTo(ROUTES.LANDING)}
                    >Logout
                    </button>
                    <button id="HomeCreateChannel"
                            type="button"
                            className="HomeCreateChannel"
                            onClick={() => this.routeTo(ROUTES.CREATE_CHANNEL)}
                    >Create New
                    </button>
                </div>
                <hr>
                </hr>
                <div class="searchForm">
                    <input
                        placeholder="Search public channels"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    <select id="channelDrop"
                            size={this.state.size} onFocus={() => {
                        this.setState({size: 3})
                    }}
                            onBlur={() => {
                                this.setState({size: 1})
                            }} //onChange={(e)=>{e.target.blur()}}
                            onChange={this.handleSelectChange}
                    >
                        {channelList}
                    </select>
                </div>
                <button id="HomeJoinChannel"
                        type="button"
                        className="HomeJoinChannel"
                        onClick={this.getChannelId}
                >
                    Join
                </button>
                <hr>
                </hr>
                <div className= "participatedList">
                        <div className="channelsList">
                            <div class="searchFormCreated">
                                <input
                                    placeholder="Search Created Channels"
                                    value={this.state.query_participate}
                                    onChange={this.handleInputChangeParticipated}/>
                            </div>
                            <List>
                                {this.userCreatedChannels()}
                            </List>

                        </div>
                    </div>
            </div>
            </div>
        );
    }
}

export default Home;