import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action, configureActions } from '@storybook/addon-actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import '../src/index.css';
import {legendData, 
        thumbnailStripImages,
        chartData,
        layerVisibilityData,
        markerParameters,
        leafletMarkers,
        rasterLayerData,
        circleVectorData,
        rectangleVectorData,
        polygonVectorData,
        polylineVectorData}  from '../src/datafiles/sampleData.js';
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

/**************************
OceansMap Component Imports
***************************/
import Chart from '../src/components/Chart/Chart';
import ImageThumbnailStrip from '../src/components/Image/Image';
import LayerControls from '../src/components/LayerControls/LayerControls';
import HazardLegend from '../src/components/Legend/Legend';
//import {Map} from '../src/components/Map/Map';
import {Markers} from '../src/components/MarkerLayers/MarkerLayers';
import {WMSSingleTileLayer, EsriDynamicMapLayer} from '../src/components/RasterLayers/RasterLayers';
import {LayerVisibilityControls, LayerOpacityControls, LayerShortcutControls, LayerButton} from '../src/components/LayerControls/LayerControls';

/***************************
WMS Viewer Component Imports
****************************/
import LeafletMap from '../src/components/LeafletMap/LeafletMap';
import MapboxMap from '../src/components/MapboxMap/MapboxMap';
import LeafletWMSControls from '../src/components/LeafletWMSControls/LeafletWMSControls';


addDecorator((story) => (
  <MuiThemeProvider>
    {story()}
  </MuiThemeProvider>
));

/****************
Dataset Search
****************/

// SearchPagination
storiesOf('USACE/Dataset Search/Search Pagination', module)
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

storiesOf('USACE/Dataset Search/Search Chip Input', module)
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

// SearchResults
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

let resultsTable = [
  {
    description: 'temp',
    id: "ad7b5502-3a2e-4ff7-b919-e4f9e1baae64",
    title: "Mid-Atlantic Regional Association Coastal Ocean Observing System Self-Locating Datum Marker Buoy",
    identifier: "noaa.ioos.comt.unknown.d89f.mid-atlantic_regional_association_coastal_ocean_observing_system_self-locating_datum_marker_buoy",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: 'temp',
    id: "8944b472-04a1-4c47-89a2-7c17129119e5",
    title: "Chesapeake Bay with 1-term oxygen model",
    identifier: "noaa.ioos.comt.unknown.07bc.chesapeake_bay_with_1-term_oxygen_model",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "USACE/COAB data collected by a bottom mounted (looking up) Nortek AWAC, approximately 450m offshore of Duck (FRF), NC at a nominal depth of 5m NAVD 88. Directional spectra are computed using a custom COAB analysis of merging low frequency AST-UV (or PUV) spectra with high-end beam-array spectra (see http://frf.usace.army.mil/realtime/awac/COAB_awacSpectralAnalysis.pdf). Data collection is hard-wired and analyzed hourly with 34 minute timeseries records. Two dimensional frequency-direction spectra are computed using a Maximum Likelihood Estimator (MLE) method.",
    id: "b7867486-26fc-4b55-bfba-c5efb50ed37b",
    title: "FRF 5m AWAC Waves and Currents",
    identifier: "noaa.ioos.comt.unknown.931c.frf_5m_awac_waves_and_currents",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "USACE/FRF Observed Dataset",
    id: "502d1a79-440c-4aaf-9ed4-75a45981d0b0",
    title: "FRF 632",
    identifier: "noaa.ioos.comt.unknown.b5a2.frf_632",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "USACE/FRF Observed Dataset",
    id: "e79dd9cd-818e-481e-bcf3-b7afcbfeefc6",
    title: "Weather Station",
    identifier: "noaa.ioos.comt.unknown.5bf1.weather_station",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: 'temp',
    id: "2a753016-8da3-4edb-b721-45fd796bc6e0",
    title: "Chesapeake Bay with 1-term oxygen model",
    identifier: "noaa.ioos.comt.unknown.57c1.chesapeake_bay_with_1-term_oxygen_model",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "USACE/FRF Observed Dataset",
    id: "8aaa1660-0db6-4782-b497-614b43866e13",
    title: "Pier CTD",
    identifier: "noaa.ioos.comt.unknown.6edf.pier_ctd",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "This sample dataset is used to test the data management server. This field can be as long as it needs to be. Did you know Eratosthenes was a Greek mathematician, geographer, poet, astronomer, and music theorist. He held the title of chief librarian at the Library of Alexandria. Eratosthenes was able to compute the circumference of the Earth to within 10% aroudn 200 BC",
    id: "abcdef12-abcd-abcd-abcd-abcdef123456",
    title: "Benchmark Dataset",
    identifier: "noaa.ioos.comt.unknown.c586.benchmark_dataset",
    contactPoint: {
      hasEmail: "mailto:Brian.McKenna@rpsgroup.com",
      fn: "Brian McKenna"
    }
  },
  {
    description: "'The time mean backgound grid interpolated onto all of the CMSF .tel grid positions to be used as the background for the CMTB CMSF runs' ",
    id: "c0890acf-2127-4147-846b-f09ea5cc93f2",
    title: "CMTB CMSF Background Grid",
    identifier: "noaa.ioos.comt.unknown.8a40.cmtb_cmsf_background_grid",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: 'temp',
    id: "868e64b3-7bfc-4365-8f6a-98774633e1a2",
    title: "Mid-Atlantic Regional Association Coastal Ocean Observing System Self-Locating Datum Marker Buoy",
    identifier: "noaa.ioos.comt.unknown.1cda.mid-atlantic_regional_association_coastal_ocean_observing_system_self-locating_datum_marker_buoy",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "USACE/FRF Observed Dataset",
    id: "9888d261-9016-49e1-9fc9-00bb8451decd",
    title: "Currituck Sound",
    identifier: "noaa.ioos.comt.unknown.e0f1.currituck_sound",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  },
  {
    description: "U.S. IOOS Mid-Atlantic Regional Consortium of Ocean Observing Systems (MARACOOS) glider deployment. This is the first of a series of yearly seasonal deployments to survey the physical and biological properties of Mid-Atlantic Bight coastal waters. This dataset contains phyisical data only. Optical and oxygen data to be added at a later date.",
    id: "453cecc8-34aa-4747-8ff3-1dd1d423f1d7",
    title: "blue-20150627T1254",
    identifier: "noaa.ioos.comt.unknown.6489.blue-20150627t1254",
    contactPoint: {
      hasEmail: "mailto:John.L.Doe@usace.army.mil",
      fn: "JOHN DOE"
    }
  }
]

