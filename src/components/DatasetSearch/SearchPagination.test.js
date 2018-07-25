import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import SearchPagination from './SearchPagination.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Search Pagination renders correctly', () => {

  const pagination = shallow(<SearchPagination pageIndex={0}/>);
  expect(pagination.find('h3').text()).toEqual('Page 1');

});