import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import logo from '../../static/img/logo-navbar.png';
import toplogo from '../../static/img/IOOS_Emblem_Tertiary_B_RGB.png';
import $ from 'jquery';
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

/**
 * Returns the User login icon
 *
 * @param {object} props - the click event object associated with the option selection
 * @return {html} [User login icon]
 */
class UserLogged extends Component {

  render() {
    let textStyle = {
      'fontSize': 12,
      'color': '#55D6F8',
      'marginTop': 0,
      'marginBottom': 0,
    };

    if (this.props.userLoggedIn) {
      // prevents an unwanted redirect to a project after only clicking login button from home
      sessionStorage.removeItem('projectName');
      return (
        <a onClick={this.props.handleLoginClick.bind(this, this.props.userLoggedIn)}>
          <i className='fa fa-user'
             aria-hidden='true'
             style={{'fontSize': 32,
                     'color': '#55D6F8',
                     'marginTop': 4,
                     'cursor': 'pointer'}}
          >
          </i>
          <p style={textStyle}>Log Out</p>
        </a>
      );
    }

    return (
      <Link to='/login'>
        <i className='fa fa-user'
          aria-hidden='true'
          style={{'fontSize': 32,
                  'color': '#55D6F8',
                  'marginTop': 4,
                  'cursor': 'pointer'}}
        >
        </i>
        <p style={textStyle}>Log In</p>
      </Link>
    );
  }
};

/**
 * Returns the links associated with each option in the references dropdown
 *
 * @param {object} event - the click event object associated with the option selection
 */
const tapHandler = (event)=>{
  let itemTitle = $(event.target).text();
  let linkList = {
    'NetCDF User Guide': 'http://www.unidata.ucar.edu/software/netcdf/docs/index.html',
    'ACDD': 'http://wiki.esipfed.org/index.php/Attribute_Convention_for_Data_Discovery',
    'CF Standard Names': 'http://cfconventions.org/standard-names.html',
    'IOOS Compliance Checker': 'https://data.ioos.us/compliance/index.html',
    'COMT Thredds': 'http://thredds.comt.ioos.us/thredds/catalog.html',
  };
  if (linkList[itemTitle]) {
    window.open(linkList[itemTitle], '_target');
  }
};

/**
 * Dropdown menu component containing links to outside sources and about/help pages
 */
class Logged extends Component {
  render() {
    const isLoggedIn = this.props.userLoggedIn;
    const logoutText = 'Logout (' + this.props.name + ')';

    let loginButton = null;
    if (isLoggedIn) {
      loginButton = <MenuItem primaryText={logoutText} onTouchTap={this.props.handleLoginClick.bind(this, this.props.userLoggedIn)}/>;
    } else {
      loginButton = <MenuItem primaryText="Log in" onTouchTap={this.props.handleLoginClick.bind(this, this.props.userLoggedIn)}/>;
    }
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVert/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        iconStyle={{height: '30px', width: '30px', color: '#55D6F8'}}
      >
        <MenuItem
          containerElement={<Link to="/" />}
          primaryText="Home"
        />
        <MenuItem
            primaryText="References"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="NetCDF User Guide" onTouchTap={tapHandler} />,
              <MenuItem primaryText="ACDD" onTouchTap={tapHandler}/>,
              <MenuItem primaryText="CF Standard Names" onTouchTap={tapHandler}/>,
              <MenuItem primaryText="IOOS Compliance Checker" onTouchTap={tapHandler} />,
              <MenuItem primaryText="COMT Thredds" onTouchTap={tapHandler}/>,
            ]}
        />
        {loginButton}
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
      <a href='https://ioos.us/comt' target='_blank' rel="noopener noreferrer">
        <img
          style={{height: '40px'}}
          src={logo}
          className='NavBar-logo'
          alt='logo'
        />
      </a>
    );
  }
}

class TopLogo extends Component {
  render() {
    return (
      <a href='https://ioos.us/' target='_blank' rel="noopener noreferrer">
        <img
          style={{width: '480px', display: 'block', margin: '10px auto'}}
          src={toplogo}
          className='Top-logo'
          alt='top logo'
        />
      </a>
    );
  }
}

Logged.muiName = 'IconMenu';

/**
 * The main navigation bar component that displays on all pages
 */
class LoginAppBar extends Component {
  render() {
    const style={backgroundColor: '#003087', textAlign: 'center'};
    const titleStyle={color: '#55D6F8'};
    const styleLeft={marginTop: 12};
    const title='Data Upload Tool';

    const rightIcons =(
      <div style={{'display': 'flex', 'justifyContent': 'flex-end', 'alignItems': 'center'}}>
        <UserLogged handleLoginClick={this.props.handleLoginClick} userLoggedIn={this.props.userLoggedIn} history={this.props.history}/>
        <Logged handleLoginClick={this.props.handleLoginClick} userLoggedIn={this.props.userLoggedIn} name={this.props.name}/>
      </div>
    );
    return (
      <div>
        {<TopLogo />}
        <AppBar
          title={title}
          iconElementLeft={<Logo />}
          iconStyleLeft = {styleLeft}
          iconElementRight={rightIcons}
          style={style}
          titleStyle={titleStyle}
        />
      </div>
    );
  }
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.name - specifies the user's name
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    name: state.flowData.name,
  }
};

export default connect(mapStateToProps, null)(LoginAppBar);