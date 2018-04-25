import React, {Component} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  block: {
    padding: 10,
    maxWidth: '50%',
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
    maxWidth: 145,
  },
};

/**
 * A radio button box for survey data options
 */
class RadioButtonDataSelector extends Component {
  /**
   * @param {function} props.onRadioClick - handler for when a radio button option is selected
   */
   
  /**
   * Controls changing the selected survey file option
   *
   * @param {object} event - the radio button click event, event.target.value is the button value
   */
  changeSurveyType(e) {
    this.props.onRadioClick(e.target.value);
  }

  render() {
    return (
      <div>
        <RadioButtonGroup name="data-select" defaultSelected="point" style={styles.block} onChange={(e)=>this.changeSurveyType(e)}>
          <RadioButton
            value="point"
            label="Point Data"
            style={styles.radioButton}
          />
          <RadioButton
            value="dem"
            label="DEM Data"
            style={styles.radioButton}
          />
          <RadioButton
            value="profile"
            label="Profile Data"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
    );
  }
};


export default RadioButtonDataSelector;
