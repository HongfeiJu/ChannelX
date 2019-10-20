/*
Description: Home page
Authors: Darshan Prakash, Sami, Manisha
Date: 9/24/2019
*/

import React, {Component} from 'react';
import fire from "../../config/Fire";
import './Home.css'

import * as ROUTES from "../../constants/routes";

class Home extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    routeTo = (path) => this.props.history.push(path);

    logout(){
        fire.auth().signOut();
    }
    
    state = {
    channels: null,
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  getData = () => {
    fetch('https://www.google.com/')
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };


  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    //this.getData();
    fire.db.collection('channels')
           .get()
           .then( snapshot => {

           })
           .catch(error => console.log(error))
  }

    render() {
        return (

            <div className="Home">
                <div className = "Header"> 
                    <button id="join"
                        type="button"
                        style={{ marginLeft: "auto" }}
                        className="Join Channel"
                        onClick={() => this.routeTo(ROUTES.CHAT_PAGE)}>
                    Join Channel</button>

                    <button id="logout"
                        type="button"
                        style={{ marginLeft: "auto" }}
                        className="Logout"
                        onClick={() => this.routeTo(ROUTES.LANDING)}

                    >Logout</button>
                </div>
                <div className = "Main">
                    <div className="searchForm">
                        <form>
                        <input
                            placeholder="Search for..."
                            value={this.state.query}
                            onChange={this.handleInputChange}
                        />
                        </form>
                    <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
                    </div>
                </div>
                <div className = "Footer">
                </div>

            </div>
        );
    }

}

export default Home;
