// Sample Data for HazardLegend
let legendData = [
  {
    data: [
      {
        contentType: 'image/png',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAIlJREFUOI3t1LEJwzAQRuEHJxDcCB5CTVyoyApZIxnDZIx4Hhdq3GgIQxYQqBCksQ1uZVdBr7vmg785w8UZAO/9AxhOWmMIYTTrMZRSbl3OVdJiLSLyBHaQLmfuMVaBk3N8VYF18pU1sIEN/DNwsZbJuSokiRzBlNJLVT/bC6rsvYMxxhnoz2hbP2roHxHhrx/pAAAAAElFTkSuQmCC",
        label: 'Flash Flood Warning',
      }
    ],
    idx: 0,
  },
  {
    data: [
      {
        contentType: 'image/png',
        label: 'Gale Warning',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAG5JREFUOI3t1CEOwCAQBMATOFxF7xPlafuG3h/2fQSNI2nqq0qKBVTDqsuJyap1MjnuPQDYCETSKgjAwhZO9dqFxRIFgJC02lC9yrEf3Q3TlaQ2nJkFLnCBPwNjid1IvnMLkjQAdYJ60gzs9zGaB8bCINKKyqjdAAAAAElFTkSuQmCC",
      },
      {
        contentType: 'image/png',
        label: 'Gale Watch',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3NzcxvsFFTrZQWFyTLs0rNHDLm5uQyTJ09ugLtQVlCYwVxJjWwXXn75jAHuQmqCUQNHDRw1cJgZeOnZI7INefz+LaqBkydPbsjNzYUXQeQAlAIWWYBSAAA7dSDERUboUQAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Small Craft Advisory',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAG5JREFUOI3t1KENwDAMBECDDFASXpVmtp+h3uEHjEICGtIRimo11Amq8sgyOD36IJMT3gOAjkAk1UAAmvZ0xi26sFyzABCSag3jFiUdyd2wXEWs4cwscIEL/BmYa3Yj7W49SFIB2AR50g3s9zGaB/yJINH+c+J6AAAAAElFTkSuQmCC",
      },
      {
        contentType: 'image/png',
        label: 'Wind Advisory',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs0pLnqRfnYyTLswctvDLm5uQyTJ09ugLtQlI+dQUOOj2wXPn73kwHuQmqCUQNHDRw1cJgZ+ODlN7INef3pJ6qBkydPbsjNzYUXQeQAlAIWWYBSAAAFBCDmdaCYsQAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Lake Wind Advisory',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs0pLnqRfnYyTLswctvDLm5uQyTJ09ugLtQlI+dQUOOj2wXPn73kwHuQmqCUQNHDRw1cJgZ+ODlN7INef3pJ6qBkydPbsjNzYUXQeQAlAIWWYBSAAAFBCDmdaCYsQAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Hazardous Seas Warning',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3NzcxsUzGzrBaVkyDLs2fXLDLm5uQyTJ09ugLtQUEqGQcnIjGwXvrx5hQHuQmqCUQNHDRw1cJgZ+Oz6ZbINef/sCaqBkydPbsjNzYUXQeQAlAIWWYBSAACLKiC5HAGgswAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Rip Current Statement',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxu+6qvX/xAXIcsw3jsPGXJzcxkmT57cAHfhD3ERhme6GmQZKMXAwCB87wkD3IXUBKMGjho4auAwM5D3zkMGKTIN4Xj5BtXAyZMnN+Tm5sKLIHIASgGLLEApAACVaiAkkXFuLgAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Beach Hazards Statement',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxu+6qvX/xAXIcsw3jsPGXJzcxkmT57cAHfhD3ERhme6GmQZKMXAwCB87wkD3IXUBKMGjho4auAwM5D3zkMGKTIN4Xj5BtXAyZMnN+Tm5sKLIHIASgGLLEApAACVaiAkkXFuLgAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Flood Warning (Area1)',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1KERgDAUA9AIXK+qunPgWKGTZAb+Dpmkq8AIDIDoAih6YEsV16h/X7yLyoTOme6DpH2BJFkFSdq5nGuJpQkLWwBJSLLasMSCPOcmMCHB7Q61Yc8McIAD/BkYtoCE1IT4w79BSUayTlBLXgP7fHzNBdoMH79e3v7UAAAAAElFTkSuQmCC",
      },
      {
        contentType: 'image/png',
        label: 'Flood Warning (Point)',
        imageData:  "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHdJREFUOI3t1KERgDAUA9AIXK+qunPgWKGTZAb+Dpmkq8AIDIDoAih6YEsV16h/X7yLyoTOme6DpH2BJFkFSdq5nGuJpQkLWwBJSLLasMSCPOcmMCHB7Q61Yc8McIAD/BkYtoCE1IT4w79BSUayTlBLXgP7fHzNBdoMH79e3v7UAAAAAElFTkSuQmCC",
      },
      {
        contentType: 'image/png',
        label: 'Flood Watch (Point)',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHtJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs+cf2u/8b2hyzDBL6zMuTm5jJMnjy5Ae7Cb2x/GG7yfSbLQHUGXgaJnxCjWAioJRmMGjhq4KiBw8xAge+sDOoMvGQZwvUL4S4WBgZI4ZibmwsvgsgBKAUssgClAADtvx98ytDaOwAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Flood Advisory (Area1)',
        imageData:  "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxve27HXf5ZlJssw4Uu/GHJzcxkmT57cAHfhZ1lmho3mHGQZ6M/AwMB9+Q8D3IXUBKMGjho4auAwM1D40i8GfzIN4X38F9XAyZMnN+Tm5sKLIHIASgGLLEApAAC+dyBQwNRTHQAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Flood Advisory (Point)',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxve27HXf5ZlJssw4Uu/GHJzcxkmT57cAHfhZ1lmho3mHGQZ6M/AwMB9+Q8D3IXUBKMGjho4auAwM1D40i8GfzIN4X38F9XAyZMnN+Tm5sKLIHIASgGLLEApAAC+dyBQwNRTHQAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Hydrologic Statement',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxs07eTrRWQFyTLswaVnDLm5uQyTJ09ugLtQRFaQQdNckWwXPr78igHuQmqCUQNHDRw1cJgZ+ODSM7INefP4PaqBkydPbsjNzYUXQeQAlAIWWYBSAABJbiDCPePfUAAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Heat Advisory',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHZJREFUOI3tlDEOgCAQBDcBgzU977DzR/sG+cP9TJ9gb20IJhZG1BaoDFNdrphMtRqV0fdB0peIRMQnIUk/mn1yKmbJ5mBAEiLiU6FTEUO/ZfZZLLFDKqxJEzZhE/5MOAcDwGZJ1uPp0sA1jiTTBOXwGdj3o5QTuDUgAXq3TswAAAAASUVORK5CYII=",
      },
      {
        contentType: 'image/png',
        label: 'Red Flag Warning',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHhJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3NzcxvsPvDVy37hIMuwS8KfGXJzcxkmT57cAHeh7BcOBvPDAuQ5z5aB4bLMdwa4C6kJRg0cNXDUwGFm4CXhzwwMtuQZ8pjnB6qBkydPbsjNzYUXQeQAlAIWWYBSAABgLCBeUNBsvwAAAABJRU5ErkJggg==",
      },
      {
        contentType: 'image/png',
        label: 'Fire Weather Watch',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHJJREFUOI1jYaAyYIExcnNzGygxaPLkyQ1wA3Nzcxvs9CTqZcV5yDLs0p03DLm5uQyTJ09ugLtQVpyHwVxHhmwXXr7/gQHuQmqCUQNHDRw1cJgZeOnOG7INefzyC6qBkydPbsjNzYUXQeQAlAIWWYBSAAA2xSDE6fkJigAAAABJRU5ErkJggg==",
      }
    ],
    idx: 1,
  },
  {
    data: [
      {
        contentType: 'image/png',
        imageData: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAHNJREFUOI3t1L0JgDAUBOADA+IP4g5Z7rbwjXHLuYURBQNWBm2jleSqxys+rjqHj+Oug6S9gSRZAkna0h9TqGMWNgQHkpBkqWGoI+ZxzQI9WjRbhdTwyxSwgAX8GTgEB482C+n26glKMpJpgnLyGNj7421OSpkfYOwPrqUAAAAASUVORK5CYII=",
        label: 'Flash Flood Watch',
      }
    ],
    idx: 2,
  }
];

