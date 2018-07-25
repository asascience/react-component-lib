import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import logo from '../../images/CHL_crest_nobg.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import $ from 'jquery';

/**
 * Returns the links associated with each option in the references dropdown
 *
 * @param {object} event - the click event object associated with the option selection
 */
const tapHandler = (event)=>{
  let itemTitle = $(event.target).text();
  let linkList = {
    'NetCDF User Guide': 'http://www.unidata.ucar.edu/software/netcdf/docs/index.html',
    'IOOS Compliance Checker': 'https://data.ioos.us/compliance/index.html',
    'NCEI 2.0 Templates': 'https://www.nodc.noaa.gov/data/formats/netcdf/v2.0/',
    'Metadata Manager': 'http://metadata.usace.army.mil/geoportal/catalog/main/home.page',
    'CHL Thredds': 'https://chlthredds.erdc.dren.mil/thredds/catalog.html',
    'CF Standard Names': 'http://cfconventions.org/standard-names.html',
    'ACDD': 'http://wiki.esipfed.org/index.php/Attribute_Convention_for_Data_Discovery',
  };
  if (linkList[itemTitle]) {
    window.open(linkList[itemTitle], '_target');
  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6bc4ea',  // Light Blue
    primary2Color: '#6bc4ea',  // Light Blue
    accent1Color: '#323c19',  // Dark Green
    pickerHeaderColor: '#0b538b',  // Dark  Blue
  },
});

// const Logged = (props) => (
/**
 * Dropdown menu component containing links to outside sources and about/help pages
 */
class Logged extends Component {
  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><MoreVert/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        iconStyle={{height: '40px', width: '40px', marginTop: '10px', color: '#ffffff'}}
      >
        <MenuItem
          containerElement={<Link to="/" />}
          primaryText="Home"
        />
        <MenuItem
          containerElement={<Link to="/about" />}
          primaryText="About"
        />
        <MenuItem
            primaryText="References"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="NetCDF User Guide" onClick={tapHandler} />,
              <MenuItem primaryText="IOOS Compliance Checker" onClick={tapHandler} />,
              <MenuItem primaryText="NCEI 2.0 Templates" onClick={tapHandler}/>,
              <MenuItem primaryText="Metadata Manager" onClick={tapHandler}/>,
              <MenuItem primaryText="CHL Thredds" onClick={tapHandler}/>,
              <MenuItem primaryText="CF Standard Names" onClick={tapHandler}/>,
              <MenuItem primaryText="ACDD" onClick={tapHandler}/>,
            ]}
        />
      </IconMenu>
    );
  }
}

/**
 * Wrapper component for the logo image in the navbar
 */
class Logo extends Component {
  render() {
    return (
      <img
        style={{width: 80, height: 80}}
        src={logo}
        className="NavBar-logo"
        alt="logo"
      />
    );
  }
}


/**
 * The main navigation bar component that displays on all pages
 */
class LoginAppBar extends Component {
  render() {
    const navbarStyle = {
      borderRadius: '4px',
    };

    const titleStyle = {
      fontSize: '45px',
      marginTop: '15px',
      textAlign: 'center'
    };

    const title = <Link to='/' style={{color: 'white'}}>Data Upload Tool</Link>

    const rightIcons =(
      <div style={{'display': 'flex', 'justifyContent': 'flex-end', 'alignItems': 'flex-start'}}>
        <Logged />
      </div>
    );
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar
          title={title}
          iconElementLeft={<Logo />}
          iconElementRight={rightIcons}
          style={navbarStyle}
          titleStyle={titleStyle}
        />
      </MuiThemeProvider>
    );
  }
}

export default LoginAppBar;
