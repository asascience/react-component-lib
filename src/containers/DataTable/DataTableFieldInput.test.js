import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import DataTableFieldInput from './DataTableFieldInput.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Data Table Field Input renders numericBadge correctly', () => {
  // Render a checkbox with label in the document
  const tableInput = shallow(<DataTableFieldInput objectData={{fieldType: 'numericBadge'}}/>);

  expect(tableInput.find('AvatarNumericBadge').first()).toBeTruthy();
});

test('Data Table Field Input renders datePicker correctly', () => {
  // Render a checkbox with label in the document
  const tableInput = shallow(<DataTableFieldInput
  	objectData={{
  		fieldType: 'datePicker',
  		date: (new Date().toISOString())
  	}}
  />);

  expect(tableInput.find('DataDatePicker').first()).toBeTruthy();
});

test('Data Table Field Input renders dropdown correctly', () => {
  // Render a checkbox with label in the document
  const tableInput = shallow(<DataTableFieldInput objectData={{fieldType: 'dropdown'}}/>);

  expect(tableInput.find('Dropdown').first()).toBeTruthy();
});

test('Data Table Field Input renders tagInput correctly', () => {
  // Render a checkbox with label in the document
  const tableInput = shallow(<DataTableFieldInput objectData={{fieldType: 'tagInput'}}/>);

  expect(tableInput.find('DataTagInput').first()).toBeTruthy();
});

test('Data Table Field Input renders textBox correctly', () => {
  // Render a checkbox with label in the document
  const tableInput = shallow(<DataTableFieldInput objectData={{fieldType: 'textBox'}}/>);

  expect(tableInput.find('TableTextBox').first()).toBeTruthy();
});
