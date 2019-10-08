/*
Description: chat room component testing
Authors: Hongfei Ju
Date: 10/8/2019
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ChatRoom from "./ChatRoom";

configure({adapter: new Adapter()});

describe('<ChatRoom/>', ()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ChatRoom />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should have one title element', ()=>{
        const wrapper = shallow(<ChatRoom/>);
        expect(wrapper.find('.roomTitle')).toHaveLength(1);
    });

    it('should have one message panel element', ()=>{
        const wrapper = shallow(<ChatRoom/>);
        expect(wrapper.find('.messagePanel')).toHaveLength(1);
    });

    it('should have one sending element', ()=>{
        const wrapper = shallow(<ChatRoom/>);
        expect(wrapper.find('.messageSending')).toHaveLength(1);
    });

});