storiesOf('USACE/Dataset Search/Search  Results',  module)
  .add('single result',  ()=>(
    <SearchResults
      searchText={'USACE'}
      searchResults={singleResult}
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
      searchResults={resultsTable}
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
storiesOf('USACE/Dataset Search/Dataset Search Container', module)
  .add('single result',  ()=>(
    <DatasetSearch
      filterList={filterList}
      searchResults={singleResult}
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
      searchResults={resultsTable}
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

/*********
Data Table
**********/

storiesOf('USACE/Data Table/Data Table Field Input', module)
  .add('staticText', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'text',
        severity: 'suggested',
        text: 'sampleText',
      }}
    />
  ))
  .add('autocomplete', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'text',
        severity: 'suggested',
        text: 'sampleText',
        options: ['sample a', 'sample b', 'a', 'b'],
      }}
    />
  ))
  .add('dropdown', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'dropdown',
        severity: 'suggested',
        text: 'sampleText',
        options: ['sample a', 'sample b', 'a', 'b'],
      }}
    />
  ))
  .add('tag input', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'tagInput',
        severity: 'suggested',
        text: 'sampleText',
        options: ['sample a', 'sample b', 'a', 'b'],
        onUpdate: ()=>{},
      }}
    />
  ))
  .add('date picker', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'datePicker',
        severity: 'suggested',
      }}
    />
  ));

/******
App Bar
*******/

// App Bar Logos
storiesOf('COMT/App Bar/App Bar Logos', module)
  .add('corner logo', ()=>(
    <AppbarLogo/>
  ))
  .add('center logo', ()=>(
    <TopLogo/>
  )
);

// Login Button
storiesOf('COMT/App Bar/Login Button', module)
  .add('default button', ()=>(
    <LoginButton/>
  )
);

// Forgot Password Link
storiesOf('COMT/App Bar/Forgot Password Link', module)
  .add('link', () =>(
    <ForgotPasswordLink
      handleForgotPW={action('password-redirect')}
    />
  )
);

// References Dropdown
storiesOf('COMT/App Bar/References Dropdown', module)
  .add('default', ()=>(
    <ReferencesDropdown/>
  )
);

// User Options Menu
storiesOf('COMT/App Bar/User Options Menu', module)
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
storiesOf('USACE/Badges/Avatar Numeric Badge', module)
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
storiesOf('USACE/Bread Crumbs/Standard Bread Crumbs', module)
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
storiesOf('USACE/Data Inputs/Date Picker', module)
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
storiesOf('USACE/Data Inputs/Dropdown', module)
  .add('default', ()=>(
    <Dropdown
      options={['cookies', 'cake', 'ice cream']}
    />
  ))
  .add('disabled', ()=>(
    <Dropdown
      options={['cookies', 'cake', 'ice cream']}
      disabled={true}
    />
  )
);

// Submit Button
storiesOf('USACE/Data Inputs/Submit Button', module)
  .add('default', ()=>(
    <SubmitButton/>
  ))
  .add('submitted', ()=>(
    <SubmitButton
      submitted={true}
    />
  )
);

// Tag Input
storiesOf('USACE/Data Inputs/Tag Input', module)
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
  ))
  .add('error', ()=>(
    <TagInput
      dataSource={['a', 'b', 'c']}
      severity={'required'}
    />
  )
);

