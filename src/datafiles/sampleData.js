// SearchResults
let singleSearchResult =  [{
  description: "USACE/FRF Observed Dataset",
  id: "502d1a79-440c-4aaf-9ed4-75a45981d0b0",
  title: "FRF 632",
  identifier: "noaa.ioos.comt.unknown.b5a2.frf_632",
  contactPoint: {
    hasEmail: "mailto:John.L.Doe@usace.army.mil",
    fn: "JOHN DOE"
  }
}];

let searchResultsTable = [
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
];

// Leaflet Map Data
let leafletMarkers = [
  {
    value: 'test marker',
    geometry: {
      coordinates: [0, 0],
    },
    identifier: 1,
    tooltipText: 'sample tooltip',
    circleRadius: 8,
    fillOpacity: 1,
    color: '#E00B0B',
    fillColor: '#FF0000',
    weight: 1,
    onClick: ()=>{},
  },
  {
    value: 'test',
    geometry: {
      coordinates: [2, 10],
    },
    identifier: 2,
    tooltipText: 'tooltip goes here',
    circleRadius: 8,
    fillOpacity: 1,
    color: '#E00B0B',
    fillColor: '#FF0000',
    weight: 1,
    onClick: ()=>{},
  },
  {
    value: 'the office',
    geometry: {
      coordinates: [41.45448679364805, -71.47035598504885],
    },
    identifier: 'the office',
    tooltipText: 'this component was created here!',
    circleRadius: 8,
    fillOpacity: 1,
    color: '#E00B0B',
    fillColor: '#FF0000',
    weight: 1,
    onClick: ()=>{},
  }
];

let rasterLayerData = [
  {
    type: 'WMS',
    url: 'http://174.67.104.8/wms/',
    layers: 'AUSWAVE-G/sig_wav_ht',
    styles: 'default-scalar/default',
    format:  'image/png',
    transparent: true,
    version: '1.3.0',
    time: '2018-04-07T00:00:00Z',
  }
];

let circleVectorData = [
  {
    type: 'circle',
    center: [34.5, -5.5],
    radius: 15000,
    color: '#348289',
    opacity: 0.6,
    weight: 0,
  },
  {
    type: 'circle',
    center: [34, -4.5],
    radius: 80000,
    color: '#F4F359',
    opacity: 0.8,
    weight: 8,
  },
  {
    type: 'circle',
    center: [35, -5],
    radius: 8000,
    color: '#C24380',
    opacity: 0.5,
    weight: 2,
  }
];

let rectangleVectorData = [
  {
    type: 'rectangle',
    bounds: [[-1, -1], [1, 1]],
    color: '#348289',
    weight: 0,
    opacity: 0.9,
  },
  {
    type: 'rectangle',
    bounds: [[-10, -15], [-8, 2]],
    color: '#F4F359',
    weight: 2,
    opacity: 0.8,
  },
  {
    type: 'rectangle',
    bounds: [[-12, 20], [14, 24]],
    color: '#C24380',
    weight: 3,
    opacity: 0.7,
  },
];

let polygonVectorData = [
  {
    type: 'polygon',
    vertices: [[25.774, -80.190], [18.466, -66.118], [32.321, -64.757]],
    color: '#C24380',
    opacity: 0.5,
    weight: 10,
  },
  {
    type: 'polygon',
    vertices: [
      [[20, -64.05],[25, -58.03],[24, -56.05],[19, -52.04]], // outer ring
      [[20.29, -62.58],[22.71, -59.58],[20.71, -56.50],[20.29, -53.50]] // hole
    ],
    color: '#348289',
    weight: 0,
    opacity: 0.8,
  },
];

let polylineVectorData = [
  {
    type: 'polyline',
    vertices: [[45.51, -122.68], [37.77, -122.43], [34.04, -118.2]],
    color: '#348289',
    weight: 2,
  },
];

let wmsControlData = [
  {
    layerName: 'AUSWAVE-G/sig_wav_ht',
    styles: [
      'WMS Default',
      'raster/psu-viridis',
      'raster/seq-Greys',
      'contour/viridis',
      'pcolor/thermal',
      'pcolor/viridis',
      'pcolor/inferno',
      'trafficlight/default'
    ],
  },
  {
    layerName: 'AUSWAVE-G/wnd_spd',
    styles: [
      'WMS Default',
      'raster/psu-viridis',
      'raster/seq-Greys',
    ],
  },
  {
    layerName: 'AUSWAVE-G/zonal_wnd:merid_wnd-dir',
    styles: [
      'WMS Default',
    ],
  },
  {
    layerName: 'AUSWAVE-G/zonal_wnd:merid_wnd-mag',
    styles: [
      'WMS Default',
      'raster/psu-viridis',
      'raster/seq-Greys'
    ],
  },
  {
    layerName: 'AUSWAVE-G/zonal_wnd:merid_wnd-group',
    styles: [
      'WMS Default',
    ],
  },
  {
    layerName: 'AUSWAVE-G/mn_wav_dir',
    styles: [
      'WMS Default',
      'raster/psu-viridis',
      'raster/seq-Greys'
    ],
  },
  {
    layerName: 'AUSWAVE-G/mn_wav_per',
    styles: [
      'WMS Default',
      'raster/psu-viridis',
      'raster/seq-Greys'
    ],
  },
  {
    layerName: 'AUSWAVE-G/pk_per_wnd_sea',
    styles: [
      'WMS Default',
      'raster/psu-viridis',
      'raster/seq-Greys'
    ],
  },
];

export {
  singleSearchResult,
  searchResultsTable,
  leafletMarkers,
  rasterLayerData,
  circleVectorData,
  rectangleVectorData,
  polygonVectorData,
  polylineVectorData,
  wmsControlData,
}