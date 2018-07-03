import React, { Component } from 'react';
import { Rectangle } from 'react-leaflet';

class LeafletRectangleLayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return ( 
      <Rectangle
        bounds={this.props.bounds}
        color={this.props.color}
        opacity={this.props.opacity}
        weight={this.props.weight}
      />
    );
  }
}

export default LeafletRectangleLayer;