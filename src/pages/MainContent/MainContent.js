import React, {Component} from 'react';
import {connect} from 'react-redux';
import {csrfUpdated, changeStep, metadataChange, variablesChange} from 'redux/actions/Actions.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PaginationController from 'containers/PaginationController/PaginationController';
import MetadataFormStep from 'containers/Metadata/Metadata';
import VariablesFormStep from 'containers/Variables/Variables';
import SummaryFormStep from 'containers/Summary/Summary';
import SessionExpiredModal from 'components/SessionExpiredModal/SessionExpiredModal';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import FlowFooter from 'containers/FlowFooter/FlowFooter';
import {muiTheme} from '../../theme.js';


/**
 * Gridded model form page wrapper component
 */
class MainContent extends Component {
  /**
   * @param {object} props - the props passed to the component
   * @param {number} props.step - the step index
   * @param {string} props.csrf - the csrf token
   * @param {object} props.metadata_orig - the original metadata
   * @param {object} props.metadata - the present metadata
   * @param {object} props.variables_orig - the original variable data
   * @param {object} props.variables - the present variable data
   * @param {boolean} props.sessionExpired - is the session expired or not
   */

  constructor(props) {
    super(props);

    this.state = {
      saveDisabled: true,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;
    this.updateSaveState=this.updateSaveState.bind(this);
    this.checkRequiredFields=this.checkRequiredFields.bind(this);
    this.updateMetadata=this.updateMetadata.bind(this);
    this.updateVariabledata=this.updateVariabledata.bind(this);
    this.handleUndoClick=this.handleUndoClick.bind(this);
    this.parseTabData=this.parseTabData.bind(this);
  }

  /*
   * Update the state of the save button
   *
   * @param {boolean} boolVal - enable or disable save button
   *
   */
  updateSaveState(boolVal) {
    this.setState({'saveDisabled': boolVal});
  }

  /**
  * function called when data is edited in one of the 'metadata' tabs
  *
  * @param {string} tabName - the name of the tab (i.e. 'General', 'Attribution', 'Data Extents')
  * @param {object} pathInJson - an object with this shape {tab: "General", field: "title"}
  * @param {string} newValue - the new value of the metadata
  */
  updateMetadata(propKey, newValue) {

    // TODO: check for logged in
    if (true) {
      this.updateSaveState(false);
    }

    this.props.handleMetadataUpdate(propKey, newValue);
  }

  /**
  * function called when data is edited in the 'variables' tab
  * @param {string} tabName - the name of the tab (i.e. 'Variables')
  * @param {object} pathInJson - an object with this shape {rowIndex: 1, field: "Units"}
  * @param {string} newValue - the new value of the variable data
  */
  updateVariabledata(pathInJson, newValue) {
    // TODO: check for logged in
    if (true) {
      this.updateSaveState(false);
    }
    this.props.handleVariabledataUpdate(pathInJson, newValue);
  }

  /*
   * Check if required fields are filled in. Input can be this.props.metadata or some subset
   *
   * @param {object} jsonData - metadata for particular data upload
   *
   * @return {boolean} - true if all required fields are filled in else return false
   */
 checkRequiredFields(jsonData) {
    let tab;
    for (tab in jsonData) {
      for (let i = 0; i < Object.keys(jsonData[tab]).length; i++) {
        let fieldName = Object.keys(jsonData[tab])[i];
        let field = jsonData[tab][fieldName];
        if (field['ui:severity'] === 'required' && field['ui:value'].trim().length === 0) {
          return false;
        }
      }
    }
    return true;
  }

  /*
   * Undo all local changes to a specific tab
   *
   * @param {string} tabName - the name of the tab (General, Attribution, Data Extents, Variables)
   * @param {string} formType - the form type (metadata or variables)
   *
   * @return {function} - actions are dispatched to revert fields back to their original value
   */
  handleUndoClick(tabName, formType) {
    let newValue = null;
    let propKey, varKey, subVarKey;

    let parseTabDataOrig = this.parseTabData(tabName,this.props.metadata_orig);
    let parseTabDataNew = this.parseTabData(tabName, this.props.metadata);

    if (formType === 'metadata') {
      // find the difference between orig and updated (loop through and update)
      for (propKey in parseTabDataNew) {
        if (parseTabDataNew[propKey]['ui:value'] !== parseTabDataOrig[propKey]['ui:value']) {
          newValue = parseTabDataOrig[propKey]['ui:value'];
          this.updateMetadata(propKey, newValue);
        }
      }
    } else if (formType === 'variables') {
      // find the difference between orig and updated (loop through and update)
      let variableArrayOrig = this.props.variables_orig;
      let variableArrayNew = this.props.variables;

      for (varKey in variableArrayNew) {
        let varObjectNew = variableArrayNew[varKey];
        let varObjectOrig = variableArrayOrig[varKey];
        for (subVarKey in varObjectNew) {
          if (varObjectNew[subVarKey] !== varObjectOrig[subVarKey]) {
            let pathInJson = {variableName: varKey, field: subVarKey}
            let newValue = varObjectOrig[subVarKey];
            this.updateVariabledata(pathInJson, newValue)
          }
        }
      }
    } else {
      // PLACEHOLDER FOR NOW
      console.log('invalid formType!');
    }
  }

  /**
  * Parse specific fields based on their category
  *
  * @pararm {string} categoryName - the category (i.e. 'General', 'Attribution', 'Data Extents')
  * @param {object} data - an object containing the data to be parsed
  * @return {object} groupedOutput - the pruned data object
  */

  parseTabData(categoryName, data) {
    let groupedOutput = {};
    let prop;
    for (prop in data) {
      if (data[prop]['ui:category'].toLowerCase() === categoryName.toLowerCase()) {
        groupedOutput[prop] = data[prop];
      }
    }
    return groupedOutput;
  }

  render() {
    let footerStyle = {position: 'fixed', bottom: 0, left: 0, right: 0};

    let dataArray = [
      {
        tabName: 'General',
        dataType: 'metadata',
        footerType: 'allButtons'
      },
      {
        tabName: 'Attribution',
        dataType: 'metadata',
        footerType: 'allButtons'
      },
      {
        tabName: 'Data Extents',
        dataType: 'metadata',
        footerType: 'allButtons'
      },
      {
        tabName: 'Variables',
        dataType: 'variables',
        footerType: 'allButtons'
      },
      {
        tabName: 'Summary',
        dataType: 'summary',
        footerType: 'submit'
      },
    ]

    let PaginationData = dataArray.map((tab, index) => {

      let validated = true;
      let content;
      
      if (tab.dataType === 'metadata') {
        validated = this.checkRequiredFields({[tab['tabName']]: this.parseTabData(tab['tabName'], this.props.metadata)}) || false;
        content = (
         <MetadataFormStep
          saveDisabled={this.state.saveDisabled}
          updateSaveState={this.updateSaveState}
          jsonData={{[tab['tabName']]: this.parseTabData(tab['tabName'], this.props.metadata)}}
          handleTextUpdate ={this.updateMetadata}
          stepIndex={index}
        />
        );
      } else if (tab.dataType === 'variables') {
        content = (
         <VariablesFormStep
            saveDisabled={this.state.saveDisabled}
            updateSaveState={this.updateSaveState}
            jsonData={this.props.variables}
            handleTextUpdate ={this.updateVariabledata}
            stepIndex={index}
          />
        );
      } else {
         content = (
          <SummaryFormStep
            stepIndex={index}
            formComplete={this.checkRequiredFields(this.props.metadata)}
          />
        )
      }

      let footer = (
        <FlowFooter 
          footerStyle={tab.footerType}
          updateSaveState={this.updateSaveState}
          saveDisabled={this.state.saveDisabled}
          saveType={tab.dataType}
          contentPage={tab.tabName}
          onUndoClick = {this.handleUndoClick}
          style={footerStyle}
        />
      );
      
      let outputElement = {
        title: tab.tabName,
        validated: validated,
        content: content,
        footer: footer,

      }
      return outputElement
    }, this);

    // TODO: integrate this.props.sessionExpired
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="wrapper">
          <BreadCrumbs projectName={this.props.projectName} path={this.props.location.pathname} />
          <PaginationController steps={PaginationData} stepIndex={this.props.step || 0}/>
          {false && <SessionExpiredModal />}
        </div>
      </MuiThemeProvider>
    );
  }
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {object} props.metadata - the shared metadata reference across all pages
 * @return {object} props.variables - the shared variables reference across all pages
 */
const mapStateToProps = (state, ownProps)=>{
    return {
      projectName: state.flowData.projectName,
      step: state.flowData.step,
      csrf: state.flowData.csrf,
      metadata_orig: state.metadata.original,
      metadata: state.metadata.content,
      variables_orig: state.variables.original,
      variables: state.variables.content,
      sessionExpired: state.flowData.sessionExpired,
    };
};

/**
 * @typedef {function} handlecsrfUpdate
 * @global
 * @description Handles the updating of the csrf token returned upon authentication
 * @param {string} csrf - the new csrf token returned from the server
 */

