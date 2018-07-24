import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action, configureActions } from '@storybook/addon-actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../src/index.css';
import {
        singleSearchResult,
        searchResultsTable,
        leafletMarkers,
        rasterLayerData,
        circleVectorData,
        rectangleVectorData,
        polygonVectorData,
        polylineVectorData,
        wmsControlData}  from '../src/datafiles/sampleData.js';
import {sampleGeoJSON} from '../src/datafiles/sampleGeoJSON.js';

/**********************
USACE Component Imports
**********************/

// Dataset Search Imports
//import DatasetSearchController from '../src/containers/DatasetSearchContainers/DatasetSearchController.js';
import DatasetSearch from '../src/containers/DatasetSearchContainers/DatasetSearch.js';
import SearchResults from '../src/components/DatasetSearch/SearchResults.js';
import SearchPagination from '../src/components/DatasetSearch/SearchPagination.js';
import SearchChipInput from '../src/components/DatasetSearch/SearchChipInput.js';

// Data Table Imports
import DataTableFieldInput from '../src/containers/DataTable/DataTableFieldInput';

// App Bar  Imports
import AppbarLogo from '../src/components/AppbarLogo/AppbarLogo'
import TopLogo from '../src/components/TopLogo/TopLogo'
import LoginButton from  '../src/components/LoginButton/LoginButton';
import ForgotPasswordLink from '../src/components/ForgotPasswordLink/ForgotPasswordLink';
import ReferencesDropdown from '../src/components/ReferencesDropdown/ReferencesDropdown';
import UserOptionsMenu from '../src/components/UserOptionsMenu/UserOptionsMenu';

// Badge Imports
import AvatarNumericBadge from '../src/components/AvatarNumericBadge/AvatarNumericBadge';

// Bread Crumbs Imports
import BreadCrumbs from '../src/components/BreadCrumbs/BreadCrumbs';

// Data Input Imports
import DatePicker from '../src/components/DatePicker/DatePicker';
import Dropdown from '../src/components/Dropdown/Dropdown';
import SubmitButton  from '../src/components/SubmitButton/SubmitButton';
import TagInput from '../src/components/TagInput/TagInput';

// Menu Page Imports
import OrganizationMenu from  '../src/components/OrganizationMenu/OrganizationMenu';
import ServiceWrapper from '../src/components/ServiceWrapper/ServiceWrapper';

// Modal Imports
import LoadingSpinner from '../src/components/LoadingSpinner/LoadingSpinner';
import SessionExpiredModal from '../src/components/SessionExpiredModal/SessionExpiredModal';
import UndoModal from '../src/components/UndoModal/UndoModal';

/***************************
Mapping Component Imports
****************************/
import LeafletMap from '../src/components/LeafletMap/LeafletMap';
import MapboxMap from '../src/components/MapboxMap/MapboxMap';
import URLEntry from '../src/components/URLEntry/URLEntry';
import WMSStylesSelectorDrawer from '../src/components/WMSStylesSelectorDrawer/WMSStylesSelectorDrawer';

injectTapEventPlugin();

addDecorator((story) => (
  <MuiThemeProvider>
    {story()}
  </MuiThemeProvider>
));

/****************
Dataset Search
****************/

// SearchPagination
storiesOf('Dataset Search/Search Pagination', module)
  .add('first page', ()=>(
    <SearchPagination
      pageIndex={0}
      resultCount={30}
      resultsPerPage={8}
      leftButtonsDisabled={true}
      rightButtonsDisabled={false}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
    />
  ))
  .add('last page', ()=>(
    <SearchPagination
      pageIndex={3}
      resultCount={30}
      resultsPerPage={8}
      leftButtonsDisabled={false}
      rightButtonsDisabled={true}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
    />
  ))
  .add('single page', ()=>(
    <SearchPagination
      pageIndex={0}
      resultCount={0}
      resultsPerPage={8}
      leftButtonsDisabled={true}
      rightButtonsDisabled={true}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
    />
  )
);

// SearchChipInput
let filterList={
  'author': ['Bob', 'Brian', 'Dalton', 'Ryan'],
  'type': ['csv', 'gridded model', 'timeseries'],
  'tag': ['ocean', 'land', 'sediment', 'something'],
}

storiesOf('Dataset Search/Search Chip Input', module)
  .add('partial chip', ()=>(
    <SearchChipInput
      value={['author']}
      chipMode={'partial'}
      dataSource={Object.keys(filterList)}
      onUpdateInput={action('input-updated')}
      onRequestAdd={action('request-add-chip')}
      onRequestDelete={action('request-delete-chip')}
      onSearch={action('search')}
    />
  ))
  .add('full  chip', ()=>(
    <SearchChipInput
      value={['author:Bob']}
      chipMode={'none'}
      dataSource={Object.keys(filterList)}
      onUpdateInput={action('input-updated')}
      onRequestAdd={action('request-add-chip')}
      onRequestDelete={action('request-delete-chip')}
      onSearch={action('search')}
    />
  )
);

