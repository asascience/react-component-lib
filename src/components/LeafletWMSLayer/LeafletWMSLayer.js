import React, { Component } from 'react';
import { WMSTileLayer } from 'react-leaflet';

class LeafletWMSLayer extends Component {
  componentDidUpdate(prevProps){
    if (prevProps !== this.props) {
      this.forceUpdate();
    }
  }

  render() {
    let customProps = {}
    if( this.props.numberOfColorBands !== undefined) {
      customProps['NUMCOLORBANDS'] = this.props.numberOfColorBands;
    }
    if (this.props.colorScaleRange !== undefined) {
      customProps['COLORSCALERANGE'] = this.props.colorScaleRange;
    }
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
        {...customProps}
      />
    )
  }
  //logScale={this.props.logScale}
  //colorScaleRange={this.props.colorScaleRange}

}

export default LeafletWMSLayer;