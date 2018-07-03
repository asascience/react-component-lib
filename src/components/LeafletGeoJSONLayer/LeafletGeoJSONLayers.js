import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';

class LeafletGeoJSONLayers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let layers = this.props.geoJSONArray.map((v, k) => {
      return ( 
        <GeoJSON
          geoJSON={v}
        />
      );
    });
    return ( 
      <div>{layers}</div>
    );
  }
}

export default LeafletGeoJSONLayers;