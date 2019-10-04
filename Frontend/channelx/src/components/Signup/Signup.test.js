/*
Description: Signup page testing
Authors: Hongfei Ju
Date: 9/25/2019
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Signup from "./Signup";

configure({adapter: new Adapter()});

describe('<Signup/>', ()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Signup />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should have one form element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('should have one first name input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#firstName')).toHaveLength(1);
    });

    it('should have one last name input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#lastName')).toHaveLength(1);
    });

    it('should have one email input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#email')).toHaveLength(1);
    });

    it('should have one tel input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#tel')).toHaveLength(1);
    });

    it('should have one user name input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#userName')).toHaveLength(1);
    });

    it('should have one password input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#password')).toHaveLength(1);
    });

    it('should have one password confirm input element', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#passwordConfirm')).toHaveLength(1);
    });

    it('should have one cancel button', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#cancelButton')).toHaveLength(1);
    });

    it('should have one cancel button', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#loginButton')).toHaveLength(1);
    });

    it('should have one submit button', ()=>{
        const wrapper = shallow(<Signup/>);
        expect(wrapper.find('#submitButton')).toHaveLength(1);
    });
});
