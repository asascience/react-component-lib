import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import _ from 'underscore'

import { Map as LeafletMap, CircleMarker as LeafletCircleMarker, Pane as LeafletPane } from 'react-leaflet'
import LeafletControl from 'react-leaflet-control'

import * as EsriLeaflet from 'esri-leaflet'

import { WMSSingleTileLayer, EsriDynamicMapLayer } from './RasterLayers.js'
import { Markers } from './MarkerLayers.js'

import './Map.css'

class RasterLayers extends Component {
  render() {
    const onLayers = this.props.layers.filter((v, k) => {
      return v.status === 'on'
    })

    const layers = onLayers.map((v, k) => {
      if (v.type === 'WMSSingleTileLayer') {
        return (
          <WMSSingleTileLayer
            key={v.niceName}
            niceName={v.niceName}
            url={v.url}
            layers={v.layers}
            styles={v.styles}
            opacity={v.opacity}
            time={this.props.time}
            onLoadStart={this.props.onLoadStart}
            onLoadDone={this.props.onLoadDone}
            />
        )
      }
      else if (v.type === 'EsriDynamicMapLayer') {
        return (
          <EsriDynamicMapLayer
            key={v.niceName}
            niceName={v.niceName}
            url={v.url}
            layers={v.layers}
            opacity={v.opacity}
            time={this.props.time}
            onLoadStart={this.props.onLoadStart}
            onLoadDone={this.props.onLoadDone}
            />
        )
      }

      return <div />
    })

    return (
      <div>{layers}</div>
    )
  }
}

class MarkerLayers extends Component {
  render() {
    const layers = this.props.layers.map((v, k) => {
      return (
        <Markers
          key={v.niceName}
          niceName={v.niceName}
          onClick={this.props.onClick}
          layers={v.layers}
          time={this.props.time}
          status={v.status}
          url={v.url}
          onLoadStart={this.props.onLoadStart}
          onLoadDone={this.props.onLoadDone}
          parameters={v.parameters}
          fillColor={v.fillColor}
          conditionsClassName={v.conditionsClassName}
          color={v.color}
          type={v.type}
          tooltipText={v.tooltipText}
          />
      )
    })

    return (
      <div>{layers}</div>
    )
  }
}

/*
  Unfortunately, the handy react-leaflet-control doesn't clean things up in Leafletland nicely.
 */
class CleanLeafletControl extends LeafletControl {
  componentWillUnmount() {
    this.leafletElement.remove()
    super.componentWillUnmount()
  }
}

class Panes extends Component {
  render() {
    const panes = this.props.panes.map((pane, k) => {
      // Pull back the layers that fall into this pane.
      const rasterLayers = this.props.layers.filter((v, k) => {
        return /^WMSSingleTileLayer|EsriDynamicMapLayer$/.test(v.type) && v.mapPane === pane
      })
      const conditionsMarkerLayers = this.props.layers.filter((v, k) => {
        return /Markers$/.test(v.type) && v.mapPane === pane
      })

      // Assign the zIndex based on the index value of this pane.
      return (
        <LeafletPane
          key={k}
          name={pane}
          style={{zIndex: this.props.zIndex - k}}
          >
          <RasterLayers
            time={this.props.time}
            layers={rasterLayers}
            onLoadStart={this.props.onLoadStart}
            onLoadDone={this.props.onLoadDone}
            onSetOpacity={this.props.onSetOpacity}
            />
          <MarkerLayers
            time={this.props.time}
            layers={conditionsMarkerLayers}
            onLoadStart={this.props.onLoadStart}
            onLoadDone={this.props.onLoadDone}
            onClick={this.props.onMarkerClick}
            />
        </LeafletPane>
      )
    })

    return (
      <div>{panes}</div>
    )
  }
}

class Legends extends Component {
  render() {
    const onLayers = this.props.layers.filter((v, k) => {
      return !_.isNull(v.legendUrl) && v.status === 'on'
    })

    const layers = onLayers.map((v, k) => {
      return (
        <CleanLeafletControl key={k} position="bottomright" className="leaflet-legend">
          <div className="thumbnail">
            <Image src={v.legendUrl} thumbnail className="leaflet-legend-thumbnail" />
          </div>
        </CleanLeafletControl>
      )
    })

    return (
      <div>{layers}</div>
    )
  }
}

export class Map extends Component {
  constructor(props) {
    super(props)
    this.basemap = null
    this.state = {
      zIndex: 500
    }
  }

  componentDidMount() {
    // Add a pretty basemap.
    this.basemap = EsriLeaflet.basemapLayer('Streets').addTo(this.refs.map.leafletElement)

    // Set initial bounds.
    this.refs.map.leafletElement.fitBounds(this.props.bounds)
  }

  componentWillUnmount() {
    // Not really necessary, but cleanliness is next to godliness.  Lose the basemap.
    this.basemap.remove()
  }

  render() {
    const legendLayers = this.props.layers.filter((v, k) => {
      return /^WMSSingleTileLayer|EsriDynamicMapLayer$/.test(v.type)
    })

    let selectedMarker = <div />
    if (!_.isNull(this.props.selectedMarker.coordinates)) {
      selectedMarker = (
        <LeafletPane
          style={{zIndex: this.state.zIndex}}
          >
          <LeafletCircleMarker
            center={[this.props.selectedMarker.coordinates[1], this.props.selectedMarker.coordinates[0]]}
            radius={this.props.selectedMarker.radius}
            color={this.props.selectedMarker.color}
            fillColor={this.props.selectedMarker.fillColor}
            fillOpacity={this.props.selectedMarker.fillOpacity}
            interactive={false}
            />
        </LeafletPane>
      )
    }

    return (
      <LeafletMap
        ref='map'
        >
        <Legends
          layers={legendLayers}
          />
        <Panes
          panes={this.props.panes}
          layers={this.props.layers}
          time={this.props.time}
          onLoadStart={this.props.onLayerLoadStart}
          onLoadDone={this.props.onLayerLoadDone}
          onSetOpacity={this.props.onLayerSetOpacity}
          onMarkerClick={this.props.onMarkerClick}
          zIndex={this.state.zIndex - 1}
          />
        {selectedMarker}
      </LeafletMap>
    )
  }
}
