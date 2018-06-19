import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import PropTypes from 'prop-types';

/**
 * A date selection view for the data table
 */
class Dropdown extends Component {
  /**
   * @param {array} [props.dataSource] - data source array for dropdown
   * @param {number} props.id - a unique identifier for the component
   * @param {string} props.text - the text to be initially displayed in the dropdown
   * @param {object} props.pathInJson - an object with this shape {tab: "General", field: "title"}
   * @param {string} props.severity - can be 'suggested' or 'required', whether to show warning when empty
   * @param {boolean} props.disabled - whether the dropdown should be disabled for editing
   * @param {function} props.onTextUpdate - callback for when the user selects a new option.
   * @param {string} props.listIndex - unique index of component in table.
   */

  constructor(props) {
    super(props);
    this.state = {
      value: 'test',
    };
    this.onTextUpdate = this.props.onTextUpdate;
    this.handleChange = (event, index, value) => this.setState({value});
  }


  render() {
    // builds dropdown menu options from options defined in schema/ACDD.js
    let dropdownOptions = this.props.options.map((option, i) => {
      return <MenuItem key={i} value={option} primaryText={option} />;
    });

    return (
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        style={{flex: 0.6}}
        autoWidth={false}
      >
      {dropdownOptions}
      </DropDownMenu>
    );
  }
}

Dropdown.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  pathInJson: PropTypes.object,
  dataSource: PropTypes.array,
  severity: PropTypes.string,
  listIndex: PropTypes.string,
  onTextUpdate: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

export default Dropdown;
