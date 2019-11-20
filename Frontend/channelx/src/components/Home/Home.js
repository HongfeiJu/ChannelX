/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha, Subhradeep
Date: 9/24/2019
Updated: 11/14/2019
*/

import React, {Component} from 'react';
import firebase from "firebase";
import fire from "../../config/Fire";
import {db} from "../../config/Fire";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import './Home.css';
import * as ROUTES from "../../constants/routes";
import ChannelIDGetter from "../../services/ChannelIDGetter";
import PasscodeChecker from "../../services/PasscodeChecker";
import swal from 'sweetalert';
import Moment from 'moment';
import SearchBar from "./SearchBar";
import MessagingChannelDeleter from "../../services/MessagingChannelDeleter";


class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.channelIDGetter = new ChannelIDGetter();
        this.passcodeChecker = new PasscodeChecker();
    }

    componentDidMount() {
        this.authListener();
        this.deleteExpiredChannels();
        this.getChannelsforSearch();
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
        res: null,
        userParticipatedChannels: [],
        filteredParticipated: [],
        isChatEnable: null,
        isPublic: null,
        deleteConfirm : false,
        editChannelId : null,
        channelsForSearch : []
    };

    handleSelectChange = event => {
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

    handleInputChangeCreated = event => {
        const query_participate = event.target.value;
        let filtered_list = this.state.userCreatedChannels.filter(ele => {
            return ele.toLowerCase().includes(query_participate.toLowerCase())
        });
        console.log("Original List: ", this.state.userCreatedChannels)
        console.log("Filtered List: ", filtered_list)
        this.setState({
            filtered: filtered_list
        });
    };


    handleInputChangeParticipated = event => {
        const query_participate1 = event.target.value;
        let filtered_list1 = this.state.userParticipatedChannels.filter(ele => {
            return ele.toLowerCase().includes(query_participate1.toLowerCase())
        });
        this.setState({
            filteredParticipated: filtered_list1
        });
    };

    showAlert() {
        swal("Invalid Passcode!", "Please Enter a correct passcode", "warning");
    }

    enterPasscodeAlert() {
        swal("Enter Passcode", "Please Enter a passcode to join channel", "warning");
    }

    selectChannelAlert() {
        swal("Select Channel!", "Please Select a channel to join", "warning");
    }

    tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    channelNotActiveAlert(startDate, endDate, startTime, endTime) {

        startTime = this.tConvert(startTime);
        endTime = this.tConvert(endTime);

        console.log(this.tConvert(startTime));
        console.log(this.tConvert(endTime));

        var s = startTime.split(':');
        var e = endTime.split(':');

        var startTimeFormat = s[2].substring(2, 4);
        var endTimeFormat = e[2].substring(2, 4);


        swal({
            title: "Channel is not Active Now!",
            text: "Availablitiy Dates" + " : " + startDate + "  to  " + endDate + "\n\n" + "Availability Time" + " : " +
                s[0] + ":" + s[1] + " " + startTimeFormat + "  to  " + e[0] + ":" + e[1] + " " + endTimeFormat,
            icon: "warning",
        })
    }

    editChannelAlert(channelTitle) {
        swal({
            title: "Are you sure?",
            text: "Do you want to edit the channel? If no, please press Exit.",
            icon: "warning",
            buttons: ["Exit", "Edit Channel"],

            dangerMode: true,
          }).then((edit) => {
            if (edit) {
                this.editChannelClicked(channelTitle);
            } 

          });   
    }

    editChannelClicked = (channelTitle) => {

        // const editChannelInfo = new ChannelInfoEditor();
        console.log(channelTitle);
        
        db.collection("channels").where("channelTitle", "==", channelTitle)
            .get()
            .then(snapshot => {
                snapshot
                .docs
                .forEach(doc => {
                    console.log("channelId    => ");
                    console.log(doc.id);
                    this.setState({editChannelId: doc.id});
                // editChannelInfo.editChannelInformation(doc.id);
                console.log("inside edit button"+this.state.editChannelId);

              this.DelayReturnToHomePage(this.state.editChannelId);

                   })
                });
        }


        DelayReturnToHomePage = (id) => {

            setTimeout(() => {
               var pageType = {
                   pathname: '/editChannel',
                   state: {
                     data:{
                       'id':id,
                     }
                   }
                 }
              this.props.history.push(pageType); 
          
          
            }, 1000)
          }

    deleteChannelAlert(channelTitle) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this channel !",
            icon: "warning",
            buttons: ["Cancel", "Yes Delete it!"],

            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    swal("Poof! Your channel has been deleted!", {
                        icon: "success",
                    });

                    this.deleteChannelClicked(channelTitle);
                }

            });
    }

    alreadyDelectedChannelAccessAlert() {

        swal({
            title: "Channel Already Deleted !",
            text: "Channel creator has deleted this channel",
            icon: "warning",
        })
            .then((refresh) => {
                if (refresh) {

                    window.location.reload(false);
                }

            });
    }

    getChannelId = () => {
        console.log("Join Channel clicked");
        var selectedChannel = document.getElementById("SearchChannelText").value;
        console.log(selectedChannel);
        if (selectedChannel == '') {
            // alert("Please select a channel to join");
            this.selectChannelAlert();
        } else {
            var passcode = null;
            db.collection("channels").where("channelTitle", "==", selectedChannel)
                .get()
                .then(snapshot => {
                    snapshot
                        .docs
                        .forEach(doc => {
                            console.log("channelId    => ");
                            console.log(doc.id);
                            passcode = doc.get("channelPassword")
                            this.checkPublicPasscode(doc.id, passcode);
                        });
                });
        }
    };

    getChannnelDatesandTimes = (chid, role) => {

        console.log(role);
        console.log(chid);
        var channelCreator;
        var startDate;
        var endDate;
        var startTime;
        var endTime;
        var time;
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        time = Moment(today).format('HH:mm:ss').toString();
        console.log(date);
        console.log(time);
        db.collection("channels").doc(chid)
            .get()
            .then(doc => {
                channelCreator = doc.get("channelCreator");
                startDate = doc.get("channelStartDate");
                endDate = doc.get("channelEndDate");
                startTime = doc.get("channelStartTime");
                endTime = doc.get("channelEndTime");
                var nextDay = false;
                var dt = new Date();
                var s = startTime.split(':');
                var e = endTime.split(':');
                var dt2
                if (parseInt(e[0]) - parseInt(s[0]) < 0) {
                    nextDay = true;
                }
                var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                if (nextDay) {
                    dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1, parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                } else {
                    dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                }
                var validTime = Moment(dt).isBetween(dt1, dt2);
                var validDate = Moment(date).isSameOrAfter(startDate) && Moment(date).isSameOrBefore(endDate);
                if (validDate && validTime) {
                    this.setState({isChatEnable: true})
                } else {
                    this.setState({isChatEnable: false})
                }

                console.log("valid state" + this.state.isChatEnable);

                if (this.state.isChatEnable) {
                    this.routeTo("/channel/" + doc.id);
                    if (this.state.isPublic && (channelCreator != fire.auth().currentUser.uid)) {
                        this.addJoinedChannel(doc.id);
                    }
                } else {


                    this.channelNotActiveAlert(startDate, endDate, startTime, endTime);


                }


            }).catch(error => {
            console.log(`error is ${error}`);
        });
    };

    getChannelIdforOneTimePasscode = () => {
        console.log("Join Channel clicked");
        var selectedChannel = document.getElementById("SearchChannelText").value;
        console.log(selectedChannel);
        if (selectedChannel == '') {
            // alert("Please select a channel to join");
            this.selectChannelAlert();
        } else {
            db.collection("channels").where("channelTitle", "==", selectedChannel)
                .get()
                .then(snapshot => {
                    snapshot
                        .docs
                        .forEach(doc => {
                            console.log("channelId    => ");
                            console.log(doc.id);
                            // passcode = doc.get("channelPassword")
                            this.checkOneTimePasscode(doc.id);
                        });
                });
        }
    };
    addJoinedChannel = (id) => {
        fire.firestore().collection("channels").doc(id).update(
            {
                participators: firebase.firestore.FieldValue.arrayUnion(fire.auth().currentUser.uid)
            }
        );
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

    getChannelsforSearch = () => {
        db.collection("channels").get().then(ref => {
            ref.docs.forEach(doc => {
                this.state.channelsForSearch.push(doc.get("channelTitle"));
            });
        });
    };

    channelListItemClick = (channelTitle) => {
        var role = "creator";
        db.collection("channels").where("channelTitle", "==", channelTitle)
            .get()
            .then(snapshot => {
                snapshot
                    .docs
                    .forEach(doc => {
                        this.getChannnelDatesandTimes(doc.id, role);
                    })
            });
    };

    deleteExpiredChannels = () => {
        const messagingChannelDeleter = new MessagingChannelDeleter();

        console.log("Inside DeleteExpiredChannel");

        var time;
        var today = new Date(),
            date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        time = Moment(today).format('HH:mm:ss').toString();

        console.log(date);
        db.collection("channels").where("channelEndDate", "<", date)
            .get()
            .then(snapshot => {
                snapshot
                    .docs
                    .forEach(doc => {
                        //console.log("Expired Channel id: " + doc.id);
                        doc.ref.delete();
                        messagingChannelDeleter.deleteChannel(doc.id);

                    })
            });

    }

    deleteChannelClicked = (channelTitle) => {

        const messagingChannelDeleter = new MessagingChannelDeleter();

        db.collection("channels").where("channelTitle", "==", channelTitle)
            .get()
            .then(snapshot => {
                snapshot
                    .docs
                    .forEach(doc => {
                        doc.ref.delete();
                        messagingChannelDeleter.deleteChannel(doc.id);
                        // MessagingChannelDeleter.deletech
                    })
            });

        let filtered_list = this.state.userCreatedChannels.filter(ele => ele != channelTitle)
        let filteredData = this.state.filteredData.filter(ele => ele != channelTitle)
        let data = this.state.data.filter(ele => ele != channelTitle)

        console.log("Original List: ", this.state.userCreatedChannels)
        console.log("Filtered List: ", filtered_list)
        this.setState({
            userCreatedChannels: filtered_list,
            filtered: filtered_list,
            data: data,
            filteredData: filteredData
        });
    };

    userCreatedChannels = () => {
        let data = this.state.filtered
        return data.map((channelTitle) => {
            return (
                
                <ListItem button onClick={() => this.channelListItemClick(channelTitle)}>
                <ListItemText primary={channelTitle}/>
                <Divider/>
                <ListItemSecondaryAction button onClick={() => this.editChannelAlert(channelTitle)}>
                    <IconButton edge="start" aria-label="edit" >
                        <EditIcon/>
                    </IconButton>
                </ListItemSecondaryAction> 
                
                {/* <ListItemSecondaryAction button onClick={() => this.deleteChannelAlert(channelTitle)}>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>  */}
                </ListItem> 
            )
        })
    };




    // Begin: Function to fetch all channels the current user participated before
    // written by Subhradeep

    participatedChannelListItemClick = (channelTitle) => {

        var docRef = db.collection("channels").where("channelTitle", "==", channelTitle);
        var docExits = false;
        var role = "participent";

        docRef.get()
            .then(snapshot => {
                snapshot
                    .docs
                    .forEach(doc => {
                        docExits = true;
                        console.log(doc.id);
                        this.getChannnelDatesandTimes(doc.id, role);
                    })

                if (!docExits) {

                    this.alreadyDelectedChannelAccessAlert();

                }
            });


    };

    userParticipatedChannels = () => {
        let data = this.state.filteredParticipated;

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
                console.log(userParticipatedChannels);
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
        let privatePasscode = document.getElementById('passcodeText').value;
        if (privatePasscode !== '') {
            this.channelIDGetter.getChannelID(privatePasscode).then(r => {
                if (r.val() == null) {
                    // alert('Invalid passcode');
                    this.showAlert();
                } else {
                    this.routeTo("/channel/" + r.val());
                }
            });
        } else {
            // alert('Enter passcode');
            this.enterPasscodeAlert();
        }
    };

    checkPublicPasscode = (id, passcode) => {
        let publicPasscode = document.getElementById('passcodeText').value;
        if (publicPasscode !== '') {
            if (passcode === publicPasscode) {

                this.setState({isPublic: true})
                this.getChannnelDatesandTimes(id);

            } else {
                // alert('Invalid passcode');
                this.showAlert();
            }
        } else {
            // alert('Enter passcode');
            this.enterPasscodeAlert();
        }
    };

    checkOneTimePasscode = (id) => {
        let oneTimePasscode = document.getElementById('passcodeText').value;

        console.log(id);
        console.log(oneTimePasscode);

        if (oneTimePasscode !== '') {
            this.checkUser(id, oneTimePasscode)
        } else {
            // alert('Enter passcode');
            this.enterPasscodeAlert();
        }
    };

    checkUser(id, oneTimePasscode) {
        console.log(id);
        console.log(oneTimePasscode);
        this.passcodeChecker.checkOnetimePasscode(id, oneTimePasscode.toString()).then(response => {
            // alert('final:' + response); // valid or not valid boolean value in response
            if (response === true) {
                this.setState({isPublic: false});
                this.getChannnelDatesandTimes(id);
                // this.routeTo("/channel/" + id);
            }
        });
    }

    checkPasscode() {
        let privatePasscode = document.getElementById('passcodeText').value;
        if (privatePasscode !== '') {
            if (privatePasscode.length < 10) {
                this.getChannelIdforOneTimePasscode()
            } else if (privatePasscode.length >= 10 && privatePasscode.length <= 16) {
                this.getChannelId();
            } else if (privatePasscode.length > 16) {
                this.checkPrivatePasscode();
            }
        } else {
            // alert('Enter passcode');
            this.enterPasscodeAlert();
        }
    }

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
            <div className="Home">
                <div className="HomeHeader">
                    <a className="HomeDisplayName">Hello {this.state.displayName}</a>
                    <button id="HomeLogout"
                            type="button"
                            className="HomeLogout"
                            onClick={() => this.routeTo(ROUTES.LANDING)}
                    >Logout
                    </button>
                </div>
                <div className="SearchBarComponent">
                    <SearchBar items={this.state.channelsForSearch}/>
                </div>
                <div className="HomePasscodeInput">
                    <input
                        type="text"
                        name="passcodeText"
                        id="passcodeText"
                        placeholder="Enter passcode"
                    />
                    <button id="newChannel_btn"
                            type="button"
                            onClick={() => {this.checkPasscode()}}
                    >Join
                    </button>
                </div>
                <div className="HomeCreateNew">
                    <button id="HomeCreateChannel"
                            type="button"
                            className="HomeCreateChannel"
                            onClick={() => this.routeTo(ROUTES.CREATE_CHANNEL)}
                    >Create New
                    </button>
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
                    <div className="ParticipatedList">
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
                </div>
            </div>
        );
    }
}

export default Home;
