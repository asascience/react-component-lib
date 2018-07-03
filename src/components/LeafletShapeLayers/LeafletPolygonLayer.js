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
        fillColor={this.props.color}
        fillOpacity={this.props.opacity}
        opacity={this.props.opacity}
        weight={this.props.weight}
        stroke={this.props.stroke}
      />
    );
  }
}

export default LeafletPolygonLayer;