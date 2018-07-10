import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './LeafletWMSControls.css';

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

    return ( 
      <Paper className='wms-controls-wrapper'>
        <div>
          <Checkbox
            label='Transparent'
            labelPosition='left'
            checked={this.props.transparentField.isChecked}
            disabled={this.props.transparentField.isDisabled}
            onCheck={(e, isChecked) => this.props.transparentField.onCheck(isChecked)}
          />
        </div>
        <div className='wms-opacity-wrapper'>
          <p className='wms-opacity-label'>Opacity</p>
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
          >
            {layerDropDownItems}
          </DropDownMenu>
        </div>
        <div className='wms-styles-wrapper'>
          <p className='wms-styles-label'>Styles</p>
        </div>
      </Paper>
    )
  }
}

export default LeafletWMSControls;