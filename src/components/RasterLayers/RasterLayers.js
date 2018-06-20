import React, { Component } from 'react'
import { ImageOverlay } from 'react-leaflet'

import moment from 'moment'

/*
  <WMSSingleTileLayer
    url: String, Base URL, e.g. 'http://coastmap.com/ecop/wms.aspx?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&'
    layers: String, WMS LAYERS
    styles: String, WMS STYLES
    opacity: Float, 0.0 - 1.0
    time: Object, JS Date
    onLoadStart: callback
    onLoadDone: callback
    />
 */

export class WMSSingleTileLayer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only render when necessary!
    return this.props.time !== nextProps.time ||
      this.props.opacity !== nextProps.opacity ||
      this.props.styles !== nextProps.styles
  }

  componentDidMount() {
    // Fire an initial sync.
    this.syncImageUrlAndBounds()

    // Force Leaflet to keep this layer in sync w/ map actions outside of React world!
    this.refs.layer.leafletElement._map.on('moveend', this.syncImageUrl, this)

    // Update the bounds only after the image has loaded.  This avoids clunky zooming.
    this.refs.layer.leafletElement.on('load', this.syncImageBounds, this)
  }

  componentDidUpdate() {
    // Something has changed, sync the image.
    this.syncImageUrlAndBounds()
  }

  syncImageBounds(raiseEvent = true) {
    // Don't do anything if we don't have a layer to work w/.
    if (!this.refs.layer) {
      return;
    }

    // Pull goodies from the Leaflet map.
    const bounds = this.refs.layer.leafletElement._map.getBounds()

    // ImageOverlay's bounds need to be in non-projcted coordinates.
    this.refs.layer.leafletElement.setBounds(bounds)

    // Raise some kind of event to let your app know the layer has been loaded.
    if (raiseEvent) {
      this.props.onLoadDone(this.props.niceName)
    }
  }

  syncImageUrl(raiseEvent = true) {
    // Don't do anything if we don't have a layer to work w/.
    if (!this.refs.layer) {
      return;
    }

    // Raise some kind of event to let your app know the layer has been loaded.
    if (raiseEvent) {
      this.props.onLoadStart(this.props.niceName)
    }

    // Pull goodies from the Leaflet map.
    const bounds = this.refs.layer.leafletElement._map.getBounds()
    const crs = this.refs.layer.leafletElement._map.options.crs
    const sw = crs.project(bounds.getSouthWest())
    const ne = crs.project(bounds.getNorthEast())
    const size = this.refs.layer.leafletElement._map.getSize()

    // BBOX needs to be in projected coordinates.
    const url = this.props.url +
      'LAYERS=' + this.props.layers + '&' +
      'STYLES=' + this.props.styles + '&' +
      'WIDTH=' + size.x + '&' +
      'HEIGHT=' + size.y + '&' +
      'BBOX=' + [sw.x, sw.y, ne.x, ne.y].join(',') + '&' +
      'SRS=' + encodeURIComponent(crs.code) + '&' +
      'TIME=' + this.makeQueryTimeString(this.props.time)

    // Update the ImageOverlay.
    this.refs.layer.leafletElement.setUrl(url)
  }

  syncImageUrlAndBounds() {
    // In the case of a React render, we want to update the bounds before the image has been loaded.
    // This would be due to a state change, e.g. a time change or addition of a new layer.
    // And don't let this manual bound update raise a layer loaded event.  Instead, let the image 'load' do that.
    this.syncImageUrl();
    this.syncImageBounds(false);
  }

  makeQueryTimeString(time) {
    return moment(time).utc().format('YYYY-MM-DDTHH:mm:00+00:00')
  }

  render() {
    return ( 
      <ImageOverlay
        ref="layer"
        url="#"
        bounds={[[0, 0], [0, 0]]}
        opacity={this.props.opacity}
        />
    )
  }
}

export class EsriDynamicMapLayer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only render when necessary!
    return this.props.time !== nextProps.time ||
      this.props.opacity !== nextProps.opacity
  }

  componentDidMount() {
    // Fire an initial sync.
    this.syncImageUrlAndBounds()

    // Force Leaflet to keep this layer in sync w/ map actions outside of React world!
    this.refs.layer.leafletElement._map.on('moveend', this.syncImageUrl, this)

    // Update the bounds only after the image has loaded.  This avoids clunky zooming.
    this.refs.layer.leafletElement.on('load', this.syncImageBounds, this)
  }

  componentDidUpdate() {
    // Something has changed, sync the image.
    this.syncImageUrlAndBounds()
  }

  syncImageBounds(raiseEvent = true) {
    // Don't do anything if we don't have a layer to work w/.
    if (!this.refs.layer) {
      return;
    }

    // Pull goodies from the Leaflet map.
    const bounds = this.refs.layer.leafletElement._map.getBounds()

    // ImageOverlay's bounds need to be in non-projcted coordinates.
    this.refs.layer.leafletElement.setBounds(bounds)

    // Raise some kind of event to let your app know the layer has been loaded.
    if (raiseEvent) {
      this.props.onLoadDone(this.props.niceName)
    }
  }

  syncImageUrl(raiseEvent = true) {
    // Don't do anything if we don't have a layer to work w/.
    if (!this.refs.layer) {
      return;
    }

    // Raise some kind of event to let your app know the layer has been loaded.
    if (raiseEvent) {
      this.props.onLoadStart(this.props.niceName)
    }

    // Pull goodies from the Leaflet map.
    const bounds = this.refs.layer.leafletElement._map.getBounds()
    const crs = this.refs.layer.leafletElement._map.options.crs
    const sw = crs.project(bounds.getSouthWest())
    const ne = crs.project(bounds.getNorthEast())
    const size = this.refs.layer.leafletElement._map.getSize()

    // BBOX needs to be in projected coordinates.
    const url = this.props.url +
      'layers=' + 'show:' + this.props.layers + '&' +
      'size=' + size.x + ',' + size.y + '&' +
      'bbox=' + [sw.x, sw.y, ne.x, ne.y].join(',') + '&' +
      'bboxSR=' + encodeURIComponent(crs.code).split(':')[1] + '&' +
      'imageSR=' + encodeURIComponent(crs.code).split(':')[1] + '&' +
      'time=' + this.makeQueryTimeString(this.props.time)

    // Update the ImageOverlay.
    this.refs.layer.leafletElement.setUrl(url)
  }

  syncImageUrlAndBounds() {
    // In the case of a React render, we want to update the bounds before the image has been loaded.
    // This would be due to a state change, e.g. a time change or addition of a new layer.
    // And don't let this manual bound update raise a layer loaded event.  Instead, let the image 'load' do that.
    this.syncImageUrl();
    this.syncImageBounds(false);
  }

  makeQueryTimeString(time) {
    return moment(time).utc().format('YYYY-MM-DDTHH:mm:00+00:00')
  }

  render() {
    return ( 
      <ImageOverlay
        ref="layer"
        url="#"
        bounds={[[0, 0], [0, 0]]}
        opacity={this.props.opacity}
        />
    )
  }
}
