/*
Description: chat message component testing
Authors: Hongfei Ju
Date: 10/8/2019
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ChatMessage from "./ChatMessage";

configure({adapter: new Adapter()});

describe('<ChatMessage/>', ()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ChatMessage />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should have one message element', ()=>{
        const wrapper = shallow(<ChatMessage/>);
        expect(wrapper.find('.message')).toHaveLength(1);
    });

    it('should have one user element', ()=>{
        const wrapper = shallow(<ChatMessage/>);
        expect(wrapper.find('.messageUser')).toHaveLength(1);
    });

    it('should have one timestamp element', ()=>{
        const wrapper = shallow(<ChatMessage/>);
        expect(wrapper.find('.messageTimestamp')).toHaveLength(1);
    });

});
