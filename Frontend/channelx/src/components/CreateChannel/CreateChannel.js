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
    }

    routeTo = (path) => this.props.history.push(path);

    render() {
        return (
            <div>
                <h1>
                    Create Your Channel
                </h1>
                <button id="back"
                        type="button"
                        className="Leave Channel"
                        onClick={() => this.routeTo(ROUTES.HOME)}>
                    Home
                </button>
            </div>
        );
    }

}

export default CreateChannel;