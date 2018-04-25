import React from 'react';
import {shallow} from 'enzyme';
import MetadataFormStep from './MetadataFormStep';
import {Provider} from 'react-redux';
import {connector} from 'data-upload-connector';

test('renders without crashing', ()=>{
	let connect = new connector('');
	const wrapper = shallow(<Provider store={connect.getStore()}><MetadataFormStep /></Provider>);
	expect(wrapper.exists()).toBe(true);
});
