import React, { Component } from 'react'

import _ from 'underscore'
import moment from 'moment'

import ReactHighcharts from 'react-highcharts'

export class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      time: null,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only render when necessary!
    return this.props.status !== nextProps.status ||
      this.props.time !== nextProps.time ||
      this.props.station !== nextProps.station ||
      this.props.data !== this.state.data
  }

  componentDidMount() {
    // Fetch the data.
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    // Keep the data in sync if anything important has changed.
    if (
      this.props.status !== prevProps.status ||
      this.props.time !== prevProps.time ||
      this.props.station !== prevProps.station
    ) {
      // Clear the slate.
      this.setState({data: null})

      // Fetch the data.
      this.getData()
    }

    if (this.props.status === 'off' && !_.isNull(this.state.data)) {
      // Clear the slate.
      this.setState({data: null, time: null})
    }
  }

  getData() {
    const self = this
    // Only fetch data if the layer is visible and the times don't match between props and state.
    // The state's time will be updated to match the prop's time once a fetch has been finished.
    if (
      this.props.status === 'on' &&
      (this.props.time !== this.state.time || this.props.station !== this.state.station)
    ) {
      _.each(this.props.data, function(series, idx) {
        const url = series.url + '?time=' + self.makeQueryTimeString(series.time)
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            let data = self.state.data || []
            let parameterData = responseJson.properties.data[series.parameter].times.map((v, k) => {
              return {
                x: moment(new Date(v)).valueOf(),
                y: responseJson.properties.data[series.parameter].values[0][k],
                units: responseJson.properties.data[series.parameter].units[0],
                showAsCompassDegrees: series.yAxis.showAsCompassDegrees,
              }
            });
            data.push(_.extend(series.series || {}, {
              idx: idx,
              data: _.sortBy(parameterData, function(pd) {
                // Make sure the data is sorted according to time.
                return pd.x
              }),
              units: responseJson.properties.data[series.parameter].units[0],
              showAsCompassDegrees: series.yAxis.showAsCompassDegrees,
              type: series.chartType,
              name: series.title,
              color: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[idx]).setOpacity(0.85).get('rgba'),
              yAxis: series.yAxis.useAxis,
              isVector: series.isVector,
            }))

            self.setState({
              data: _.sortBy(data, function(d) {
                return d.idx
              }),
              time: self.props.time,
            })
          })
          .catch((error) => {
            console.error(error)
          })
      })
    }
  }

  makeQueryTimeString(time) {
    return moment(time).utc().format('YYYY-MM-DDTHH:mm:00+00:00')
  }

  prettify(value) {
    return Math.round((value * 10)) / 10
  }

  degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5)
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return arr[(val % 16)]
  }

  drawVectors() {
    /*
      Everyone loves them some vectors.  This bad boy marches through the chart's series looking for
      series[i].options.directionData.  If it finds a hit, it draws SVG vectors at location x=time and y=velocity.
      Hats off for the SVG to robert.aspinall@noaa.gov who was listed at the top of the COOPS' met.js source code.
    */
    const chart = this.refs.chart.getChart()

    const seriesWithDirection = _.filter(chart.series, function(series) {
      return series.options.directionSeriesTitle
    })

    // Only draw values w/i the charts visibile time range.
    let xAxisExtremes = chart.xAxis && chart.xAxis[chart.xAxis.length - 1] && chart.xAxis[chart.xAxis.length - 1].getExtremes()
    if (xAxisExtremes && !_.isEmpty(xAxisExtremes.userMin) && !_.isEmpty(xAxisExtremes.userMax)) {
      _.extend(xAxisExtremes, {
        min: xAxisExtremes.userMin,
        max: xAxisExtremes.userMax
      })
    }

    let r = chart.renderer
    _.each(seriesWithDirection, function(series) { 
      if (series.options.__directionVectors) {
        for (let i = 0; i < series.options.__directionVectors.length; i++) {
          series.options.__directionVectors[i].destroy()
        }
      }
      series.options.__directionVectors = []

      const directionSeries = _.find(chart.series, function(s) {
        return s.options.name === series.options.directionSeriesTitle
      })

      if (series.visible && directionSeries) {
        for (let i = 0; i < series.data.length; i++) {
          if (xAxisExtremes.min <= series.data[i].x && series.data[i].x <= xAxisExtremes.max) {
            const directionData = _.findWhere(directionSeries.data, {x: series.data[i].x})
            if (directionData) {
              const x = series.data[i].plotX + chart.plotLeft
              const y = series.data[i].plotY + chart.plotTop

              let dir = directionData.y
              const spd = 20 // We want unit vectors (for now).
              dir += /wind/i.test(series.name) ? 90 : 270
              if (dir > 360) { dir -= 360 }
              let leftdir = dir + 135
              if (leftdir > 360) { leftdir -= 360 }
              let rightdir = dir - 135
              if (rightdir > 360) { rightdir -= 360 }
              const radians = dir * (Math.PI / 180)
              const vectorX = spd * Math.cos(radians)
              const vectorY = spd * Math.sin(radians)
              const leftarrowradians = leftdir * (Math.PI / 180)
              const rightarrowradians = rightdir * (Math.PI / 180)
              const leftvectorX = 4 * Math.cos(leftarrowradians)
              const leftvectorY = 4 * Math.sin(leftarrowradians)
              const rightvectorX = 4 * Math.cos(rightarrowradians)
              const rightvectorY = 4 * Math.sin(rightarrowradians)
              if (x && y) {
                const canvascmds = [
                  'M', roundTo(x, 3), roundTo(y, 3),
                  'L', roundTo(vectorX + x, 3), roundTo(vectorY + y, 3),
                  'L', roundTo(leftvectorX + vectorX + x, 3), roundTo(leftvectorY + vectorY + y, 3),
                  'M', roundTo(vectorX + x, 3), roundTo(vectorY + y, 3),
                  'L', roundTo(rightvectorX + vectorX + x , 3), roundTo(rightvectorY + vectorY + y, 3)
                ]

                series.options.__directionVectors.push(
                  r.path(canvascmds)
                    .attr({'stroke-width': 1, stroke: series.options.color})
                    .add()
                )
              }
            }
          }
        }
      }
    })

    function roundTo(num, decimals) {
      return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
    }
  }

  render() {
    const self = this

    if (this.props.status === 'off' || _.isNull(this.state.data)) {
      return <div />
    }

    // Add space to the right of the chart in case we have an invisible opposite axis on
    // another chart that is displayed above or below us.  This is so it will line up w/
    // any charts that may have >= 1 visible opposite axis.
    let chartOptions = {}
    const visibleOppositeYAxis = _.find(this.props.data, function(data) {
      return data.yAxis.opposite && data.yAxis.visible !== false
    })
    if (this.props.forceVerticalAlignment && !visibleOppositeYAxis) {
      chartOptions = {
        marginRight: 70
      }
    }

    ReactHighcharts.Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    const config = {
      chart: _.extend(chartOptions, {
        height: 200,
        events: {
          redraw: function(e) {
            self.drawVectors()
          }
        }
      }),
      title: {
        text : ''
      },
      xAxis: {
        type: 'datetime',
        crosshair: true,
        plotLines: [{
          width: 1,
          value: moment(this.props.time).valueOf(),
          color: ReactHighcharts.Highcharts.getOptions().colors[0],
        }],
        dateTimeLabelFormats: {
          hour: '%l:%M %p',
          day: '%b %e',
          week: '%b %e',
        },
        min: moment(this.props.startTime).valueOf(),
        max: moment(this.props.endTime).valueOf(),
      },
      yAxis: this.props.data.map((v, k) => {
        if (v.yAxis.showAsCompassDegrees) {
          return _.extend(v.yAxis, {
            min: 0,
            max: 360,
            tickInterval: 45,
            labels: {
              formatter: function() {
                return self.degToCompass(this.value)
              }
            }
          })
        }
        else {
          return v.yAxis
        }
      }),
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          animation: false
        }
      },
      tooltip: {
        formatter: function() {
          const d = moment(this.x)

          let html = []
          if (this.points) {
            html = this.points.map((v, k) => {
              let val = self.prettify(v.y) + ' ' + v.point.units
              if (v.point.options.showAsCompassDegrees) {
                val = self.degToCompass(v.y)
              }

              let directionHtml = ''
              const directionSeries = _.find(v.series.chart.series, function(s) {
                return s.options.name === v.series.options.directionSeriesTitle
              })
              if (directionSeries) {
                const directionData = _.findWhere(directionSeries.data, {x: v.x})
                directionHtml = (/wind/i.test(v.point.series.name) ? ' from the ' : ' toward the ') + self.degToCompass(directionData.y)
              }

              return '<span style="color:' + v.point.series.color + '">\u25CF</span>' + ' ' +
                v.point.series.name + ': ' +
                '<b>' + val + directionHtml + '</b>'
            })
          }
          else {
            let val = self.prettify(this.y) + ' ' + this.series.data[0].units
            if (this.series.data[0].showAsCompassDegrees) {
              val = self.degToCompass(this.y)
            }
            html = [this.point.series.name + ': ' + '<b>' + val + '</b>']
          }

          return '<b>' + d.format("ddd MMM D, h:mm A z") + '</b>' + '<br>' + html.join('<br>')
        },
        useHTML: true,
        shared: true,
      },
      series: this.state.data,
    }

    return (
      <ReactHighcharts
        ref="chart"
        config={config}
        />
    )
  }
}

export default Chart;