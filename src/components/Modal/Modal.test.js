import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Modal from './Modal';

test('Renders title, heading, content and button correctly', ()=>{
	// the dive at the end of this statement is required. Comes from the end of this thread: https://github.com/callemall/material-ui/issues/4664
	const wrapper = shallow(<Modal
				title="This is the title"
				heading="This is the heading"
				content="This is the content"
			/>
		);

	expect(wrapper.find('Dialog').props().title).toBe('This is the title');
	expect(wrapper.find('p').first().text()).toBe('This is the heading');
	expect(wrapper.find('p').last().text()).toBe('This is the content');

	// Check if a button has been added.
	expect(wrapper.find('RaisedButton').first().exists()).toBe(true);
});