// Sample Data for ImageThumbnailStrip
let thumbnailStripImages =[
  {
    href: "https://www.weather.gov/phi/marine",
    thumbnailSrc: "https://www.weather.gov/wwamap/png/phi.png",
    title: "NWS marine forecasts and conditions",
  },
  {
    href: "https://radar.weather.gov/radar.php?rid=DIX",
    thumbnailSrc: "https://radar.weather.gov/ridge/lite/N0R/DIX_0.png",
    title: "Mt. Holly, NJ radar",
  },
  {
    href: "https://radar.weather.gov/radar.php?rid=DOX",
    thumbnailSrc: "https://radar.weather.gov/ridge/lite/N0R/DOX_0.png",
    title: "Dover Air Force Base radar",
  }
];

// Sample Data for Chart
let chartData =  [
  {
    chartType: 'spline',
    parameter: 'Wind Velocity',
    series: {
      directionSeriesTitle: 'Direction',
    },
    title: 'Wind Speed',
    url: '/dbpilots-api/dynamic/timeseries_forecasts/GFS_WINDS.null.json',
    yAxis: {
      min: 0,
      useAxis: 0,
      title: {
        text: "Knots",
      },
    },
  },
  {
    chartType: 'spline',
    parameter: 'Direction',
    series: {
      showInLegend: false,
      visible: false,
    },
    title: 'Direction',
    url: '/dbpilots-api/dynamic/timeseries_forecasts/GFS_WINDS.null.json',
    yAxis: {
      alignTicks: false,
      opposite: true,
      showAsCompassDegrees: true,
      visible: false,
      useAxis: 1,
      title: {
        text: "Degrees",
      },
    },
  },
];

