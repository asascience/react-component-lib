import React, { Component } from 'react';
import { Map, Pane as LeafletPane, TileLayer} from 'react-leaflet'
import LeafletMarkers from '../LeafletMarkers/LeafletMarkers';
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
            circleRadius={this.props.markerProperties.circleRadius}
            fillOpacity={this.props.markerProperties.fillOpacity}
            color={this.props.markerProperties.color}
            fillColor={this.props.markerProperties.fillColor}
            weight={this.props.markerProperties.weight}
            onClick={this.props.markerProperties.onClick}
            type={this.props.markerProperties.type}
          />
        </LeafletPane>
      );
    }

    return (
      <div id="map-container">
        <Map id="leaflet-map" center={[0, 0]} zoom={2}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {markers}
        </Map>
      </div>
    );
  }
}

export default LeafletMap;