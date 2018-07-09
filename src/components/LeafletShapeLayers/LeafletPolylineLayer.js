import React, { Component } from 'react';
import { Polyline } from 'react-leaflet';

class LeafletPolylineLayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <Polyline
        positions={this.props.vertices}
        color={this.props.color}
        opacity={this.props.opacity}
        weight={this.props.weight}
      />
    );
  }
}

export default LeafletPolylineLayer;