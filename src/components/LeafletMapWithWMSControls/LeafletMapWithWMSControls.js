import React, { Component } from 'react';
import LeafletMap from '../LeafletMap/LeafletMap';
import LeafletWMSControls from '../LeafletWMSControls/LeafletWMSControls';

import { defaultStyles } from './defaultStyles.js';

import './LeafletMapWithWMSControls.css';

class LeafletMapWithWMSControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transparent: false,
      opacity: 1,
      layerIndex: 0,
      styleIndex: 0,
    };

    this.onCheckTransparent = this.onCheckTransparent.bind(this);
    this.onOpacityChange = this.onOpacityChange.bind(this);
    this.onLayerChange = this.onLayerChange.bind(this);
    this.onStyleChange = this.onStyleChange.bind(this);
  }

  onCheckTransparent(isChecked) {
    this.setState({
      transparent: isChecked,
    });
  }

  onOpacityChange(newOpacity) {
    this.setState({
      opacity: newOpacity,
    });
  }

  onLayerChange(newIndex) {
    this.setState({
      layerIndex: newIndex,
      styleIndex: 0,
    });
  }

  onStyleChange(newIndex) {
    this.setState({
      styleIndex: newIndex,
    });
  }

  render() {
    let layers = this.props.layerData.map((v, k) => {
      return v.layerName;
    });

    let styles = this.props.layerData[this.state.layerIndex].styles;
    let expandedStyles = styles.concat(defaultStyles);

    return (
      <div>
        <div className='leaflet-map-wms-wrapper'>
          <LeafletMap
            center={[0, 0]}
            zoomLevel={2}
            rasterLayerData={[
              {
                type: 'WMS',
                url: this.props.baseUrl,
                layers: layers[this.state.layerIndex],
                styles: expandedStyles[this.state.styleIndex],
                format:  'image/png',
                transparent: this.state.transparent,
                opacity: this.state.opacity,
                version: '1.1.1',
              }
            ]}
          />
          <LeafletWMSControls
            transparentField={{
              isChecked: this.state.transparent,
              isDisabled: false,
              onCheck: (e, isChecked) => this.onCheckTransparent(e, isChecked),
            }}
            opacityField={{
              value: this.state.opacity,
              isDisabled: false,
              onChange: (newOpacity) => this.onOpacityChange(newOpacity),
            }}
            layerField={{
              value: this.state.layerIndex,
              layers: layers,
              onChange: (newIndex) => this.onLayerChange(newIndex),
            }}
            styleField={{
              value: this.state.styleIndex,
              styles: expandedStyles,
              originalStyleCount: styles.length,
              onChange: (newIndex) => this.onStyleChange(newIndex),
            }}
          />
        </div>
      </div>
    );
  }
}

export default LeafletMapWithWMSControls;