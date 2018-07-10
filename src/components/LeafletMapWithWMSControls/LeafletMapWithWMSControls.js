import React, { Component } from 'react';
import LeafletMap from '../LeafletMap/LeafletMap';
import LeafletWMSControls from '../LeafletWMSControls/LeafletWMSControls';

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
              layers: this.props.layers[this.state.layerIndex],
              styles: this.state.styles,
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
            layers: this.props.layers,
            onChange: (newIndex) => this.onLayerChange(newIndex),
          }}
          styleField={{
            value: this.state.styleIndex,
            styles: this.props.styles,
            onChange: (newIndex) => this.onStyleChange(newIndex),
          }}
        />
      </div>
    );
  }
}

export default LeafletMapWithWMSControls;