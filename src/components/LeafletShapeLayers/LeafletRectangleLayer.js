import React, { Component } from 'react';
import { Rectangle } from 'react-leaflet';

class LeafletRectangleLayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <Rectangle
        bounds={this.props.bounds}
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

export default LeafletRectangleLayer;