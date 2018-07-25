import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import timezones from './Timezones.js';

/**
 * Timezone selection dropdown component for time control
 */
class TimezonePicker extends Component {
  /**
   * @param {string} props.value - the value of the currently selected timezone
   * @param {function} props.handleChangeTimezone - callback for when the selected timezone is changed
   */
  constructor(props) {
    super(props);

    this.getLongTimezoneForSelectedValue = this.getLongTimezoneForSelectedValue.bind(this);
  }

  /**
   * Processes the short timezone value passed in as a prop to the verbose value displayed in the dropdown
   *
   * @param {string} value - the short value passed in
   */
  getLongTimezoneForSelectedValue(value) {
    return Object.keys(timezones).find((key) => timezones[key] === value);
  }

  render() {
    let timezoneMenuItems = Object.keys(timezones).map((key) => {
      return (<MenuItem
                key={key}
                value={timezones[key]}
                primaryText={key}
                onClick={(e) => this.props.handleChangeTimezone(timezones[key])}
              />);
    });

    return (
      <div width='100%'>
        <SelectField
          hintText={this.getLongTimezoneForSelectedValue(this.props.value)}
          hintStyle={{color: '#000000'}}
          maxHeight={400}
          style={{width: '400px'}}
        >
          {timezoneMenuItems}
        </SelectField>
      </div>
    );
  }
}

export default TimezonePicker;
