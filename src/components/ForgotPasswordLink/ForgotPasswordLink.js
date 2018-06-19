import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * A forgot password link that when clicked calls a provided function
 */
class ForgotPasswordLink extends Component {
  /**
  * @param {object} props - the props passed to the component
  * @param {function} props.handleForgotPW - called when forgot password text is clicked
  * @return {object} - component
  */

  render() {
    return (
       <div>
          <p style={this.props.hyperLinkContainerStyle}>
            <a onClick = {this.props.handleForgotPW} style={this.props.hyperLinkStyle}>Forgot Password?</a>
          </p>
       </div>
    );
  }
}

ForgotPasswordLink.defaultProps = {
  hyperLinkContainerStyle: {
    marginTop: 8,
    marginBottom: 0,
    marginLeft: 0,
    textAlign: 'left',
  },
  hyperLinkStyle: {
    fontSize: 10,
    color: '#0088cc',
    cursor: 'pointer',
    padding: '10px 0',
  },
};

ForgotPasswordLink.propTypes = {
  handleForgotPW: PropTypes.func.isRequired,
};


export default ForgotPasswordLink;
