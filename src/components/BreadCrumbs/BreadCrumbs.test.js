import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import BreadCrumb from './BreadCrumbs.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('BreadCrumb displays the correct links', () => {
  // Render a checkbox with label in the document
  const numericBadge = shallow(<BreadCrumb path={'/test'} projectName={'Test'}/>);

  expect(numericBadge.find('Link').first().props().children).toEqual('Home');
  expect(numericBadge.find('Link').last().props().children).toEqual('Test');
});