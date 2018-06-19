import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
* Wrapper component for individual projects/services
*/
class ServiceWrapper extends Component {
  /**
  * @param {object} props - the props passed to the component
  * @param {function} props.onChoose - called when the project/service is clicked and triggers new routing
  * @param {string} props.imgSrc - the source of the image
  * @param {string} props.goToUrl - the url fragment specifing the new path for routing
  * @return {object} - component
  */

  render() {
    return (
      <Link to={this.props.goToUrl}>
        <img src={this.props.imgSrc} alt='glider' onClick={this.props.onChoose}/>
      </Link>
    );
  }
}

ServiceWrapper.defaultProps = {
  imgSrc: 'https://dummyimage.com/300x300/000/fff',
  goToUrl: 'google.com',
};

ServiceWrapper.propTypes = {
  onChoose: PropTypes.func.isRequired,
  imgSrc: PropTypes.string,
  goToUrl: PropTypes.string,
};


export default ServiceWrapper;
