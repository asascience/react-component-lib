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
        <Map id="leaflet-map" center={this.props.center} zoom={this.props.zoomLevel}>
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