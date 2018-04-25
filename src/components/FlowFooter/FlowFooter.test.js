import React from 'react';
import {shallow} from 'enzyme';
import FlowFooter from './FlowFooter';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

test('Renders submit and back buttons with no props', ()=>{
	let muiTheme = getMuiTheme();

	// the dive at the end of this statement is required.
	// Comes from the end of this thread: https://github.com/callemall/material-ui/issues/4664
	const wrapper = shallow(<FlowFooter footerStyle={'allButtons'}/>,
		{context: {muiTheme}, childContextTypes: {muiTheme: PropTypes.object}}).dive();

	expect(wrapper.find('RaisedButton').first().childAt(1).text().trim()).toBe('Back');
	expect(wrapper.find('IconMenu').exists()).toBe(true);
	expect(wrapper.find('RaisedButton').at(1).childAt(1).text().trim()).toBe('Save');
});

test('Renders next and back buttons with props', ()=>{
	let muiTheme = getMuiTheme();

	const wrapper = shallow(<FlowFooter footerStyle={'allButtons'}/>,
		{context: {muiTheme}, childContextTypes: {muiTheme: PropTypes.object}}).dive();
	const buttons = wrapper.find('RaisedButton');

	expect(buttons.first().childAt(1).text().trim()).toBe('Back');
	expect(wrapper.find('IconMenu').exists()).toBe(true);
	expect(buttons.at(1).children().last().text().trim()).toBe('Save');
	expect(buttons.last().children().first().text().trim()).toBe('Next');
});
