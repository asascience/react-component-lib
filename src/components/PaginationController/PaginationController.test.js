// __tests__/CheckboxWithLabel-test.js
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import PaginationController from './PaginationController.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Renders correctly', () => {
  // Render a checkbox with label in the document
  const pagination = shallow(<PaginationController
      stepIndex={0}
      steps={[
        {title: 'General', validated: false},
        {title: 'Attribution', validated: true},
        {title: 'Data Extents', validated: false},
        {title: 'Variables', validated: true},
        {title: 'Summary', validated: true}
      ]}
    />);
  expect(pagination.find('Step').length).toEqual(5);

  //Unable to test the error icons because they are passed as props to the stepbuttons.

});