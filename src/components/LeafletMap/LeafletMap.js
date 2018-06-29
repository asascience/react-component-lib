import React, { Component } from 'react';
import { Map, Pane as LeafletPane, TileLayer} from 'react-leaflet'
import './LeafletMap.css';

class LeafletMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="map-container">
        <Map id="leaflet-map" center={[0, 0]} zoom={2}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        </Map>
      </div>
    );
  }
}

export default LeafletMap;