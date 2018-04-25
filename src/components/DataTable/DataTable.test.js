import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery'; // ugh im sorry
import DataTable from './DataTable';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
test('Renders table entries correctly', ()=>{
	let wrapper = render(<MuiThemeProvider><DataTable jsonData={
			[
				{
					key: 'Title',
					value: {
						name: 'New Title',
						severity: 'optional'
					}
				},
				{
					key: 'key',
					value: {
						name: '',
						severity: 'optional'
					}
				}
			]
		} tableType="acdd"/></MuiThemeProvider>);
	// Since this is using the render function (above) instead of the shallow, it uses Cherio html traversal
	// which is slightly different.
	expect(wrapper.find('input').first().attr('value')).toBe('New Title');
	expect(wrapper.find('input').eq(1).attr('value')).toBe('');
});

test('Notifies user of missing requirement', ()=>{
	let wrapper = render(<MuiThemeProvider><DataTable jsonData={
			[
				{
					key: 'Title',
					value: {
						name: '',
						severity: 'required'
					}
				},
			]
		} tableType="acdd"/></MuiThemeProvider>);
	// Since this is using the render function (above) instead of the shallow, it uses Cherio html traversal
	// which is slightly different.
	let result = wrapper.find('div').filter(function(){
		return $(this).text() === 'This field is required';
	});
	expect(result.text()).toBe('This field is required');
});