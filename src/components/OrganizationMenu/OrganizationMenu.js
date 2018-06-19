import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import PropTypes from 'prop-types';

/**
* Selectfield menu which contains organizations
*/
class OrganizationMenu extends Component {
  /**
  * @param {object} props - the props passed to the component
  * @param {function} props.handleOrganizationChange - called when switching organizations
  * @param {Number} props.value - the value attribute of the selected organization
  * @param {object} props.menuItems - A component array of organizations
  * @return {object} - component
  */

  render() {
    return (
      <div>
        <SelectField
          value={this.props.value}
          onChange={this.props.handleOrganizationChange}
          hintText="Select Organization"
          floatingLabelText="Organization"
          floatingLabelFixed={true}
          floatingLabelStyle={{position: 'absolute', left: 0}}
        >
          {this.props.menuItems}
        </SelectField>
      </div>
    );
  }
}

OrganizationMenu.defaultProps = {
  style: {textAlign: 'right'},
};

OrganizationMenu.propTypes = {
  value: PropTypes.number,
  menuItems: PropTypes.array.isRequired,
  handleOrganizationChange: PropTypes.func,
};

export default OrganizationMenu;

