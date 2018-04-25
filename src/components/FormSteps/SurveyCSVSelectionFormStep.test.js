import React from 'react';
import {shallow} from 'enzyme';
import SurveyCSVSelectionFormStep from './SurveyCSVSelectionFormStep';
import {Provider} from 'react-redux';
import {connector} from 'data-upload-connector';

test('renders without crashing', ()=>{
	let connect = new connector('');
	const wrapper = shallow(<Provider store={connect.getStore()}><SurveyCSVSelectionFormStep /></Provider>);
	expect(wrapper.exists()).toBe(true);
});
