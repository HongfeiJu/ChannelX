/*
Description: test page
Authors: Hongfei Ju
Date: 9/24/2019
*/

import React, {Component} from 'react';
import PasscodeGenerator from "../../services/PasscodeGenerator";

class TestPage extends Component{
    constructor(props){
        super(props);
        this.passcodeGenerator=new PasscodeGenerator();
    }

    showPasscode(){
        alert(this.passcodeGenerator.generateOnetimePasscode());
    }

    render() {
        return (

            <div className="Home">
                <div className = "Header">
                    <button id="onetimePasscode_botton"
                            type="button"
                            style={{ marginLeft: "auto" }}
                            onClick={() => this.showPasscode()}

                    >show one time passcode</button>
                </div>
                <div className = "Main">
                </div>
                <div className = "Footer">
                </div>

            </div>
        );
    }

}

export default TestPage;
