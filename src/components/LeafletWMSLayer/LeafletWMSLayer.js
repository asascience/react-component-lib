import React, { Component } from 'react';
import { WMSTileLayer } from 'react-leaflet';

import moment from 'moment';

class LeafletWMSLayer extends Component {
  constructor(props) {
    super(props);

    this.makeTimeQueryString = this.makeTimeQueryString.bind(this);
  }

  makeTimeQueryString(time) {
    return moment(time).utc().format('YYYY-MM-DDTHH:mm:00+00:00')
  }

  render() {
    return ( 
      <WMSTileLayer
        url={this.props.url}
        layers={this.props.layers}
        styles={this.props.styles}
        format={this.props.format}
        transparent={this.props.transparent}
        version={this.props.version}
        time={this.makeTimeQueryString(this.props.time)}
      />
    )
  }
}

export default LeafletWMSLayer;