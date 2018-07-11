import React, { Component } from 'react';
import LeafletMap from '../LeafletMap/LeafletMap';
import LeafletWMSControls from '../LeafletWMSControls/LeafletWMSControls';
import Snackbar from 'material-ui/Snackbar';

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
      errorOpen: false,
      errorUrl: '',
    };

    this.onCheckTransparent = this.onCheckTransparent.bind(this);
    this.onOpacityChange = this.onOpacityChange.bind(this);
    this.onLayerChange = this.onLayerChange.bind(this);
    this.onStyleChange = this.onStyleChange.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.handleErrorActionClick = this.handleErrorActionClick.bind(this);
    this.closeErrorSnackbar = this.closeErrorSnackbar.bind(this);
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

  onLoadError(error) {
    this.setState({
      errorUrl: error.tile.currentSrc,
      errorOpen: true,
    });
  }

  closeErrorSnackbar() {
    this.setState({
      errorOpen: false,
      errorMessage: '',
    });
  }

  handleErrorActionClick() {
    window.open(this.state.errorUrl, '_blank');
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
                url: 'http://174.67.104.8/wms/',
                layers: layers[this.state.layerIndex],
                styles: expandedStyles[this.state.styleIndex],
                format:  'image/png',
                transparent: this.state.transparent,
                opacity: this.state.opacity,
                version: '1.3.0',
                time: '2018-04-07T00:00:00Z',
              }
            ]}
            onLoadError={(error) => this.onLoadError(error)}
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
        <Snackbar
          open={this.state.errorOpen}
          message='There was an error loading the WMS data for the specified layer and styles.'
          action='view error'
          autoHideDuration={10000}
          onActionClick={this.closeErrorSnackbar}
          onRequestClose={this.closeErrorSnackbar}
        />
      </div>
    );
  }
}

export default LeafletMapWithWMSControls;