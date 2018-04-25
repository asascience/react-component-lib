import React from 'react';
import {shallow} from 'enzyme';
import SurveyMetadataFormStep from './SurveyMetadataFormStep';
import {Provider} from 'react-redux';
import {connector} from 'data-upload-connector';

test('renders without crashing', ()=>{
	let connect = new connector('');
	const wrapper = shallow(<Provider store={connect.getStore()}><SurveyMetadataFormStep /></Provider>);
	expect(wrapper.exists()).toBe(true);
});