let layerVisibilityData = [
  {
    "type": "EsriDynamicMapLayer",
    "url": "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/export?dpi=96&format=png32&transparent=true&f=image&",
    "layers": "0,1,2",
    "legendUrl": null,
    "niceName": "Short Duration Watches",
    "styles": null,
    "status": "on",
    "opacity": 0.7,
    "tocGroup": "hazards",
    "showInToc": false,
    "mapPane": "wwa"
  },
  {
    "type": "EsriDynamicMapLayer",
    "url": "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/export?dpi=96&format=png32&transparent=true&f=image&",
    "layers": "1,4,8,11,15,18,22,25,28,34,31,37,40",
    "legendUrl": null,
    "niceName": "Long Duration Watches",
    "styles": null,
    "status": "on",
    "opacity": 0.7,
    "tocGroup": "hazards",
    "showInToc": false,
    "mapPane": "wwa"
  },
  {
    "type": "EsriDynamicMapLayer",
    "url": "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_warnings_time/MapServer/export?dpi=96&format=png32&transparent=true&f=image&",
    "layers": "0,1,2,3,4",
    "legendUrl": null,
    "niceName": "Short Duration Warnings",
    "styles": null,
    "status": "on",
    "opacity": 0.7,
    "tocGroup": "hazards",
    "showInToc": false,
    "mapPane": "wwa"
  },
  {
    "type": "EsriDynamicMapLayer",
    "url": "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/export?dpi=96&format=png32&transparent=true&f=image&",
    "layers": "3",
    "legendUrl": null,
    "niceName": "Radar Imagery",
    "styles": null,
    "status": "off",
    "opacity": 0.5,
    "tocGroup": "maps-radar",
    "mapPane": "radar"
  },
  {
    "type": "WMSSingleTileLayer",
    "url": "http://coastmap.com/ecop/wms.aspx?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&",
    "layers": "GFS_WINDS",
    "legendUrl": "./images/legends/GFS_WINDS.png",
    "niceName": "Surface Winds",
    "styles": "WINDS_VERY_SPARSE_GRADIENT-false-2-0-45",
    "status": "off",
    "opacity": 1,
    "tocGroup": "maps-forecast",
    "mapPane": "forecasts"
  },
  {
    "type": "WMSSingleTileLayer",
    "url": "http://coastmap.com/ecop/wms.aspx?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&",
    "layers": "GFS_AIR_TEMPERATURE",
    "legendUrl": "./images/legends/GFS_AIR_TEMPERATURE.png",
    "niceName": "Air Temperature",
    "styles": "",
    "status": "off",
    "opacity": 0.5,
    "tocGroup": "maps-forecast",
    "mapPane": "forecasts"
  },
  {
    "type": "WMSSingleTileLayer",
    "url": "http://coastmap.com/ecop/wms.aspx?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&",
    "layers": "NWPSAKQ_WAVE_HEIGHT",
    "legendUrl": "./images/legends/NWPSAKQ_WAVE_HEIGHT.png",
    "niceName": "Sea Height",
    "styles": "WAVE_HEIGHT_STYLE-0-7",
    "status": "off",
    "opacity": 1,
    "tocGroup": "maps-forecast",
    "mapPane": "forecasts"
  },
  {
    "type": "CircleMarkers",
    "url": "/dbpilots-api/static/station_marker_data.json",
    "layers": "Station Markers",
    "niceName": "Station Markers",
    "status": "on",
    "showInToc": false,
    "tocGroup": "pois",
    "mapPane": "pois",
    "tooltipText": "Click to view forecast charts.",
    "fillColor": "blue",
    "color": "yellow",
    "parameters": [
      {
        "name": "n/a"
      }
    ]
  },
  {
    "type": "ConditionsMarkers",
    "url": "/dbpilots-api/dynamic/current_conditions/weather_marker_data.json",
    "layers": "Wind Conditions Markers",
    "niceName": "Surface Winds & Gusts",
    "status": "on",
    "showInToc": true,
    "tocGroup": "stations",
    "mapPane": "stations",
    "tooltipText": "Click to visit the data provider's station page.",
    "conditionsClassName": "surface-winds-markers",
    "parameters": [
      {
        "name": "wind_speed",
        "units": "&nbsp;kt",
        "type": "scalar",
        "formatting": {
          "type": "float",
          "operation": {
            "func": "roundTo",
            "param": 0
          }
        }
      },
      {
        "name": "wind_from_direction",
        "units": "&nbsp;deg",
        "type": "vector"
      },
      {
        "name": "wind_speed_of_gust",
        "units": "&nbsp;kt",
        "type": "scalar",
        "formatting": {
          "type": "float",
          "operation": {
            "func": "roundTo",
            "param": 0
          }
        }
      }
    ]
  },
  {
    "type": "ConditionsMarkers",
    "url": "/dbpilots-api/dynamic/current_conditions/weather_marker_data.json",
    "layers": "Surface Water Temp Conditions Markers",
    "niceName": "Surface Water Temp",
    "status": "off",
    "showInToc": true,
    "tocGroup": "stations",
    "mapPane": "stations",
    "tooltipText": "Click to visit the data provider's station page.",
    "conditionsClassName": "surface-water-temp-markers",
    "parameters": [
      {
        "name": "sea_water_temperature",
        "sigFigs": 0,
        "units": "&deg;C",
        "type": "scalar",
        "formatting": {
          "type": "float",
          "operation": {
            "func": "roundTo",
            "param": 0
          }
        }
      }
    ]
  },
  {
    "type": "ConditionsMarkers",
    "url": "/dbpilots-api/services/get_next_sunrise_sunset.php",
    "layers": "Next Sunrise or Sunset Conditions Markers",
    "niceName": "Next Sunrise or Sunset",
    "status": "off",
    "showInToc": true,
    "tocGroup": "stations",
    "mapPane": "stations",
    "tooltipText": "Click to visit the data provider's station page.",
    "conditionsClassName": "sunrise-sunset-markers",
    "parameters": [
      {
        "name": "sunrise_sunset",
        "units": "",
        "type": "scalar",
        "formatting": {
          "type": "date",
          "operation": {
            "func": "formatDate",
            "param": "h:mm<br />A"
          }
        }
      }
    ]
  }
];

