import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from 'images/logo-navbar.png';

/**
* Wrapper component for the logo image in the navbar
*/
class AppbarLogo extends Component {
  /**
  * @param {object} props - the props passed to the component
  * @param {string} props.href - a url for redirecting
  * @param {object} props.style - a style object
  * @return {object} - component
  */

  render() {
    return (
      <a href={this.props.href} target='_blank' rel="noopener noreferrer">
        <img
          style={this.props.style}
          src={logo}
          className='NavBar-logo'
          alt='logo'
        />
      </a>
    );
  }
}

AppbarLogo.defaultProps = {
  href: 'https://ioos.us/comt',
  style: {height: '40px'},
};

AppbarLogo.propTypes = {
  href: PropTypes.string,
  style: PropTypes.object
}


export default AppbarLogo;
