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

import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap'
import MyNavbar from '../Navbar/MyNavbar'
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
            <>
                <MyNavbar />
                <Container>
                    <Row>
                        <Col>
                            <div class="searchForm">
                                <input
                                    placeholder="Search public channels"
                                    value={this.state.query}
                                    onChange={this.handleInputChange}
                                />
                                <select id="channelDrop"
                                        size={this.state.size} onFocus={()=>{this.setState({size: 5})}} 
                                        onBlur={()=>{this.setState({size: 1})}} //onChange={(e)=>{e.target.blur()}}
                                        onChange={this.handleSelectChange}
                                        >
                                    {channelList}
                                </select>
                            </div>
                            <Button id="HomeJoinChannel" variant="primary" onClick={this.getChannelId}>Join</Button>
                        </Col>
                        <Col>
                            <h1>My Channels</h1>
                            <div className="channelsList">
                                <List>
                                    {this.userCreatedChannels()}
                                </List>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
            // <div className="Home">
            //     <div className="Header">
            //         <h1>Hello {getUsername()}</h1>
            //         <div className="HomeHeaderButtons">

            //             <button id="HomeLogout"
            //                     type="button"
            //                     className="HomeLogout"
            //                     onClick={() => this.routeTo(ROUTES.LANDING)}
            //             >Logout
            //             </button>
            //             <button id="HomeCreateChannel"
            //                     type="button"
            //                     className="HomeCreateChannel"
            //                     onClick={() => this.routeTo(ROUTES.CREATE_CHANNEL)}
            //             >Create New
            //             </button>
            //         </div>
            //     </div>
            //     <div className="HomeMain">
            //         <hr>
            //         </hr>
            //         <div class="searchForm">
            //             <input
            //                 placeholder="Search public channels"
            //                 value={this.state.query}
            //                 onChange={this.handleInputChange}
            //             />
            //             <select id="channelDrop"
            //                     size={this.state.size} onFocus={()=>{this.setState({size: 5})}} 
            //                     onBlur={()=>{this.setState({size: 1})}} //onChange={(e)=>{e.target.blur()}}
            //                     onChange={this.handleSelectChange}
            //                     >
            //                 {channelList}
            //             </select>
            //         </div>
            //         <button id="HomeJoinChannel"
            //                 type="button"
            //                 className="HomeJoinChannel"
            //                 onClick={this.getChannelId}
            //         >
            //             Join
            //         </button>
            //         <hr>
            //         </hr>
            //         <h1>My Channels</h1>
            //         <div className="channelsList">
            //             <List>
            //                 {this.userCreatedChannels()}
            //             </List>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Home;
