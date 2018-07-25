import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import SearchResults from './SearchResults.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
test('Search Chip Results renders correctly', () => {

  let singleResult =  [{
    description: "USACE/FRF Observed Dataset",
    id: "502d1a79-440c-4aaf-9ed4-75a45981d0b0",
    title: "FRF 632",
    identifier: "noaa.ioos.comt.unknown.b5a2.frf_632",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  }]

  const chipInput = shallow(<SearchResults
      searchText={'USACE'}
      searchResults={singleResult}
      resultsPerPage={8}
      pageIndex={0}
      leftButtonsDisabled={true}
      rightButtonsDisabled={true}
    />);

  // Make sure all fields are coming through correctly.
  expect(chipInput.find('div .searchTitle').text()).toEqual('FRF 632');
  expect(chipInput.find('a').first().props().href).toEqual('mailto:John.L.Doe@usace.army.mil');
  expect(chipInput.find('a').first().text()).toEqual('Author: JOHN DOE');
  expect(chipInput.find('span .searchHighlight').first().text()).toEqual('USACE');
  expect(chipInput.find('p').first().text()).toEqual('USACE/FRF Observed Dataset');
});