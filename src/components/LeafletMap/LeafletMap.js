import React, { Component } from 'react';
import { Map, Pane as LeafletPane, TileLayer} from 'react-leaflet'
import LeafletMarkers from '../LeafletMarkers/LeafletMarkers';
import LeafletRasterLayers  from '../LeafletRasterLayers/LeafletRasterLayers';
import LeafletGeoJSONLayers from '../LeafletGeoJSONLayers/LeafletGeoJSONLayers';
import LeafletVectorLayers from '../LeafletVectorLayers/LeafletVectorLayers';
import './LeafletMap.css';

class LeafletMap extends Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.getTileUrl = this.getTileUrl.bind(this);
  }

  getTileUrl() {
    let tileUrl = '';
    let baseUrl = this.props.rasterLayerData[0].url;
    if (baseUrl !== '' && this.mapRef.current.leafletElement) {
      // Get leafletElement ref and extract layer data
      let leafletElement = this.mapRef.current.leafletElement;
      let layers = leafletElement['_layers'];
      let layerKeys = Object.keys(layers);

      // Find the layer with the WMS url
      let wmsLayer = {};

      for (let i = 0; i < layerKeys.length; i++) {
        let layer = layers[layerKeys[i]];
        if (layer['_url'] === baseUrl) {
          wmsLayer = layer;
        }
      }

      // Extract tile data and find approximate center
      let tiles = wmsLayer['_tiles'];
      let tileKeys = Object.keys(tiles);
      let centerTileKey = tileKeys[tileKeys.length/2];
      let centerTile = tiles[centerTileKey];

      // Get tile url
      tileUrl = centerTile.el.getAttribute('src');
    }

    return tileUrl;
  }

  componentDidUpdate(prevProps) {
    if (this.props.rasterLayerData &&
      prevProps.rasterLayerData[0].layers !== this.props.rasterLayerData[0].layers) {
      let tileUrl = this.getTileUrl();
      this.props.setTileUrl(tileUrl);
    }
  }

  render() {
    let markers  = <div/>;

    if (this.props.markerData) {
      markers = (
        <LeafletPane
        >
          <LeafletMarkers
            markerData={this.props.markerData}
            type={this.props.markerType}
          />
        </LeafletPane>
      );
    }

    let rasterLayers =  <div/>;
    if (this.props.rasterLayerData) {
      rasterLayers = (
        <LeafletPane>
          <LeafletRasterLayers
            layerData={this.props.rasterLayerData}
            onLoadError={this.props.onLoadError && ((error) => this.props.onLoadError(error))}
          />
        </LeafletPane>
      );
    }

    let geoJSONLayers = <div/>;
    if (this.props.geoJSONData) {
      geoJSONLayers = (
        <LeafletPane>
          <LeafletGeoJSONLayers
            geoJSONArray={this.props.geoJSONData}
          />
        </LeafletPane>
      );
    }

    let vectorLayers = <div/>;
    if (this.props.vectorLayerData) {
      vectorLayers = (
        <LeafletPane>
          <LeafletVectorLayers
            layerData={this.props.vectorLayerData}
          />
        </LeafletPane>
      );
    }

    return (
      <div id="map-container">
        <Map id="leaflet-map" center={this.props.center} zoom={this.props.zoomLevel} ref={this.mapRef}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {markers}
        {rasterLayers}
        {geoJSONLayers}
        {vectorLayers}
        </Map>
      </div>
    );
  }
}

export default LeafletMap;