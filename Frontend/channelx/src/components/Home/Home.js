/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha, Subhradeep
Date: 9/24/2019
Updated: 10/31/2019
*/

import React, { Component } from 'react';
import firebase from "firebase";
import fire from "../../config/Fire";
import { db } from "../../config/Fire";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './Home.css';
import * as ROUTES from "../../constants/routes";
import SweetAlert from "react-bootstrap-sweetalert";
import ChannelIDGetter from "../../services/ChannelIDGetter";
import { publicDecrypt } from 'crypto';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.channelIDGetter = new ChannelIDGetter();
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
                    displayName: user.displayName,
                    user
                });
                this.getCreatedChannels();
                this.getParticipatedChannels();
                this.getData();
            } else {
                this.setState({ user: null });
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
        alert: null,
        res: null,
        userParticipatedChannels: [],
        filteredParticipated: [],
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


    handleInputChangeCreated = event => {
        const query_participate = event.target.value;

        let filtered_list = this.state.userCreatedChannels.filter(ele => {
            return ele.toLowerCase().includes(query_participate.toLowerCase())
        })

        console.log("Original List: ", this.state.userCreatedChannels)
        console.log("Filtered List: ", filtered_list)
        this.setState({
            filtered: filtered_list
        });

    };


    showAlert() {
        const getAlert = () => (

            <SweetAlert
                // success
                title="Public Channel Access!"
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}
                customButtons={
                    <React.Fragment>
                        <button onClick={() => this.hideAlert()}>Cancel</button>
                        <button onClick={() => this.showOneTimePasscodeAlert()}>One Time Passcode</button>
                        <button onClick={() => this.showPermanentPasscodeAlert() }>Passcode</button>
                    </React.Fragment>
                }
            >
                Join Channel using Passcode or One Time Passcode!
            </SweetAlert>

        );

        this.setState({
            alert: getAlert()
        });
    }

    showOneTimePasscodeAlert() {

        this.hideAlert();

        const getAlert = () => (

            <SweetAlert
                input 
                required
                inputType="text"
                title="Enter One Time Passcode"
                validationMsg="You must enter your One Time passcode!"
                onConfirm={(response) => this.onReceiveInput(response)}
                onCancel={() => this.hideAlert()}  >
             {/* Join Channel using Passcode or One Time Passcode! */}
             
            </SweetAlert >

            
        );

        // console.log(this.response);
        // console.log("sami");
        
        this.setState({
            alert: getAlert(),
            // res: this.response
        });

        

    }

   

    onReceiveInput = (response) => {
        console.log(response);
        this.hideAlert();
    };

    showPermanentPasscodeAlert() {

        this.hideAlert();

        const getAlert = () => (

            <SweetAlert
                input
                required
                inputType="password"
                title="Enter Passcode"
                validationMsg="You must enter Passcode!"
                onConfirm={this.onConfirm}
                onCancel={() => this.hideAlert()}
            >
             {/* Join Channel using Passcode or One Time Passcode! */}
            </SweetAlert >

        );

        this.setState({
            alert: getAlert()
        });

    }



    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
            alert: null
        });
    }


    handleInputChangeParticipated = event => {
        const query_participate1 = event.target.value;

        let filtered_list1 = this.state.userParticipatedChannels.filter(ele => {
            return ele.toLowerCase().includes(query_participate1.toLowerCase())
        })

        //console.log("Original List: ", this.state.userCreatedChannels)
        //console.log("Filtered List: ", filtered_list)
        this.setState({
            filteredParticipated: filtered_list1
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

            // this.showAlert();
            // eslint-disable-next-line no-unused-expressions
            // this.state.alert;

            // db.collection("channels").where("channelTitle", "==", selectedChannel)
            //     .get()
            //     .then(snapshot => {
            //         snapshot
            //             .docs
            //             .forEach(doc => {
            //                 console.log("channelId    => ");
            //                 console.log(doc.id);
            //                 this.routeTo("/channel/" + doc.id)
            //                 fire.firestore().collection('users').doc(currUser).update(
            //                     {
            //                         channelsJoined: firebase.firestore.FieldValue.arrayUnion(doc.id)
            //                     }
            //                 );
            //             });
            //     });
            db.collection("channels").where("channelTitle", "==", selectedChannel)
                .get()
                .then(snapshot => {
                    snapshot
                        .docs
                        .forEach(doc => {
                            console.log("channelId    => ");
                            console.log(doc.id);
                            this.routeTo("/channel/" + doc.id)
                            fire.firestore().collection("channels").doc(doc.id).update(
                                {
                                    participators: firebase.firestore.FieldValue.arrayUnion(currUser)
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
                const { query_participate } = this.state;
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
                const { query } = this.state;
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
                    <ListItemText primary={channelTitle} />
                    <Divider />
                </ListItem>
            )
        })
    };

    // Begin: Function to fetch all channels the current user participated before
    // written by Subhradeep

    participatedChannelListItemClick = (channelTitle) => {
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

    userParticipatedChannels = () => {
        let data = this.state.filteredParticipated

        return data.map((channelTitle) => {
            return (
                <ListItem button onClick={() => this.participatedChannelListItemClick(channelTitle)}>
                    <ListItemText primary={channelTitle}/>
                    <Divider/>
                </ListItem>
            )
        })
    };

 
 
    getParticipatedChannels = () => {
        db.collection("channels").where("participators", "array-contains", fire.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                const userParticipatedChannels = [];
                let i = 0;
                snapshot
                    .docs
                    .forEach(doc => {
                        console.log(doc.get("channelTitle"));
                        userParticipatedChannels.push(doc.get("channelTitle"));
                    });
                console.log(userParticipatedChannels)
                return userParticipatedChannels;
            })
            .then(userParticipatedChannels => {
                //const {query_participate} = this.state;
                const filteredParticipated = userParticipatedChannels;
                console.log("Participated Channels: ");
                console.log(userParticipatedChannels);
                this.setState({
                    userParticipatedChannels,
                    filteredParticipated
                });

            });
    };
    //End: user participated channels


    checkPrivatePasscode = () => {
        let privatePasscode = document.getElementById('privatePasscodeText').value;
        if (privatePasscode!==''){
            this.channelIDGetter.getChannelID(privatePasscode).then(r => {
                if (r.val() == null) {
                    alert('Invalid passcode');
                } else {
                    this.routeTo("/channel/" + r.val());
                }
            });
        }
        else {
            alert('Enter passcode');
        }
    };


    render() {
        const { filteredData } = this.state;
        let channelList = filteredData.length > 0
            && filteredData.map((channel, i) => {
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
                            this.setState({ size: 3 })
                        }}
                        onBlur={() => {
                            this.setState({ size: 1 })
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
                {this.state.alert}
                <hr>
                </hr>
                <h1> Speak Easy </h1> 
                <div class="HomePrivateChannel">
                    <form>
                        <input
                            type="text"
                            name="privatePasscodeText"
                            id="privatePasscodeText"
                            placeholder="Enter passcode"

                            required/>
                        <button id="newChannel_btn"
                                type="button"
                                onClick={() => {
                                    this.checkPrivatePasscode()
                                }}
                        >Go
                        </button>
                    </form>
                </div>

                <div className="HomeLists">
                    <div className="CreatedList">
                        <div className="channelsList">
                            <div className="searchFormCreated">
                                <input
                                    placeholder="Search Created Channels"
                                    value={this.state.query_participate}
                                    onChange={this.handleInputChangeCreated}/>
                                <List>
                                    {this.userCreatedChannels()}
                                </List>
                            </div>
                        </div>
                    </div>
                    <div className="CreatedList">
                        <div className="channelsList">
                            <div className="searchFormCreated">
                                <input
                                    placeholder="Search participated Channels"
                                    value={this.state.query_participate1}
                                    onChange={this.handleInputChangeParticipated}/>
                                <List>
                                    {this.userParticipatedChannels()}
                                </List>
                            </div>
                        </div>
                    </div>

                {/* <div className="searchFormCreated">
                    <input
                        placeholder="Search Created Channels"
                        value={this.state.query_participate}
                        onChange={this.handleInputChangeCreated} />
                </div>

                <div className="HomeLists">
                    <div className="CreatedList">


                        <div>
                            <div className="channelsList">

                                <List>
                                    {this.userCreatedChannels()}
                                </List>
                            </div>
                        </div>
                    </div>
                    <div className="CreatedList">
                        <div className="channelsList">
                            <div className="searchFormCreated">
                                <input
                                    placeholder="Search participated Channels"
                                    value={this.state.query_participate1}
                                    onChange={this.handleInputChangeParticipated}/>
                                <List>
                                    {this.userParticipatedChannels()}
                                </List>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            </div>
        );
    }
}

export default Home;
