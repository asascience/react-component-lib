import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
//import history from '../../history';
import PropTypes from 'prop-types';

/**
* A component that shows the user name and provides a list of options when logged in
*/
class UserOptionsMenu extends Component {
  /**
  * @param {object} props - the props passed to the component.
  * @param (string) props.name - the users name
  * @param (object) props.style - the button style
  * @param (object) props.arrowStyle - the style of the button caret
  * @param {function} props.handleLoginClick - called when logout menu item is clicked
  */

  render() {
    return (
    <IconMenu iconButtonElement={<FlatButton style={this.props.style}>
                                  <span>{this.props.name}</span>
                                  &nbsp;
                                  <ArrowDropDown style={this.props.arrowStyle}/>
                                </FlatButton>}
                                onChange={(evt, val) => {
    history.push(`/${val}`);
  }}
    >
      <MenuItem primaryText="Home" value={''} />
      <MenuItem primaryText="Account" value={'account'} disabled={true} />
      <MenuItem primaryText="Logout" onClick={this.props.handleLoginClick}/>
    </IconMenu>
    );
  }
}

UserOptionsMenu.defaultProps = {
  name: 'user1',
  style: {color: '#55D6F8'},
  arrowStyle: {verticalAlign: 'middle', color: 'grey'},
};

UserOptionsMenu.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  arrowStyle: PropTypes.object,
  handleLoginClick: PropTypes.func.isRequired,
};

export default UserOptionsMenu;
