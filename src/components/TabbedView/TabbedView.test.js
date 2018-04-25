import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TabbedView from './TabbedView';

const wrapper = shallow(<TabbedView jsonData={{
	Tab1: [
		{
			key: 'Title',
			value: {
				name: 'New Title',
				severity: 'optional'
			}
		},
	],
	Tab2: [
		{
			key: 'Title2',
			value: {
				name: 'New Title2',
				severity: 'optional'
			}
		},
	]
}}/>);

test('Renders tabs', ()=>{
	expect(wrapper.find('Tab').first().props().label).toBe('Tab1');
	expect(wrapper.find('Tab').last().props().label).toBe('Tab2');
});



