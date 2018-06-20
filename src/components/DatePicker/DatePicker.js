import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

/**
 * A date selection view for the data table
 */
class DataDatePicker extends Component {
  /**
   * @param {string} props.parsedDate - a parsed version of the date selection
   * @param {boolean} props.disabled - whether the date picker should be disabled for editing
   * @param {object} props.pathInJson - an object with this shape {tab: "General", field: "title"}
   * @param {function} props.onDateUpdate - callback for when the date selection is changed
   * @return {object} - component
   */

  render() {
    let date;
    if (this.props.parsedDate) {
      date = moment(this.props.parsedDate).toDate();
    }
    let datePicker;
    if (!this.props.disabled) {
      datePicker = <DatePicker
                      defaultDate={date}
                      hintText="Select Date"
                      container="inline"
                      errorText={date === undefined ? 'This field is required' : undefined}
                      onChange={(event, newDate) => this.props.onDateUpdate(this.props.pathInJson, newDate)}
                   />;
    } else {
      datePicker =
        <p style={{display: 'inline-block', fontSize: '16px', textAlign: 'center'}}>{this.props.parsedDate.toString()}</p>;
    }
    return (
      datePicker
    );
  }
}

DataDatePicker.defaultProps = {
  pathInJson: {},
  disabled: false,
  parsedDate: moment(new Date()),
};

DataDatePicker.propTypes = {
  pathInJson: PropTypes.object,
  parsedDate: PropTypes.string,
  disabled: PropTypes.bool,
  onDateUpdate: PropTypes.func.isRequired,
};

export default DataDatePicker;
