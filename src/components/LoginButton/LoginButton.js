import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

/**
 * A component that shows the login button
 */
class LoginButton extends Component {
  /**
  * @param {object} props - the props passed to the component.
  * @param (object) props.style - the style of the login button
  */

  render() {
    return (
    <Link to={'/login'}>
      <FlatButton style={this.props.style}><span>Login</span></FlatButton>
    </Link>
    );
  }
}

LoginButton.defaultProps = {
  style: {color: '#55D6F8'},
};

LoginButton.propTypes = {
  style: PropTypes.object,
}

export default LoginButton;
