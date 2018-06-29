import React, { Component } from 'react'

import _ from 'underscore'
import moment from 'moment'

import { divIcon } from 'leaflet'
import { Marker as LeafletMarker, CircleMarker as LeafletCircleMarker, Tooltip } from 'react-leaflet'

import './MarkerLayers.css'

export class Markers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      time: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only render when necessary!
    return this.props.status !== nextProps.status ||
      this.props.time !== nextProps.time ||
      _.isNull(this.state.data)
  }

  componentDidMount() {
    // Fetch the data.
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    // Keep the data in sync if anything important has changed.
    if (
      this.props.status !== prevProps.status ||
      this.props.time !== prevProps.time
    ) {
      this.getData()
    }
  }

  getData() {
    // Only fetch data if the layer is visible and the times don't match between props and state.
    // The state's time will be updated to match the prop's time once a fetch has been finished.
    if (this.props.status === 'on' && this.props.time !== this.state.time) {
      this.props.onLoadStart(this.props.niceName)
      const url = this.props.url + '?time=' + this.makeQueryTimeString(this.props.time)
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            data: responseJson,
            time: this.props.time,
          })
          this.props.onLoadDone(this.props.niceName)
        })
        .catch((error) => {
          console.error(error)
          this.props.onLoadDone(this.props.niceName)
        })
    }
  }

  makeQueryTimeString(time) {
    return moment(time).utc().format('YYYY-MM-DDTHH:mm:00+00:00')
  }

  makeConditionsScalarRow(value, units) {
    return '<div>' + value + (_.isNull(units) ? '' : units) + '</div>'
  }

  makeConditionsVectorRow(value) {
    return '<div class="leaflet-direction-arrow"><i class="fa fa-arrow-down fa-fw" style="-ms-transform: rotate(' + value + 'deg);-moz-transform: rotate(' + value + 'deg);-webkit-transform: rotate(' + value + 'deg);-transform-transform: rotate(' + value + 'deg)"></i></div>'
  }

  makeConditionsIcon(className, rows) {
    return divIcon({
      html: '<div class="leaflet-global-conditions ' + className + '">' + rows.join("\n") + '</div>',
      iconSize: [40, 40],
      className: 'background-color-transparent',
    })
  }

  render() {
    const self = this

    if (this.props.status === 'off' || _.isNull(this.state.data)) {
      return <div />
    }

    const markers = this.state.data.features.map((v, k) => {
      if (this.props.type === 'ConditionsMarkers') {
        let rows = []

        _.each(this.props.parameters, function(parameter, index) {
          if (v.properties.data.hasOwnProperty(parameter.name)) {
            if (parameter.type === 'vector') {
              rows.push(self.makeConditionsVectorRow(v.properties.data[parameter.name].value))
            }
            else if (parameter.type === 'scalar') {
              let value = v.properties.data[parameter.name].value
              const formatting = self.props.parameters[index].formatting

              if (formatting) {
                if (formatting.type === 'float') {
                  if (formatting.operation.func === 'roundTo') {
                    value = Math.round(value * Math.pow(10, formatting.operation.param)) / Math.pow(10, formatting.operation.param)
                  }
                }
                else if (formatting.type === 'date') {
                  if (formatting.operation.func === 'formatDate') {
                    value = moment(value).format(formatting.operation.param)
                  }
                }
              }

              rows.push(self.makeConditionsScalarRow(
                value,
                self.props.parameters[index].units,
              ))
            }
          }
        })

        if (rows.length > 0) {
          const icon = this.makeConditionsIcon(
            this.props.conditionsClassName,
            rows,
          )

          return (
            <LeafletMarker
              key={k}
              icon={icon}
              position={[v.geometry.coordinates[1], v.geometry.coordinates[0]]}
              properties={_.omit(v.properties, 'data')}
              layers={this.props.layers}
              onClick={e => this.props.onClick(e)}
              >
              <Tooltip offset={[15, 0]} direction="right">
                <span><b>{v.properties.identifier}</b><br/>{this.props.tooltipText}</span>
              </Tooltip>
            </LeafletMarker>
          )
        }
        else {
          return <div key={k} />
        }
      }
      else if (this.props.type === 'CircleMarkers') {
        return (
          <LeafletCircleMarker
            key={k}
            center={[v.geometry.coordinates[1], v.geometry.coordinates[0]]}
            radius={8}
            fillOpacity={1}
            color={this.props.color}
            weight={2}
            fillColor={this.props.fillColor}
            properties={_.omit(v.properties, 'data')}
            layers={this.props.layers}
            onClick={e => this.props.onClick(e)}
            >
            <Tooltip offset={[10, 0]} direction="right">
              <span><b>{v.properties.identifier}</b><br />{this.props.tooltipText}</span>
            </Tooltip>
          </LeafletCircleMarker>
        )
      }
      else {
        return (
          <div key={k} />
        )
      }
    })

    return (
      <div>
        {markers}
      </div>
    )
  }
}
