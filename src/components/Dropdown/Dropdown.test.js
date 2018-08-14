import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Dropdown from './Dropdown.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Static Dropdown renders correctly', () => {
  const dropdown = shallow(<Dropdown options={['a', 'b', 'c']}/>);
  expect(dropdown.find('MenuItem').at(0).props().primaryText).toEqual('a');
  expect(dropdown.find('MenuItem').at(1).props().primaryText).toEqual('b');
  expect(dropdown.find('MenuItem').at(2).props().primaryText).toEqual('c');
});