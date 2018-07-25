import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ServiceChooser.css';
import pointTimeSeriesImage from '../../images/ndbc.jpeg';
import griddedModelImage from '../../images/STWave.png';
import surveyImage from '../../images/crab1.jpg';
import sedimentImage from '../../images/sediments.jpeg';

const ServiceContainer = ({mousein, service, src}) => (
  <div className='service-container' onMouseOver={mousein}>
    <div className='imageTitleBar'>
      <div className='innerText'>{service}</div>
    </div>
    <div className='serviceImage' style={{backgroundImage: `url('${src}')`}}></div>
  </div>
);

const DescriptionContainer = ({text}) => (
  <div className='descrip'>
    {text}
  </div>
);

/**
 * Front page control component with image links to upload flows
 *
 * @prop {string} presentService - the currently moused over service button title
 */
class ServiceChooser extends Component {
  /**
   * @param {Array.<Object>} props.data - the data used to render the buttons, should specify in ServiceChooser.defaultProps
   * @param {function} props.onChoose - callback for when a dataset selection is made
   */
  constructor(props) {
    super(props);

    this.state = {
      presentService: '',
    };

    this.updateOnHover = this.updateOnHover.bind(this);
  }

  /**
   * Sets us the page on component mounting
   */
  componentWillMount() {
    this.setState({presentService: 'Hover over a data type to view its description.'});
  }

  /**
   * Controls the visual animations when hovering over a service option
   *
   * @param {string} serviceName - the name of the hovered service
   */
  updateOnHover(serviceName) {
    for(let i = 0; i < this.props.data.length; i++) {
      if(this.props.data[i].service === serviceName) {
        this.setState({presentService: this.props.data[i].serviceDescription});
        break;
      }
    }
  }

  render() {
    const serviceElements = this.props.data.map((dynamicComponent, i)=>{
      const nestedElement = <ServiceContainer
        mousein={()=>{
          this.updateOnHover(dynamicComponent.service);
        }}
        key={i}
        src={dynamicComponent.imgSrc}
        service={dynamicComponent.service}
                            />;
      // if(dynamicComponent.isExternalUrl === undefined) {
      //   return(
      //     <div className='outerdiv' key={i}>
      //       <Link
      //         to={dynamicComponent.gotoUrl}
      //         onClick = {(e)=>{
      //           e.preventDefault();
      //           this.props.onChoose(dynamicComponent.service, dynamicComponent.gotoUrl);
      //         }}
      //       >
      //         {nestedElement}
      //       </Link>
      //     </div>
      //   );
      // } else {
      //   return(
      //     <div className='outerdiv' key={i}>
      //       <a href={dynamicComponent.gotoUrl}>
      //         {nestedElement}
      //       </a>
      //     </div>
      //   );
      // }

      return (
        <div className='outerdiv' key={i}>
          {nestedElement}
        </div>
      );
    });
    return (
      <div style={this.props.style}>
        <p className='mainHeader'>Select a data type to upload</p>
          {serviceElements}
        <DescriptionContainer text={this.state.presentService} />
      </div>
    );
  }
}

ServiceChooser.defaultProps = {
  data:
  [
    {
      imgSrc: pointTimeSeriesImage,
      service: 'Point Timeseries',
      serviceDescription: 'A series of data points at the same spatial location with monotonically increasing times. ' +
        'For example, any metocean observation station data in netCDF format. This can include profile data as well.',
      gotoUrl: '/timeseries_upload',
    },
    {
      imgSrc: griddedModelImage,
      service: 'Gridded Model',
      serviceDescription: 'Data represented or projected on a regular or irregular grid.' +
        ' Model data must be uploaded in netCDF format.',
      gotoUrl: '/gridded_model_upload',
    },
    {
      imgSrc: surveyImage,
      service: 'Survey',
      serviceDescription: 'Upload point, DEM, or beach profile data',
      gotoUrl: '/survey_upload',
    },
    {
      imgSrc: sedimentImage,
      service: 'Sediment Data',
      serviceDescription: 'Upload sediment data. You will be redirected to the SAGA sediment upload tool.',
      isExternalUrl: true,
      gotoUrl: 'http://navigationdifcomplete20180205023458.azurewebsites.net/SEM',
    },
  ],
};

export default ServiceChooser;
