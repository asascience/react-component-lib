import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import NetworkIcon from 'material-ui/svg-icons/notification/wifi';
import SvgIcon from 'material-ui/SvgIcon';

import './LeafletWMSControls.css';

const NoNetworkIcon = (props) => (
  <SvgIcon {...props}>
    <path fill="none" d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"/>
    <path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"/>
  </SvgIcon>
);

class LeafletWMSControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let layerDropDownItems;
    if (this.props.layerField && this.props.layerField.layers) {
      layerDropDownItems = this.props.layerField.layers.map((layer, index) => {
        return (
          <MenuItem value={index} primaryText={layer}/>
        );
      });
    }

    let styleDropDownItems;
    if (this.props.styleField && this.props.styleField.styles) {
      styleDropDownItems = this.props.styleField.styles.map((style, index) => {
        return (
          <MenuItem value={index} primaryText={style}/>
        );
      });
    }

    return ( 
      <Paper className='wms-controls-wrapper'>
        <p className='wms-controls-header'>WMS Controls</p>
        <div className='wms-transparent-wrapper'>
          <p className='wms-transparent-label'>Transparent</p>
          <div className='wms-transparent-checkbox'>
            <Checkbox
              checked={this.props.transparentField.isChecked}
              disabled={this.props.transparentField.isDisabled}
              onCheck={(e, isChecked) => this.props.transparentField.onCheck(isChecked)}
            />
          </div>
        </div>
        <div className='wms-opacity-wrapper'>
          <div className='wms-opacity-label-wrapper'>
            <NoNetworkIcon className='wms-no-network-icon'/>
            <p className='wms-opacity-label'>Opacity</p>
          </div>
          <Slider
            className='wms-opacity-slider'
            value={this.props.opacityField.value}
            disabled={this.props.opacityField.isDisabled}
            onChange={(e, newOpacity) => this.props.opacityField.onChange(newOpacity)}
          />
        </div>
        <div className='wms-layer-wrapper'>
          <p className='wms-layer-label'>Layer</p>
          <DropDownMenu
            value={this.props.layerField.value}
            onChange={(e, key, payload) => this.props.layerField.onChange(key)}
            autoWidth={false}
            className='wms-layer-dropdown'
          >
            {layerDropDownItems}
          </DropDownMenu>
        </div>
        <div className='wms-styles-wrapper'>
          <p className='wms-styles-label'>Styles</p>
          <DropDownMenu
            value={this.props.styleField.value}
            onChange={(e, key, payload) => this.props.styleField.onChange(key)}
            autoWidth={false}
            className='wms-styles-dropdown'
          >
            {styleDropDownItems}
          </DropDownMenu>
        </div>
      </Paper>
    )
  }
}

export default LeafletWMSControls;