/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";
import { db } from "../../config/Fire";
import './Home.css'

import * as ROUTES from "../../constants/routes";

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    routeTo = (path) => this.props.history.push(path);

    logout() {
        fire.auth().signOut();
    }
    
    state = {
    channels: null,
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    //const channels = event.target.value;
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.toLowerCase().includes(query.toLowerCase());
      });

      return {
        //channels,
        query,
        filteredData
      };
    });
  };

  getData = () => {
    db.collection("channels") //.where("channelTitle", "==", "channel4")
    .get()
    .then(snapshot => {
      const data = [];
      snapshot
        .docs
        .forEach(doc => {
          //console.log(JSON.parse(doc._document.channelTitle.value.toString()))
          console.log(doc.get("channelTitle"));
          data.push(doc.get("channelTitle"));
        })


       //console.log(snapshot.docs);
       //console.log(JSON.parse(snapshot._document.data.toString()))
       //return snapshot.docs;
        //.forEach(doc => {
        //  console.log(JSON.parse(doc._document.data.toString()))
       // });

       return data;
    })
    .then(data => {
      const { query } = this.state;
        const filteredData = data;
  
        this.setState({
          data,
          filteredData
        });
      });
    };


  componentWillMount() {
    this.getData();
  }

  componentWillMount() {
    this.getData();
  }

/*  componentDidMount() {
    //this.getData();
    db.collection('channels')
           .get()
           .then( snapshot => {
              const channels = [] 
              snapshot.forEach( doc => {
                const data = doc.data()
                channels.push(data)
              })
              this.setState({filteredData = channels})
           })
           .catch(error => console.log(error))
  }*/

    render() {
        const { filteredData } = this.state;

        let channelList = filteredData.length > 0
          && filteredData.map((channel, i) => {
          return (
            <option key={i} value={channel}>{channel}</option>
          )
        }, this);

        return (
            <div className="Home">
                <div className="Header">
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
                            onClick={() => this.routeTo(ROUTES.CHAT_PAGE)}>
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
                <div className = "Main">
                    
                    <div id="searchForm">
                        <form>
                        <input                            
                            placeholder="Search for channels"
                            value={this.state.query}
                            onChange={this.handleInputChange}
                        />
                        
                        <select id="channelDrop" >
                          {channelList}
                        </select>
                        
                        </form>
                    </div>
                </div>
                <div className="Footer">
                </div>
            </div>
        );
    }

}

export default Home;
