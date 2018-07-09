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
      layerDropDownItems = this.props.layerField.layers.map((v, k) => {
        return (
          <MenuItem
            value={k}
            label={v}
          />
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
            onCheck={this.props.transparentField.onCheck}
          />
        </div>
        <div className='wms-opacity-wrapper'>
          <p className='wms-opacity-label'>Opacity</p>
          <Slider
            className='wms-opacity-slider'
            defaultValue={this.props.opacityField.defaultValue}
            value={this.props.opacityField.value}
            disabled={this.props.opacityField.isDisabled}
            onChange={this.props.opacityField.onChange}
          />
        </div>
        <div className='wms-layer-wrapper'>
          <p className='wms-layer-label'>Layer</p>
          <DropDownMenu
            value={this.props.layerField.value}
            onChange={this.props.layerField.onChange}
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