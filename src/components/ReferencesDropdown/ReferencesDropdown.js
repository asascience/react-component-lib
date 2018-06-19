import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

/**
 * Returns the links associated with each option in the references dropdown
 *
 * @param {object} event - the click event object associated with the option selection
 */
const tapHandler = (event)=>{
  let itemTitle = event.target.textContent;
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
 * A component that shows relevant references
 */
class References extends Component {
  /**
  * @param {object} props - the props passed to the component.
  * @param (object) props.buttonStyle - the style of the references button
  * @param (object) props.caretStyle - the style of the references downward caret icon
  * @param (object) props.menuStyle - the style of the menu
  * @return {object} - component
  */

  render() {
    return (
    <IconMenu
      iconButtonElement={<FlatButton style={this.props.buttonStyle}>
        <span>{'References'}</span>
        &nbsp;
        <ArrowDropDown style={this.props.caretStyle}/>
                        </FlatButton>}
      style={this.props.menuStyle}
    >
      <MenuItem primaryText="NetCDF User Guide" onClick={tapHandler} />
      <MenuItem primaryText="ACDD" onClick={tapHandler}/>
      <MenuItem primaryText="CF Standard Names" onClick={tapHandler}/>
      <MenuItem primaryText="IOOS Compliance Checker" onClick={tapHandler} />
      <MenuItem primaryText="COMT Thredds" onClick={tapHandler}/>
    </IconMenu>
    );
  }
}

References.defaultProps = {
  buttonStyle: {color: '#55D6F8'},
  caretStyle: {'verticalAlign': 'middle', 'color': 'grey'},
  menuStyle: {marginRight: 15},
};

References.propTypes = {
  buttonStyle: PropTypes.object,
  caretStyle: PropTypes.object,
  menuStyle: PropTypes.object,
};

export default References;