storiesOf('Dataset Search/Search  Results',  module)
  .add('single result',  ()=>(
    <SearchResults
      searchText={'USACE'}
      searchResults={singleSearchResult}
      onDatasetSelected={action('dataset-selected')}
      resultsPerPage={8}
      pageIndex={0}
      leftButtonsDisabled={true}
      rightButtonsDisabled={true}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
    />
  ))
  .add('results table', ()=>(
    <SearchResults
      searchText={'a'}
      searchResults={searchResultsTable}
      onDatasetSelected={action('dataset-selected')}
      resultsPerPage={8}
      pageIndex={0}
      leftButtonsDisabled={true}
      rightButtonsDisabled={false}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
    />
  )
);

//DatasetSearch
storiesOf('Dataset Search/Dataset Search Container', module)
  .add('single result',  ()=>(
    <DatasetSearch
      filterList={filterList}
      searchResults={singleSearchResult}
      onFiltersChanged={action('filters-changed')}
      onSearchValueChanged={action('search-value-changed')}
      onDatasetSelected={action('dataset-selected')}
      resultsPerPage={8}
      pageIndex={0}
      leftButtonsDisabled={true}
      rightButtonsDisabled={true}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
      updateEnabledButtons={action('update-enabled-buttons')}
    />
  ))
  .add('results table', ()=>(
    <DatasetSearch
      filterList={filterList}
      searchResults={searchResultsTable}
      onFiltersChanged={action('filters-changed')}
      onSearchValueChanged={action('search-value-changed')}
      onDatasetSelected={action('dataset-selected')}
      resultsPerPage={8}
      pageIndex={0}
      leftButtonsDisabled={false}
      rightButtonsDisabled={false}
      getPreviousPage={action('go-to-previous')}
      getNextPage={action('go-to-next')}
      getFirstPage={action('go-to-first')}
      getLastPage={action('go-to-last')}
      updateEnabledButtons={action('update-enabled-buttons')}
    />
  )
);

/******
App Bar
*******/

// App Bar Logos
storiesOf('App Bar/App Bar Logos', module)
  .add('corner logo', ()=>(
    <AppbarLogo/>
  ))
  .add('center logo', ()=>(
    <TopLogo/>
  )
);

// Login Button
storiesOf('App Bar/Login Button', module)
  .add('default button', ()=>(
    <LoginButton/>
  )
);

// Forgot Password Link
storiesOf('App Bar/Forgot Password Link', module)
  .add('link', () =>(
    <ForgotPasswordLink
      handleForgotPW={action('password-redirect')}
    />
  )
);

// References Dropdown
storiesOf('App Bar/References Dropdown', module)
  .add('default', ()=>(
    <ReferencesDropdown/>
  )
);

// User Options Menu
storiesOf('App Bar/User Options Menu', module)
  .add('default', ()=>(
    <UserOptionsMenu
      name={'Brian'}
    />
  )
);

/*****
Badges
******/

// Avatar Numeric Badge
storiesOf('Badges/Avatar Numeric Badge', module)
  .add('default size', ()=>(
    <AvatarNumericBadge
      dimArray={['a']}
      text={'1D'}
    />
  ))
  .add('large badge', ()=>(
    <AvatarNumericBadge
      dimArray={['a', 'b']}
      text={'2D'}
      iconSize={128}
    />
  ))
  .add('text coloring', ()=>(
    <AvatarNumericBadge
      dimArray={['a', 'b', 'c']}
      text={'3D'}
      textColor={'blue'}
    />
  ))
  .add('tooltip position', ()=>(
    <div style={{margin: 35}}>
      <AvatarNumericBadge
        dimArray={['a', 'b', 'c', 'd']}
        text={'4D'}
        tooltipPosition={'top-left'}
      />
    </div>
  ))
  .add('tooltip styles', ()=>(
    <AvatarNumericBadge
      dimArray={['a', 'b', 'c', 'd', 'e']}
      text={'5D'}
      tooltipStyle={{fontSize: 18, fontFamily: 'fantasy'}}
    />
  )
);

/***********
Bread Crumbs
************/