 /**
 * @typedef {function} handleMetadataUpdate
 * @global
 * @description Handles the updating of metadata
 * @param {string} tabName - the name of the tab (i.e. 'General', 'Attribution', 'Data Extents')
 * @param {string} propKey - the key of the acdd property being updated
 * @param {string} newValue - the new value of the metadata
 */

/**
 * @typedef {function} handleVariabledataUpdate
 * @global
 * @description Handles the updating of variable data (found under the Variables tab)
 * @param {string} tabName - the name of the tab (i.e. 'Variables')
 * @param {object} pathInJson - an object with this shape {rowIndex: 1, field: "Units"}
 * @param {string} newValue - the new value of the variable data
 */

 /**
 * @typedef {function} changeStep
 * @global
 * @description Handles the updating of the application step (where you are in the app)
 * @param {number} step - a number represent the step
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handlecsrfUpdate}
 * @return {handleMetadataUpdate}
 * @return {handleVariableDataUpdate}
 * @return {changeStep}
 */

const mapDispatchToProps = (dispatch)=>{
  return {
    handlecsrfUpdate: (csrf) => {
      dispatch(csrfUpdated(csrf));
    },
    handleMetadataUpdate: (propKey, newValue) => {
      dispatch(metadataChange(propKey, newValue));
    },
    handleVariabledataUpdate: (pathInJson, newValue) =>{
      dispatch(variablesChange(pathInJson.variableName, pathInJson.field, newValue));
    },
    changeStep: (step) => {
      dispatch(changeStep(step));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
