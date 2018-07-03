import React, { Component } from 'react';
import { Polygon } from 'react-leaflet';

class LeafletPolygonLayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <Polygon
        positions={this.props.vertices}
        color={this.props.color}
        opacity={this.props.opacity}
        weight={this.props.weight}
      />
    );
  }
}

export default LeafletPolygonLayer;