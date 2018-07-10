import React, { Component } from 'react';
import LeafletMap from '../LeafletMap/LeafletMap';
import LeafletWMSControls from '../LeafletWMSControls/LeafletWMSControls';

class LeafletMapWithWMSControls extends Component {
  constructor(props) {
    super(props);

    let layers =  [];
    let styles = ['WMS Default'];

    if (this.props.layerData) {
      layers = this.props.layerData.map((v, k) => {
        return v.layerName;
      });

      styles = styles.concat(this.props.layerData[0].styles);
    }

    this.state = {
      transparent: false,
      opacity: 1,
      layerIndex: 0,
      styleIndex: 0,
      layers: layers,
      styles: styles,
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
    let newStyles = ['WMS Default'].concat(this.props.layerData[newIndex].styles);

    this.setState({
      layerIndex: newIndex,
      styles: newStyles,
      styleIndex: 0,
    });
  }

  onStyleChange(newIndex) {
    this.setState({
      styleIndex: newIndex,
    });
  }

  render() {
    return (
      <div>
        <LeafletMap
          center={[0, 0]}
          zoomLevel={2}
          rasterLayerData={[
            {
              type: 'WMS',
              url: 'http://174.67.104.8/wms/',
              layers: this.state.layers[this.state.layerIndex],
              styles: this.state.styles[this.state.styleIndex],
              format:  'image/png',
              transparent: this.state.transparent,
              opacity: this.state.opacity,
              version: '1.3.0',
              time: '2018-04-07T00:00:00Z',
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
            layers: this.state.layers,
            onChange: (newIndex) => this.onLayerChange(newIndex),
          }}
          styleField={{
            value: this.state.styleIndex,
            styles: this.state.styles,
            onChange: (newIndex) => this.onStyleChange(newIndex),
          }}
        />
      </div>
    );
  }
}

export default LeafletMapWithWMSControls;