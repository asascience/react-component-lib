import React from 'react';
import {shallow} from 'enzyme';
import VariablesIdentificationFormStep from './VariablesIdentificationFormStep';
import {Provider} from 'react-redux';
import {connector} from 'data-upload-connector';

test('renders without crashing', ()=>{
	let connect = new connector('');
	const wrapper = shallow(<Provider store={connect.getStore()}><VariablesIdentificationFormStep /></Provider>);
	expect(wrapper.exists()).toBe(true);
});
