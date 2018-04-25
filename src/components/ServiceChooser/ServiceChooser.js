import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ServiceChooser.css';
import chesapeakeBayHypoxiaImage from '../../static/img/chesapeake-bay-hypoxia.png';
import gulfOfMexicoHypoxiaImage from '../../static/img/gulf-of-mexico-hypoxia.png';
import USWestCoastModelIntercomparsionProjectImage from '../../static/img/US-west-coast-model-intercomparison-project.png';
import puertoRicoUSVirginIslandsStormSurgeAndWavesImage from '../../static/img/puerto-rico_US-virgin-islands-storm-surge-and-waves.png';
import coastalWavesSurgeAndInundationInTheGulfOfMaineImage from '../../static/img/coastal-waves-surge-and-inundation-in-the-gulf-of-maine.png';
import coastalWavesSurgeAndInundationInTheGulfOfMexicoImage from '../../static/img/coastal-waves-surge-and-inundation-in-the-gulf-of-mexico.png';


const ServiceContainer = ({serviceName, src, moreInfoUrl}) => (
  <div className='service-container'>
    <div className='imageTitleBar'>
      <div className='innerText'>{serviceName}</div>
    </div>
    <div className='serviceImage' style={{backgroundImage: `url('${src}')`}}></div>
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
  }

  render() {
    const serviceElements = this.props.data.map((dynamicComponent, i)=>{
      const nestedElement = <ServiceContainer
        key={i}
        src={dynamicComponent.imgSrc}
        serviceName={dynamicComponent.serviceName}
      />;
      let finalUrl='/' + dynamicComponent.serviceUrl;

      if(dynamicComponent.isExternalUrl === undefined) {
        return(
          <div className='outerdiv' id={dynamicComponent.id}  key={i}>
            <Link
              to={finalUrl}
              onClick = {(e)=>{
                e.preventDefault();
                this.props.onChoose(dynamicComponent.serviceUrl, finalUrl);
              }}
            >
              {nestedElement}
            </Link>
            <a href={dynamicComponent.moreInfoUrl}>
              <div className="moreInfoDiv">More Info</div>
            </a>
          </div>
        );
      } else {
        return (
          <div className='outerdiv' id={dynamicComponent.id} key={i}>
            <a href={finalUrl}>
              {nestedElement}
            </a>
          </div>
        );
      }
    });
    return (
      <div style={this.props.style}>
        <p className='mainHeader'>Select a Project to Upload Data</p>
        <div id="serviceElementsWrapper">
          {serviceElements}
        </div>
      </div>
    );
  }
}

ServiceChooser.defaultProps = {
  data:
  [
    {
      imgSrc: chesapeakeBayHypoxiaImage,
      serviceName: 'Chesapeake Bay Hypoxia',
      serviceUrl: 'chesapeake-bay-hypoxia',
      serviceDescription: `Hypoxia is a condition threatening the health of the Chesapeake Bay in which oxygen levels drop
        so low that fish and other animals are stressed or killed. In the Bay, incidents of hypoxia-causing ‘dead zones’ are on the rise.`,
      moreInfoUrl: "https://ioos.us/comt/projects/cb_hypoxia",
    },
    {
      imgSrc: gulfOfMexicoHypoxiaImage,
      serviceName: 'Gulf of Mexico Hypoxia',
      serviceUrl: 'gulf-of-mexico-hypoxia',
      serviceDescription: `The largest hypoxia area in U.S. coastal waters, averaging 15,000 km2, forms every summer over
        the Texas-Louisiana shelf in the northern Gulf of Mexico. The formation is due to decay of organic matter that is primarily
        derived from nutrient inputs from the Mississippi/Atchafalaya river system.`,
      moreInfoUrl: "https://ioos.us/comt/projects/gom_hypoxia",
    },
    {
      imgSrc: USWestCoastModelIntercomparsionProjectImage,
      serviceName: 'The US West Coast Model Intercomparison Project',
      serviceUrl: 'us-west-coast-model-intercomparsion',
      serviceDescription: `The US West Coast component of the Coastal Ocean Modeling Testbed brings together researchers involved
        in coastal ocean modeling, data assimilation, and prediction with the goal to improve existing prediction systems and compare
        performance of different models and data assimilation approaches.`,
      moreInfoUrl: "https://ioos.us/comt/projects/usw_integration",
    },
    {
      imgSrc: puertoRicoUSVirginIslandsStormSurgeAndWavesImage,
      serviceName: 'Puerto Rico/U.S. Virgin Islands Storm Surge & Waves',
      serviceUrl: 'puerto-rico-u.s.-virgin-islands-storm-surge-&-waves',
      serviceDescription: `The goal of this COMT project is to extend the present wave/surge operational forecasting capability from
        mild-sloped coastal areas such as the US East and Gulf of Mexico coasts to steep-sloped areas such as around Caribbean and Pacific
        islands and transition this capability to NOAA’s National Hurricane Center and local WFOs.`,
      moreInfoUrl: "https://ioos.us/comt/projects/pr_inundation",
    },
    {
      imgSrc: coastalWavesSurgeAndInundationInTheGulfOfMaineImage,
      serviceName: 'Coastal Waves, Surge and Inundation in the Gulf of Maine',
      serviceUrl: 'coastal-waves,-surge-and-inundation-in-the-gulf-of-maine',
      serviceDescription: `The goal of this project was to provide guidance on the behavior (e.g., accuracy, robustness, execution speed)
        and implementation requirements (e.g., resolution, parameterization, computer capacity) of models that are presently in operational
        use, or that are under consideration for such use, for computing waves, storm surge, and inundation. Models were evaluated for three
        extratropical storms (May 2005, April 2007, December 2010) and hurricane Bob (1991) in the Gulf of Maine.`,
      moreInfoUrl: "https://ioos.us/comt/projects/extratropical_inundation",
    },
    {
      imgSrc: coastalWavesSurgeAndInundationInTheGulfOfMexicoImage,
      serviceName: 'Coastal Waves, Surge and Inundation in the Gulf of Mexico',
      serviceUrl: 'coastal-waves,-surge-and-inundation-in-the-gulf-of-mexico',
      serviceDescription: `The goal of this project was to provide guidance on the behavior (e.g., accuracy, robustness, execution speed)
        and implementation requirements (e.g., resolution, parameterization, computer capacity) of models that are presently in operational
        use, or that are under consideration for such use, for computing waves, storm surge, and inundation. Models were evaluated for two
        hurricanes (Rita 2005, Ike 2008) that impacted the northwestern Gulf of Mexico.`,
      moreInfoUrl: "https://ioos.us/comt/projects/tropical_inundation",
    },
  ],
};

export default ServiceChooser;
