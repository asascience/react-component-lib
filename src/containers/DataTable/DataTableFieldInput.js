import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AvatarNumericBadge from 'components/AvatarNumericBadge/AvatarNumericBadge';
import DataTagInput from 'components/TagInput/TagInput';
import DataDatePicker from 'components/DatePicker/DatePicker';
import Dropdown from 'components/Dropdown/Dropdown';
import TableTextBox from 'components/TableTextBox/TableTextBox';
import moment from 'moment';

/*
* DatatableFieldInput - a wrapper class that takes json data for a input field and returns an appropriate ui element.
* Props:
* objectData - an object containing information about the input to be rendered including
* disabled - whether the element is disabled.
* onUpdate - a function to be called when the input value changes.
* index && uniqueID - used for assigning ids.
*/

class DataTableFieldInput extends Component {
  render() {
    let element;
    switch (this.props.objectData.fieldType) {
      case 'numericBadge':
         element = (
          <AvatarNumericBadge
            style={{width: '100%'}}
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            dimArray={this.props.objectData.data}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            disabled={this.props.objectData.disabled}
          />
        );
        break;
      case 'datePicker':
        element = (
          <DataDatePicker
            style={{width: '100%'}}
            parsedDate={this.props.objectData.date}
            key={this.props.index}
            id={this.props.index}
            pathInJson={this.props.objectData.pathInJson}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onDateUpdate={(pathInJson, newValue) => {
              let parsedDate = moment(newValue).format('YYYY-MM-DD');
              this.props.onUpdate(pathInJson, parsedDate);
            }}
            disabled={this.props.disabled}
          />
        );
        break;
      case 'dropdown':
        element = (
          <Dropdown
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            pathInJson={this.props.objectData.pathInJson}
            dataSource={this.props.objectData.dataSource}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onTextUpdate={this.props.onUpdate}
            disabled={this.props.objectData.disabled}
            options={this.props.objectData.options}
          />
        );
        break;
      case 'tagInput':
        element = (
          <DataTagInput
            style={{width: '100%'}}
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            pathInJson={this.props.objectData.pathInJson}
            dataSource={this.props.objectData.dataSource || this.props.objectData.options}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onTagUpdate={(newValue) => {
              this.props.onUpdate(this.props.objectData.pathInJson, newValue);
            }}
            disabled={this.props.disabled}
          />
        );
        break;
      default:
        element = (
          <TableTextBox
            style={{width: '500px'}}
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            pathInJson={this.props.objectData.pathInJson}
            dataSource={this.props.objectData.dataSource || this.props.objectData.options}
            acddLinkUrl={this.props.acddLinkUrl}
            description={this.props.objectData.description}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onTextUpdate={this.props.onUpdate}
            disabled={this.props.objectData.disabled}
            validated={this.props.objectData.validated}
            validationTooltip={this.props.objectData.validationTooltip}
          />
        );
        break;
    }
    return (
      element ? element : null
    );
  }
}

DataTableFieldInput.propTypes = {
  objectData: PropTypes.object,
  disabled: PropTypes.bool,
  onUpdate: PropTypes.func,
  index: PropTypes.number,
  uniqueID: PropTypes.number,
}


export default DataTableFieldInput;
