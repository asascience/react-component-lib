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
  leafletMarkers,
  rasterLayerData,
  circleVectorData,
  rectangleVectorData,
  polygonVectorData,
  polylineVectorData,
  wmsControlData,
}