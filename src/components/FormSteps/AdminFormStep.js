import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ncmlChange, dimensionChange, cfExtensionChange, saveData} from 'data-upload-connector';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import {modifyTableBodyHeight} from '../../helpers/DomManipulation';
import {CustomRadioButtons, RadioButton} from '../../components/CustomRadioButtons/CustomRadioButtons';

const styles = {
  outerContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  },
  radioContainerBlock: {
    maxWidth: 350,
    border: '0.5px solid rgb(204, 204, 204)',
    padding: '0px 20px ',
    margin: '10px',
    display: 'inline-block',
  },
  radioButton: {
    marginBottom: 16,
  },
  adminCard: {
    'borderRadius': '2px',
    'margin': '10px',
    'width': '80%',
    'overflow': 'hidden',
    'WebkitBoxShadow': 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
    'boxShadow': 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px}}',
  },
  headerBackground: {
    width: '100%',
    height: '48px',
    backgroundColor: 'rgb(0, 48, 135)',
    margin: 0,
  },
  header: {
    display: 'inline',
    color: '#fff',
    height: '48px',
    textAlign: 'center',
    lineHeight: '48px',
  },
  groupContainer: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    'maxHeight': 250,
    'overflowX': 'hidden',
    'overflowY': 'auto',
  },
  container: {
    'display': 'flex',
    'justifyContent': 'center',
  },
};

class NCMLRadioButtonGroup extends React.Component {
  render() {
    let dropDown;
    // If the join existing option is chosen.
    if(this.props.dimensionsOptions) {
      let disabled = this.props.value !== 'join_existing';
      let options = this.props.dimensionsOptions.map((option,index)=>{
        return (<MenuItem key={index} value={option} primaryText={option} />);
      });

      dropDown = (
        <div style={{textAlign: 'left'}}>
          <div style={{fontSize: '17px', marginLeft: '20px', color: disabled ? 'rgb(204, 204, 204)' : '#000'}}>Select Dimension:</div>
          <DropDownMenu
            style={{position: 'relative', top: '-10px'}}
            value={this.props.dimensionValue}
            disabled={disabled}
            onChange={this.props.dimensionUpdate}
          >
            {options}
          </DropDownMenu>
        </div>
      );
    }

    return (
      <div style={styles.radioContainerBlock}>
        <h4 style={{margin: '30px 0 10px 0'}}>{this.props.title}</h4>
        <div style={{'display': 'flex', 'flexFlow': 'row nowrap'}}>
          <div style={{margin: '15px 0 0 0'}}>
            <CustomRadioButtons onChange = {this.props.NCMLRadioUpdate} selectedButton={this.props.value} id={this.props.id}>
              <RadioButton value={"join_existing"} label={"Join Existing"} toolTip="The dataset will be aggregated along an existing dimension, as specified from the dropdown."/>
              <RadioButton value={"union"} label="Union" toolTip="The union of all the dimensions, attributes, and variables in multiple NetCDF files."/>
            </CustomRadioButtons>
          </div>
          <div>
            {dropDown}
          </div>
        </div> 
      </div>
    );
  }
}

class CFRadioButtonGroup extends React.Component {
  render() {
    return (
      <div style={styles.radioContainerBlock}>
        <h4>{this.props.title}</h4>
        <CustomRadioButtons onChange = {this.props.CFRadioUpdate} selectedButton={this.props.value} id={this.props.id}>
          <RadioButton value={"ugrid"} label={"UGRID"} toolTip="Unstructured (or flexible mesh) model data"/>
          <RadioButton value={"sgrid"} label="SGRID" toolTip="Staggered data on structured grids"/>
          <RadioButton value="none" label="None" style={styles.radioButton}/>
        </CustomRadioButtons>
      </div>
    );
  }
}


