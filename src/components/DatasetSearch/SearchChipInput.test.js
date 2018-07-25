import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import SearchChipInput from './SearchChipInput.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Search Chip Input renders correctly', () => {
  const chipInput = shallow(<SearchChipInput
    value={['test value']}
    chipMode={'partial'}
    dataSource={['test']}
  />);
  expect(chipInput.find('div .chipText').text()).toEqual('test value');
});