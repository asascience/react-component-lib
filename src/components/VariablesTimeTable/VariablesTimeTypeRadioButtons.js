import React, {Component} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    padding: 10,
    maxWidth: '90%',
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid black',
    display: 'flex',
    WebkitFlexFlow: 'row nowrap',
    justifyContent: 'space-around',
  },
  radioButton: {
    maxWidth: '30%',
    fontSize: 'small',
  },
};


/**
 * Radio button box for the variables time type selection
 * (1 column DateTime, 2 columns Date and Time, 3+ columns of Y/M/D/H/M/S)
 */
class VariablesTimeTypeRadioButtons extends Component {
  /**
   * @param {string} props.selected - the value of the currently selected option
   * @param {function} props.onChangeTimeType - callback for when a new option is selected
   */

  /**
   * Controls changing the selected time type of the variables
   *
   * @param {string} button - the value of the radio button that is selected
   */
  changeTimeType(button) {
    this.props.onChangeTimeType(button);
  }

  render() {
    return (
      <div>
        <RadioButtonGroup
          name="data-select"
          valueSelected={this.props.selected}
          style={styles.block}
          onChange={(e)=>this.changeTimeType(e.target.value)}
        >
          <RadioButton
            value={1}
            label="1 Column (Combined date and time)"
            style={styles.radioButton}
          />
          <RadioButton
            value={2}
            label="2 Columns (Separate date and time)"
            style={styles.radioButton}
          />
          <RadioButton
            value={3}
            label="3+ Columns (At least three of Y/M/D/H/M/S)"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }
};


export default VariablesTimeTypeRadioButtons;
