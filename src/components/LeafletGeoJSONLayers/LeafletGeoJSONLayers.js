import React, { Component } from 'react';
import { GeoJSON, Marker } from 'react-leaflet';

class LeafletGeoJSONLayers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let layers = this.props.geoJSONArray.map((v, k) => {
      return ( 
        <GeoJSON
          key={k}
          data={v}
          onEachFeature={(feature, layer) => {
            if (feature.properties && feature.properties.name) {
              layer.bindPopup(feature.properties.name);
            }
          }}
        />
      );
    });
    return ( 
      <div>{layers}</div>
    );
  }
}

export default LeafletGeoJSONLayers;