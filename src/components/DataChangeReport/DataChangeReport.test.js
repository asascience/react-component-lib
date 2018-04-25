import React from 'react';
import { shallow, mount, render } from 'enzyme';
import DataChangeReport from './DataChangeReport';

test('Renders Changes Correctly', ()=>{
	let wrapper = shallow(<DataChangeReport
			id="discoveryData"
			title={'No Changes Title'}
			tableData={{
				Attribution: [],
				'Data Extents': [],
				General:[],
				Other: [],
			}
		}
	/>);
	expect(wrapper.find('h1').first().text()).toBe('No Changes Title');
	expect(wrapper.find('h3').at(0).text()).toBe('No changes detected');
});