/*******************
Menu Page Components
********************/

// Organization Menu
storiesOf('COMT/Menu Components/Organization Menu', module)
  .add('menu', ()=>(
    <OrganizationMenu/>
  )
);

// Service Wrapper
storiesOf('COMT/Menu Components/Service Wrapper', module)
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
storiesOf('USACE/Modals/LoadingSpinner', module)
  .add('indeterminate',  ()=>(
    <LoadingSpinner/>
  )
);

// Session Expired Modal
storiesOf('USACE/Modals/Session Expired Modal',  module)
  .add('default', ()=>(
    <SessionExpiredModal/>
  )
);

// Undo Modal
storiesOf('USACE/Modals/Undo Modal', module)
  .add('default', ()=>(
    <UndoModal
      open={true}
    />
  )
);


/*****************
Mapping Components
******************/

// Chart
storiesOf('OceansMap/Charts/Chart',  module)
  .add('sample chart', ()=>(
    <Chart
      data={chartData}
      time={1529520593002}
      startTime={1529477393004}
      endTime={1529606993005}
      station={null}
      status={'on'}
    />
  )
);

// Image
storiesOf('OceansMap/Images/Image Thumbail Strip', module)
  .add('sample images', ()=>(
    <ImageThumbnailStrip
      images={thumbnailStripImages}
    />
  )
);

// Legend
storiesOf('OceansMap/Legends/Hazard Legend', module)
  .add('default legend', ()=>(
    <HazardLegend
      status={'on'}
      time={'1529931828308'}
      data={legendData}
    />
  )
);

// Layer Controls
storiesOf('OceansMap/Layer Controls/Layer Visibility Controls', module)
  .add('default', ()=>(
    <LayerVisibilityControls
      group={'maps'}
      onToggleLayer={()=>{}}
      layers={layerVisibilityData}
    />
  )
);

storiesOf('OceansMap/Layer Controls/Layer Shortcut Controls', module)
  .add('default', ()=>(
    <LayerShortcutControls
      color={'blue'}
      group={'pois'}
      layers={'Station Markers'}
      onGotoLayer={()=>{}}
      onLoadDone={()=>{}}
      onLoadStart={()=>{}}
      selected_identifiers={[null]}
      sort={true}
      status={'on'}
      time={1529934832942}
      url={"/dbpilots-api/static/station_marker_data.json"}
    />
  )
);

storiesOf('OceansMap/Layer Controls/Layer Button', module)
  .add('button', ()=>(
    <LayerButton
      name={'Sample Button'}
      value={42}
      onClick={action('layer-button-pressed')}
    />
  )
);

// Marker Layers
storiesOf('OceansMap/Marker Layers/Markers', module)
  .add('markers', ()=>(
    <Markers
      key={'Surface Winds and Gusts'}
      conditionsClassName={'surface-winds-markers'}
      layers={'Wind Conditions Markers'}
      niceName={'Surface Winds & Gusts'}
      onClick={()=>{}}
      onLoadDone={()=>{}}
      onLoadStart={()=>{}}
      parameters={markerParameters}
      status={'on'}
      time={1529934832942}
      tooltipText={"Click to visit the data provider's station page."}
      type={'ConditionsMarkers'}
      url={"/dbpilots-api/dynamic/current_conditions/weather_marker_data.json"}
    />
  )
);

/********************
WMS Viewer Components
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

// Leaflet WMS Controls
storiesOf('Maps/Leaflet Controls', module)
  .add('WMS controls', ()=>(
    <LeafletWMSControls
      transparentField={{
        isChecked: false,
        isDisabled: false,
        onCheck: ()=>{},
      }}
      opacityField={{
        isDisabled: false,
        defaultValue: 0,
        value: 0,
        onChange: ()=>{},
      }}
      layerField={{
        value: 0,
        layers: ['GFS_WINDS', 'test', 'test 2'],
        onChange: ()=>{},
      }}
    />
  )
);

// Raster Layers - Broken without layer data stored in refs

// storiesOf('OceansMap/Raster Layers/Tile Layers')
//   .add('tile', ()=>(
//     <WMSSingleTileLayer
//     url={"http://coastmap.com/ecop/wms.aspx?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&"}
//     layers={'GFS_WINDS'}
//     styles={"WINDS_VERY_SPARSE_GRADIENT-false-2-0-45"}
//     opacity={1}
//     time={1529934832942}
//     onLoadStart={()=>{}}
//     onLoadDone={()=>{}}
//     />
//   )
// );

// storiesOf('OceansMap/Raster Layers/Map Layers')
//   .add('map layer', ()=>(
//     <EsriDynamicMapLayer
//       url={"https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/export?dpi=96&format=png32&transparent=true&f=image&"}
//       layers={'0,1,2'}
//       niceName={'Short Duration Watches'}
//       onLoadDone={()=>{}}
//       onLoadStart={()=>{}}
//       opacity={0.7}
//       time={1529934832942}
//     />
//   )
// );


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
