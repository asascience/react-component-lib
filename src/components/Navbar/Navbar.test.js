import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Navbar from './Navbar';

const wrapper = shallow(<Navbar/>);

test('Renders icon', ()=>{
	expect(wrapper.find('img').first().exists()).toBe(true);
});

test('Renders title', ()=>{
	// <3 js
	expect(wrapper.find('AppBar').first().props().title && true).toBe(true);
});
