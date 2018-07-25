import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import DatePicker from './DatePicker.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Date picker renders correctly', () => {
  // Render a date picker
  let date = new Date();
  const datePicker = shallow(<DatePicker parsedDate={date.toISOString()} onDateUpdate={()=>{}}/>);
  expect(datePicker.props().defaultDate.toISOString()).toEqual(date.toISOString());
});
