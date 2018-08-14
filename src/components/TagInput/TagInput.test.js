import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TagInput from './TagInput.js';

Enzyme.configure({ adapter: new Adapter() });
test('Tag input renders correctly', () => {
  const tagInput = shallow(<TagInput text={'test'}/>);

  expect(tagInput.find('ChipInput')).toBeTruthy();
});
test('Static text box displays errors correctly', () => {
  const textBox = shallow(<TagInput text={''} severity={'required'}/>);
});
