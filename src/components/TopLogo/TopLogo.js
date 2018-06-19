import React, {Component} from 'react';
import PropTypes from 'prop-types';
import toplogo from 'images/IOOS_Emblem_Tertiary_B_RGB.png';

/**
* The logo ontop of the navbar
*/
class TopLogo extends Component {
  /**
   * @param {object} props - the props passed to the component
   * @param {string} props.href - url to redirect to
   * @param {string} props.imgSrc - the image source
   * @param {object} props.style - the style of the logo
   * @return {object} - component
   */
  render() {
    return (
      <a href={this.props.href} target='_blank' rel="noopener noreferrer">
        <img
          src={this.props.imgSrc}
          className='Top-logo'
          alt='top logo'
          style={this.props.style}
        />
      </a>
    );
  }
}

TopLogo.defaultProps = {
  imgSrc: toplogo,
  href: 'https://ioos.us/comt',
  style: {width: '480px', display: 'block', margin: '10px auto'},
};

TopLogo.propTypes = {
  href: PropTypes.string,
  imgSrc: PropTypes.string,
  style: PropTypes.object,
};

export default TopLogo;
