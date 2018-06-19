import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FRFImage from 'images/FRF_Data_Portal_opt.png';
import PierImage from 'images/pier_opt.jpg';
import {muiTheme} from '../../theme.js';


class AboutContent extends Component {
  render() {
    return (
        <div>
          <div className='outerAboutDiv'>
            <div className="flex-container-about">
              <div className="flex-item-about about-container">
                 <h3 className='about-header'>
                    About the Data Upload Tool
                </h3>
              </div>

              <div className="flex-item-about">
                <a href='http://dev.oceansmap.com/usace/' target='_blank' rel="noopener noreferrer">
                  <div className="image-holder">
                    <img src={FRFImage} alt=""/>
                  </div>
                </a>
                <div className="info-container">
                  <p>Related Projects</p>
                  <span>
                    The <a href='https://frfdataportal.erdc.dren.mil/'
                    target='_blank' rel="noopener noreferrer">FRF Data Portal</a> provides access to near-realtime
                    and archived observations from the US Army Corps of
                    Engineers Field Research Facility. For help using
                    this portal, check out our series of tutorial videos.
                  </span>
                </div>
              </div>

              <div className="flex-item-about">
                <a href='http://frf.usace.army.mil/frf.shtml' target='_blank' rel="noopener noreferrer">
                  <div className="image-holder">
                    <img src={PierImage} alt=""/>
                  </div>
                </a>
                <div className="info-container">
                <p>Field Research Facility</p>
                  <span>
                    Located on the Atlantic Ocean near the town of Duck,
                    North Carolina, the
                    <a href='http://frf.usace.army.mil/frf.shtml' target='_blank' rel="noopener noreferrer"> FRF</a> is an
                    internationally-recognized coastal observatory.
                    Instruments at the facility constantly record
                    the changing waves, winds, tides, and currents.
                    Central to the facility is a 1840 foot long pier
                    and specialized vehicles. The FRF was established
                    in 1977 by the U.S. Army Corps of Engineers and
                    is part of the Coastal and Hydraulics
                    Laboratory.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="wrapper">
            <AboutContent />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps)=>{
  return {
    csrf: state.flowData.csrf,
  };
};


export default connect(mapStateToProps, null)(About);