class AdminFormStep extends Component {
  constructor(props) {
    super(props);

    let dimensionsOptions;
    let firstDimension;
    if (this.props.json.doc.cf.dimensions) {
      dimensionsOptions = this.props.json.doc.cf.dimensions;
      firstDimension = dimensionsOptions[0];
    }

    let cfExtension;
    let keywords = this.props.keywords.toLowerCase().split(',');

    if (this.props.cfExtension) {
      cfExtension = this.props.cfExtension;
    } else {
      if (keywords.indexOf('ugrid') > -1) {
        cfExtension = 'ugrid';
      } else if (keywords.indexOf('sgrid') > -1) {
        cfExtension = 'sgrid';
      } else {
        cfExtension = 'none'; // default case
      }
    }

    // TODO: move dimensionDisabled out of state and decide this in render
    this.state={
      ncml: this.props.ncmlType || 'join_existing',
      cf: cfExtension,
      dim: this.props.dimension || firstDimension,
      dimOptions: dimensionsOptions,
      dimensionDisabled: false,
      saveDisabled: true,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleNCMLRadioUpdate = this.handleNCMLRadioUpdate.bind(this);
    this.handleCFRadioUpdate = this.handleCFRadioUpdate.bind(this);
    this.handleDimensionUpdate = this.handleDimensionUpdate.bind(this);
  }

  updateDimensions() {
    modifyTableBodyHeight('#innerAdminContent', 'innerAdminContent', 'id', false);
  }


  handleNCMLRadioUpdate(value) {
    this.setState((prevState, props) => {
      let outputObj = {ncml: value, saveDisabled: false}
      if (value === 'join_existing') {
        outputObj['dimensionDisabled'] = false;
      } else {
        outputObj['dimensionDisabled'] = true;
      }
      return outputObj
    });
    this.props.ncmlChange(value);
  }

  handleDimensionUpdate(event, index, value) {
    this.setState((prevState, props) => ({
      dim: value, saveDisabled: false,
    }));
    this.props.dimensionChange(value);
  }

  handleCFRadioUpdate(value) {
    this.setState((prevState, props) => ({
      cf: value, saveDisabled: false,
    }));
    this.props.cfExtensionChange(value);
  }

  handleSaveClick() {
    let ncml,cf,dim=this.state.dim;
    if (this.state.ncml === 'join_existing') {
      ncml = {
        join_existing: dim,
        union: false,
      };
    } else {
      ncml = {
        join_existing: '',
        union: true,
      };
    }

    cf = {
      extensions: {grid: this.state.cf},
    };

    let adminDataStruct = {
      ncml: ncml,
      dimensions: dim,
      cf: cf,
    };

    if (this.props.jwt && this.props.jwt !== 'logged-out') {
      this.setState({saveDisabled: true});
      this.props.saveData(adminDataStruct, null, 'admin', this.props.uuid);
    } else {
      this.setState({
        sessionExpiredModalOpen: true,
      });
    }
  }

  componentDidMount() {
    ['resize', 'load'].forEach(function(e) {
      window.addEventListener(e, this.updateDimensions, false);
    },this)
    this.updateDimensions();
  }

  componentDidUpdate() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    ['resize', 'load'].forEach(function(e) {
      window.removeEventListener(e, this.updateDimensions, false);
    },this)
  }

  render() {
    // TODO: the onNextButtonClick should save the data
    const flowFooterProps = {
      saveDisabled: this.state.saveDisabled,
      onBackButtonClick: this.props.handleBackButtonClick,
      onNextButtonClick: (()=>{
        this.props.handleSaveClick();
        this.props.handleNextClick();
      }),
      onSaveClick: this.handleSaveClick,
      footerStyle: 'admin',
    };

    let uuid = this.props.uuid;
    const combinedProps={uuid, ...flowFooterProps};

    return(
      <div style={styles.container}>
        <div style={styles.adminCard}>
          <div style={styles.headerBackground}>
            <div style={styles.header}>Admin Settings</div>
          </div>
          <div id ="innerAdminContent" style={styles.groupContainer}>
            <NCMLRadioButtonGroup
              id={'ncml'}
              value={this.state.ncml}
              title={'NCML'}
              NCMLRadioUpdate={this.handleNCMLRadioUpdate}
              dimensionUpdate={this.handleDimensionUpdate}
              dimensionsOptions={this.state.dimOptions}
              dimensionValue={this.state.dim}
            />
            <CFRadioButtonGroup
              id={'cf'}
              value={this.state.cf}
              title={'CF Extension'}
              CFRadioUpdate={this.handleCFRadioUpdate}
            />
          </div>
          <div className="footer" style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
            <FlowFooter
              {...combinedProps}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {object} props.uuid - the dataset uuid
 * @return {object} props.variables - the shared variables reference across all pages
 */
const mapStateToProps = (state, ownProps)=>{
    return {
      uuid: state.flowData.uuid,
      jwt: state.flowData.jwt,
      keywords: state.metadata.content['General']['keywords']['name'],
      ncmlType: state.flowData.ncmlType,
      dimension: state.flowData.dimension,
      cfExtension: state.flowData.cfExtension,
      json: state.flowData.json,
    };
};

/**
 * @typedef {function} handleJWTUpdate
 * @global
 * @description Handles the updating of the JWT token returned upon authentication
 * @param {string} jwt - the new jwt token returned from the server
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {ncmlChange}
 * @return {dimensionChange}
 * @return {cfExtensionChange}
 */


const mapDispatchToProps = (dispatch)=>{
  return {
    ncmlChange: (ncmlType) => {
      dispatch(ncmlChange(ncmlType));
    },
    dimensionChange: (dimension) => {
      dispatch(dimensionChange(dimension));
    },
    cfExtensionChange: (cfExtension) => {
      dispatch(cfExtensionChange(cfExtension));
    },
    saveData: (newData, originalData, dataType, id)=>{
      dispatch(saveData(newData, originalData, dataType, id));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AdminFormStep);