// Router Setup for Wrapping Test Classes
import {Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

// Bread Crumbs
storiesOf('Bread Crumbs/Standard Bread Crumbs', module)
  .add('path', ()=>(
    <Router  history={history}>
    <BreadCrumbs
      path={'/data'}
      projectName={'Data'}
    />
    </Router>
  )
);

/**********
Data Inputs
***********/

// Date Picker
storiesOf('Input Components/Date Picker', module)
  .add('default', ()=>(
    <DatePicker
      onDateUpdate={action('date-update')}
    />
  ))
  .add('disabled', ()=>(
    <DatePicker
      disabled={true}
      parsedDate={new Date()}
    />
  )
);

// Dropdown
storiesOf('Input Components/Dropdown', module)
  .add('default', ()=>(
    <Dropdown
      options={['cookies', 'cake', 'ice cream']}
    />
  )
);

// Tag Input
storiesOf('Input Components/Tag Input', module)
  .add('default', ()=>(
    <TagInput
      dataSource={['a', 'b', 'c']}
    />
  ))
  .add('disabled', ()=>(
    <TagInput
      dataSource={['a', 'b', 'c']}
      disabled={true}
    />
  )
);

/*******************
Menu Page Components
********************/

// Organization Menu
storiesOf('Menu Components/Organization Menu', module)
  .add('menu', ()=>(
    <OrganizationMenu/>
  )
);

// Service Wrapper
storiesOf('Menu Components/Service Wrapper', module)
  .add('default', ()=>(
    <Router history={history}>
      <ServiceWrapper
        onChoose={action('service-chosen')}
      />
    </Router>
  ))
  .add('custom image', ()=>(
    <Router history={history}>
      <ServiceWrapper
        imgSrc='https://cdn.ioos.noaa.gov/media/2017/12/IOOS_Emblem_Primary_B_RGB.jpg'
        onChoose={action('service-chosen')}
      />
    </Router>
  )
);

/***************
Modal Components
****************/

// Loading Spinner
storiesOf('Modals/LoadingSpinner', module)
  .add('indeterminate',  ()=>(
    <LoadingSpinner/>
  )
);

// Session Expired Modal
storiesOf('Modals/Session Expired Modal',  module)
  .add('default', ()=>(
    <SessionExpiredModal/>
  )
);

// Undo Modal
storiesOf('Modals/Undo Modal', module)
  .add('default', ()=>(
    <UndoModal
      open={true}
    />
  )
);

/********************
Mapping Components
*********************/

// Leaflet Map
storiesOf('Maps/Leaflet Map', module)
  .add('default', ()=>(
    <LeafletMap
      center={[40, -70]}
      zoomLevel={3}
    />
  ))
  .add('standard markers', ()=>(
    <LeafletMap
      markerData={leafletMarkers}
      markerType={'StandardMarkers'}
      center={[0,-20]}
      zoomLevel={2}
    />
  ))
  .add('circle markers', ()=>(
    <LeafletMap
      markerData={leafletMarkers}
      markerType={'CircleMarkers'}
      center={[0, 0]}
      zoomLevel={1}
    />
  ))
  .add('WMS layer', ()=>(
    <LeafletMap
      rasterLayerData={rasterLayerData}
      center={[0, 0]}
      zoomLevel={2}
    />
  ))
  .add('GeoJSON layer', ()=>(
    <LeafletMap
      geoJSONData={sampleGeoJSON}
      center={[38.965, -77.05]}
      zoomLevel={10}
    />
  ))
  .add('circle vector layer', ()=>(
    <LeafletMap
      vectorLayerData={circleVectorData}
      center={[34.5, -4.5]}
      zoomLevel={7}
    />
  ))
  .add('rectangle vector  layer', ()=>(
    <LeafletMap
      vectorLayerData={rectangleVectorData}
      center={[0, 5]}
      zoomLevel={3}
    />
  ))
  .add('polygon vector layer', ()=>(
    <LeafletMap
      vectorLayerData={polygonVectorData}
      center={[26, -66]}
      zoomLevel={4}
    />
  ))
  .add('polyline vector layer', ()=>(
    <LeafletMap
      vectorLayerData={polylineVectorData}
      center={[40, -120]}
      zoomLevel={5}
    />
  )
);

// Mapbox Map
storiesOf('Maps/Mapbox Map', module)
  .add('map', ()=>(
    <MapboxMap
      mapboxApiToken={'pk.eyJ1IjoiYnJpYW5tY2tlbm5hIiwiYSI6ImNpZnFxczU5eWF6ZnZpdWx4MXE3dHBsZnYifQ.tesY73nqdoL7dzp6m0nX3w'}
    />
  )
);

// WMS Styles Drawer
storiesOf('Maps/Style Selectors', module)
  .add('selector drawer', ()=>(
    <WMSStylesSelectorDrawer
      open={true}
      onClose={action('closing-drawer')}
      tileUrl="http://35.173.222.0/wms/?service=WMS&request=GetMap&layers=AVHRR%20unmasked%2Fmcsst&styles=default-scalar%2Fdefault&format=image%2Fpng&transparent=false&version=1.1.1&width=256&height=256&srs=EPSG%3A3857&bbox=-10018754.171394622,2504688.542848655,-8766409.899970295,3757032.8142729844"
      styles={["default-scalar/default", "colored_contours/default", "contours", "raster/default", "raster/psu-viridis", "raster/seq-Greys", "contour/viridis", "pcolor/thermal", "pcolor/viridis", "pcolor/inferno", "trafficlight/default"]}
      onSelectStyle={action('selected-style')}
    />
  )
)

// URL Entry Bar
storiesOf('Input Components/URL Entry', module)
  .add('default', ()=>(
    <URLEntry
      updateSearchValue={()=>{}}
      getCapabilitiesResult={action('get-capabilities')}
    />
  )
);

// storiesOf('Data Table', module)
//   .add('Key Value', ()=>(
//     <DataTable
//       jsonData={{
//         header: [
//           {text: 'Field Name'},
//           {text: 'Value'}
//         ],
//         content: [
//           [
//             {
//               fieldType: 'textBox',
//               description: 'This is a key',
//               disabled: true,
//               text: 'key',
//             },
//             {
//               fieldType: 'textBox',
//               severity: 'required',
//               text: '',
//             }
//           ],
//           [
//             {
//               fieldType: 'textBox',
//               description: 'This is a key too!',
//               disabled: true,
//               text: 'key',
//             },
//             {
//               fieldType: 'textBox',
//               severity: 'suggested',
//               text: '',
//             }
//           ]
//         ],
//       }}
//       headerEnabled={true}
//       verbose={true}
//     />
//   ))
//   .add('Variables', ()=>(
//     <DataTable
//       jsonData={{
//         header: [
//           {
//             colIndex: 0,
//             sortType: 'alphabetical',
//             text: 'Variable Name',
//           },
//           {
//             colIndex: 1,
//             sortType: 'numeric',
//             text: 'Dimensions',
//           },
//           {
//             colIndex: 2,
//             link: 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#units',
//             sortType: 'alphabetical',
//             text: 'Units',
//           },
//           {
//             colIndex: 3,
//             link: 'http://cfconventions.org/Data/cf-standard-names/27/build/cf-standard-name-table.html',
//             sortType: 'alphabetical',
//             text: 'Standard Name',
//           },
//           {
//             colIndex: 4,
//             link: 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#long-name',
//             sortType: 'alphabetical',
//             text: 'Long Name',
//           }
//         ],
//         content: [
//           [
//             {
//               fieldType: 'textBox',
//               text: 'u',
//             },
//             {
//               fieldType: 'numericBadge',
//               data: ['ocean_time', 'eta_rho', 'xi_rho'],
//               disabled: true,
//               text: '3D',
//             },
//             {
//               fieldType: 'textBox',
//               text: 'meter second-1',
//               validated: true,
//               validationTooltip: 'Invalid units. Units string must be recognized by UNIDATA\'s Udunits package',
//               text: 'key',
//             },
//             {
//               fieldType: 'textBox',
//               options: ['a', 'b', 'c'],
//               text: '',
//               validated: true,
//               validationTooltip: 'Invalid standard_name. The set of permissible standard names is contained in the CF standard name table.'
//             },
//             {
//               fieldType: 'textBox',
//               text: 'u-momentum component',
//             }
//           ]
//         ],
//       }}
//       headerEnabled={true}
//       verbose={true}
//     />
//   ));

// storiesOf('TabbedView', module)
//   .add('Single Tab With Header', ()=>(
//     <TabbedView
//       headerEnabled={true}
//       jsonData={{
//         'Only One Tab': {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key too!',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'suggested',
//                 text: '',
//               }
//             ]
//           ],
//         }
//       }}
//     />
//   ))
//   .add('Single Tab Without Header', ()=>(
//     <TabbedView
//       headerEnabled={false}
//       jsonData={{
//         'Only One Tab': {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key too!',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'suggested',
//                 text: '',
//               }
//             ]
//           ],
//         }
//       }}
//     />
//   ))
//   .add('Multiple Tabs', ()=>(
//     <TabbedView
//       jsonData={{
//         First: {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//           ]
//         },
//         Second: {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//           ]
//         },
//         Third: {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//           ]
//         }
//       }}
//     />
//   ));

// storiesOf('FlowFooter', module)
//   .add('All Buttons', ()=>(
//     <FlowFooter footerStyle={'allButtons'}/>
//   ))
//   .add('Admin', ()=>(
//     <FlowFooter footerStyle={'admin'}/>
//   ))
//   .add('Survey', ()=>(
//     <FlowFooter footerStyle={'survey'}/>
//   ))
//   .add('Paging Only', ()=>(
//     <FlowFooter footerStyle={'pagingOnly'}/>
//   ))
//   .add('Submit', ()=>(
//     <FlowFooter footerStyle={'submit'}/>
//   ))
//   .add('Survey Submit', ()=>(
//     <FlowFooter footerStyle={'surveySubmit'}/>
//   ));
