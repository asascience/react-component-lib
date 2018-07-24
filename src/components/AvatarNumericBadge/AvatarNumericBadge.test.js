// __tests__/CheckboxWithLabel-test.js
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import AvatarNumericBadge from './AvatarNumericBadge.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const numericBadge = shallow(<AvatarNumericBadge dimArray={['a', 'b']}/>);

  expect(numericBadge.find('Avatar').props().backgroundColor).toEqual('#808080');
});