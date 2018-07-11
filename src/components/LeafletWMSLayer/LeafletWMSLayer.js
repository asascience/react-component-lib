import React, { Component } from 'react';
import { WMSTileLayer } from 'react-leaflet';

class LeafletWMSLayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <WMSTileLayer
        url={this.props.url}
        layers={this.props.layers}
        styles={this.props.styles !== 'WMS Default' ? this.props.styles : ''}
        format={this.props.format}
        transparent={this.props.transparent}
        opacity={this.props.opacity}
        version={this.props.version}
        onTileerror={this.props.onLoadError && ((error) => this.props.onLoadError(error))}
      />
    )
  }
}

export default LeafletWMSLayer;