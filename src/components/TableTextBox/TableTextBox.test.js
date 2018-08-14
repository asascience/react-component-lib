import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import TableTextBox from './TableTextBox.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Static text box renders correctly', () => {
  const textBox = shallow(<TableTextBox text={'test'}/>);

  expect(textBox.find('TextField').props().value).toEqual('test');
});
test('Static text box displays errors correctly', () => {
  const textBox = shallow(<TableTextBox text={''} severity={'required'}/>);
	expect(textBox.find('TextField').props().errorText).toEqual('This field is required');
});
test('Autocomplete text box renders correctly', ()=> {
	const textBox = shallow(<TableTextBox text={'test'} dataSource={['a', 'b']}/>);
	expect(textBox.find('AutoComplete')).toBeTruthy();
	expect(textBox.find('AutoComplete').props().dataSource).toEqual(['a', 'b']);
});
test('Autocomplete text box renders correctly', () => {
  const textBox = shallow(<TableTextBox text={''} dataSource={['a', 'b']} severity={'required'}/>);
	expect(textBox.find('AutoComplete').props().errorText).toEqual('This field is required');
});
