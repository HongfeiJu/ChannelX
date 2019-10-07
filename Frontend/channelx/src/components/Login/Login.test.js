/*
Description: Login page testing
Authors: Subhradeep Biswas
Date: 10/01/2019
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Login from "./Login";

configure({adapter: new Adapter()});

describe('<Signup/>', ()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should have one form element', ()=>{
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('form')).toHaveLength(1);
    });


    it('should have one email input element', ()=>{
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('#email')).toHaveLength(1);
    });

    it('should have one password input element', ()=>{
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('#password')).toHaveLength(1);
    });

    it('should have one cancel button', ()=>{
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('#cancelButton')).toHaveLength(1);
    });

    it('should have one cancel button', ()=>{
        const wrapper = shallow(<Login/>);
        expect(wrapper.find('#loginButton')).toHaveLength(1);
    });

});
