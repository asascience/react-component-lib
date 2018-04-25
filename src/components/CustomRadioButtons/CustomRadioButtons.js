import React, {Component} from 'react';
import Checked from 'material-ui/svg-icons/toggle/radio-button-checked';
import Unchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Info from 'material-ui/svg-icons/action/info-outline';
import IconButton from 'material-ui/IconButton';


/*
* RadioButtons - an Individual custom Radio Button. This is should not have any functions in it.
* it is a class that allows the RadioButton group to be built in DOM. 
* props:
* label - a label (DOM) to add to the right of the button without swallowing hover events for no reason.
* selected - if it is selected
* tooltip - text to show on the tooltip 
*/
export class RadioButton extends Component {

}


/*
* CustomRadioButtons - A class that implements a set of radio buttons to which you can pass DOM to serve as the label
* you may be wondering why on earth we need a custom implementation of this—I would too. Well, it turns out that
* material-ui enjoys being unextensible and difficult to work with in contexts outside of their
* narrowly defined usecases.
* props:
* defaultValue: The first value to be selected.
*/
export class CustomRadioButtons extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(value) {
    this.props.onChange(value);
  }

  render() {
    let buttonContainerStyle = {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
    };

    let radioButtonGroup = this.props.children.map((object)=>{
      return {value: object.props.value, label: object.props.label, toolTip: object.props.toolTip};
    });

    let radioButtons = radioButtonGroup.map((object, index)=>{
      let icon = this.props.selectedButton === object.value ? <Checked /> : <Unchecked/>;
      let toolTip;
      if(object.toolTip) {
        const infoToolTipStyle = {
          whiteSpace: 'normal',
          textAlign: 'justify',
          width: '300px',
          fontSize: 14,
        };
        toolTip = (
          <IconButton tooltip={<div style={infoToolTipStyle}>{object.toolTip}</div>}
            tooltipStyles={{opacity: 0.95, zIndex: 9999, left: 80}}
            tooltipPosition="top-right"
          >
            <Info color='#0645AD'/>
          </IconButton>
        );
      }
      return (
        <div key={index} style={buttonContainerStyle}>
          <IconButton
            onClick={this.buttonClicked.bind(this, object.value)}
          >
            {icon}
          </IconButton>
          <div>{object.label}</div>
          {toolTip}
        </div>
      );
    });
    return (
      <div>
        {radioButtons}
      </div>
    );
  }
}

