import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gliderImage from 'images/glider.jpg';
import ServiceWrapper from 'components/ServiceWrapper/ServiceWrapper';


/**
 * Front page control component with image links to upload flows
 *
 */
class ProjectSelector extends Component {
  /**
   * @param {object} props.data - the data used to render the buttons, should specify in ProjectSelector.defaultProps
   * @param {function} props.onChoose - callback for when a project is clicked
   */

  constructor(props) {
    super(props);

    this.state = {
      presentService: '',
    };
  }

  render() {
    const serviceElements = this.props.data.map((dynamicComponent, i)=>{
      let finalUrl='/' + dynamicComponent.serviceUrl;

      const nestedElement = (
        <ServiceWrapper
          key={i}
          imgSrc={dynamicComponent.imgSrc}
          serviceName={dynamicComponent.serviceName}
          goToUrl= {finalUrl}
          onChoose = {this.props.onChoose.bind(this, dynamicComponent.serviceName)}
        />
      );

      return (
        <div key={i}>
          {nestedElement}
        </div>
      );
    });

    return (
      <div>
        <p>Select a Project to Upload Data</p>
        <div>
           {serviceElements}
        </div>
      </div>
    );
  }
}

ProjectSelector.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChoose: PropTypes.func,
}

ProjectSelector.defaultProps = {
  data:
  [
    {
      imgSrc: gliderImage,
      serviceName: 'Glider Project',
      serviceUrl: 'upload',
      serviceDescription: 'description goes here',
      moreInfoUrl: 'google.com',
    },
  ],
};

export default ProjectSelector;