let markerParameters = [
  {
    "name": "wind_speed",
    "units": "&nbsp;kt",
    "type": "scalar",
    "formatting": {
      "type": "float",
      "operation": {
        "func": "roundTo",
        "param": 0
      }
    }
  },
  {
    "name": "wind_from_direction",
    "units": "&nbsp;deg",
    "type": "vector"
  },
  {
    "name": "wind_speed_of_gust",
    "units": "&nbsp;kt",
    "type": "scalar",
    "formatting": {
      "type": "float",
      "operation": {
        "func": "roundTo",
        "param": 0
      }
    }
  }
];

let leafletMarkers = [
  {
    value: 'test marker',
    geometry: {
      coordinates: [0, 0],
    },
    identifier: 1,
    tooltipText: 'sample tooltip',
  },
  {
    value: 'test',
    geometry: {
      coordinates: [2, 10],
    },
    identifier: 2,
    tooltipText: 'tooltip goes here',
  },
  {
    value: 'the office',
    geometry: {
      coordinates: [41.45448679364805, -71.47035598504885],
    },
    identifier: 'the office',
    tooltipText: 'this component was created here!'
  }
];

export {
  legendData,
  thumbnailStripImages,
  chartData,
  layerVisibilityData,
  markerParameters,
  leafletMarkers,
}