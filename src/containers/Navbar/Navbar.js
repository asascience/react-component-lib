import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import TopLogo from 'components/TopLogo/TopLogo';
import AppbarLogo from 'components/AppbarLogo/AppbarLogo';
import References from 'components/ReferencesDropdown/ReferencesDropdown';
import UserOptionsMenu from 'components/UserOptionsMenu/UserOptionsMenu';
import LoginButton from 'components/LoginButton/LoginButton';
import toplogoImage from 'images/IOOS_Emblem_Tertiary_B_RGB.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from '../../theme.js';
import PropTypes from 'prop-types';

/**
 * The main navigation bar component that displays on all pages
 */
class Navbar extends Component {
  /**
  * @param {object} props - the props passed to the component.
  * @param {string} props.title - the project title in the center of the navbar
  * @param {object} props.barStyle - the style of the app bar
  * @param {object} props.titleStyle - the style of title in the app bar
  * @param {object} props.styleLeft - the style of left icon/s
  * @param {object} props.styleRight - the style of right icon/s
  * @return {object} - component
  */

  render() {
    let title = (
    <Link to={'/'} style={{textDecoration: 'none'}}>
      <span style={this.props.titleStyle}>{this.props.title}</span>
    </Link>
    );

    let logged = this.props.userLoggedIn;
    let widget = logged ? <UserOptionsMenu name={this.props.name} handleLoginClick={this.props.handleLoginClick} /> :
      <LoginButton />;

    let rightIcons = (
      <div style={this.props.styleRight}>
        <References />
        {widget}
      </div>
    );
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {<TopLogo imgSrc={toplogoImage} />}
          <AppBar
            title={title}
            iconElementLeft={<AppbarLogo />}
            iconStyleLeft = {this.props.styleLeft}
            iconElementRight={rightIcons}
            style={this.props.barStyle}
          />
        </div>
       </MuiThemeProvider>
    );
  }
}

Navbar.defaultProps = {
  title: 'Data Upload Tool',
  barStyle: {backgroundColor: '#003087', textAlign: 'center'},
  titleStyle: {color: '#55D6F8'},
  styleLeft: {marginTop: 12},
  styleRight: {marginTop: 7},
};

Navbar.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  barStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  styleLeft: PropTypes.object,
  styleRight: PropTypes.object,
};

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.name - specifies the user's name
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    name: state.flowData.name,
  };
};

export default connect(mapStateToProps, null)(Navbar);
