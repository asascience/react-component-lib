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

export {
  legendData,
  thumbnailStripImages,
  chartData
}