import React, { Component } from 'react';
import { Circle } from 'react-leaflet';

class LeafletCircleLayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <Circle
        center={this.props.center}
        radius={this.props.radius}
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

export default LeafletCircleLayer;