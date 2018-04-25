import React, {Component} from 'react';
import {connect} from 'react-redux';
import VariablesCSVTable from '../../components/VariablesIdTable/VariablesCSVTable';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import {SessionExpiredModal} from '../../components/Modal/Modal';
import {saveData, variablesPopulated, variablesChange} from 'data-upload-connector';
import clone from 'clone';

/**
 * Stepper page component used to fill in variable fields for the csv data
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 * @prop {Array.<Object>} variableMetadata - array containing the variable metadata objects
 */
class VariablesIdentificationFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {object} props.selectedColumns - tracks the indices of the selected time columns
   * @param {string} props.timezone - the short text value of the selected timezone string
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {function} props.handleNextClick - callback to move to next page
   * @param {object} props.history - redux location manager passed in from parent container
   * @param {string} props.headerRows - the number of specified header rows in the csv
   */
  constructor(props) {
    super(props);

    this.getSelectedTimeColumns = this.getSelectedTimeColumns.bind(this);
    this.getTimeKeyForSelectedIndex = this.getTimeKeyForSelectedIndex.bind(this);
    let selectedColumns = this.getSelectedTimeColumns(this.props.selectedColumns);

    let variableMetadata = [];
    if (this.props.csv && this.props.csv.timeseries) {
      for (let i = 0; i < this.props.csv.timeseries['_csv_content'][0].length; i++) {
        variableMetadata[i] = {
          enabled: true,
          columnNumber: i,
          name: '',
          standard_name: '',
          long_name: '',
          short_name: '',
          fill_value: '',
          units: '',
          comment: '',
          isTimeVar: false,
          _dimensions: ['time'],
        };
        if (selectedColumns.includes(i)) {
          variableMetadata[i].isTimeVar = true;
          variableMetadata[i].name = this.getTimeKeyForSelectedIndex(this.props.selectedColumns, i);
          variableMetadata[i]['standard_name'] = 'time';
          variableMetadata[i]['_tz'] = this.props.timezone;
          variableMetadata[i]['_type'] = 'datetime';
        }
      }
    }

    let storeVariables = {};
    variableMetadata.forEach((object, index)=>{
      storeVariables['field' + index] = Object.keys(object).map((key)=>{
        return {
          'Variable Name': key,
          'value': object[key],
        };
      });
    });

    // Populate the variables.
    this.props.handlePopulateVariables(storeVariables);

    this.state = {
      saveDisabled: true,
      variableMetadata: variableMetadata,
      sessionExpiredModalOpen: false,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveClick=this.handleSaveClick.bind(this);
    this.handleNextClick=this.handleNextClick.bind(this);
    this.handleSaveVariable = this.handleSaveVariable.bind(this);
    this.handleEnableVariable = this.handleEnableVariable.bind(this);
  }

  /**
   * Handles saving the variable metadata when a modal save button is clicked
   *
   * @param {number} index - the column index of the saved variable in the csv table
   * @param {object} newData: -the formatted object populated in the variable modal
   */
  handleSaveVariable(index, newData) {
    let varStates = this.state.variableMetadata;

    Object.keys(newData).forEach((key, i)=>{
      if(key !== 'enabled' && key !== 'columnNumber' && key !== 'isTimeVar') {
        this.props.handleChangeVariables('field' + index, i, 'value', newData[key]);
      }
    });

    varStates[index] = newData;
    this.setState({
      variableMetadata: varStates,
      saveDisabled: false,
    });
  }

  /**
   * Handles enabling/disabling a variable column when a column checkbox is selected
   *
   * @param {number} index: the index of the column that will be enabled/disabled
   * @param {boolean} isEnabled: the current state of the checkbox (checked is true)
   */
  handleEnableVariable(index, isEnabled) {
    let varStates = this.state.variableMetadata;
    varStates[index].enabled = isEnabled;
    this.setState({
      variableMetadata: varStates,
      saveDisabled: false,
    });
  }

  /**
   * Handles when the footer back button is clicked and returns to previous page/home page
   */
  handleBackButtonClick() {
    if (this.props.jwt) {
      this.props.handleBackButtonClick();
    } else {
      this.setState({
        sessionExpiredModalOpen: true,
      });
    }
  }

  /**
   * Handles posting data to the server on save
   */
  handleSave() {
    let originalJson = clone(this.props.json);
    originalJson.doc.csv.timeseries['_csv_headerlines'] = this.props.headerRows;
    originalJson.doc.csv.timeseries['_csv_timezone'] = this.props.timezone;
    this.props.handleSaveData(this.state.variableMetadata, originalJson, 'variables_id', this.props.uuid);
  }

  /**
   * Handles when the footer save button is clicked and calls handleSave()
   */
  handleSaveClick() {
    if (this.props.jwt) {
      this.handleSave();

      this.setState({
        saveDisabled: true,
      });
    } else {
      this.setState({
        sessionExpiredModalOpen: true,
      });
    }
  }

  /**
   * Handles when the footer next button is clicked and calls handleSave() if there are outstanding edits
   */
  handleNextClick() {
    if (this.props.jwt) {
      if (!this.state.saveDisabled) {
        this.handleSave();
      }

      this.props.handleNextClick();
    } else {
      this.setState({
        sessionExpiredModalOpen: true,
      });
    }
  }

  /**
   * Returns an array of the column indices that are designated as time values
   *
   * @param {array} timeColumns - the columns object passed in from the parent
   *
   * @return {array} - the indices of the time columns
   */
  getSelectedTimeColumns(timeColumns) {
    let indexArray = [];
    Object.keys(timeColumns).forEach((key)=>{
      if (timeColumns[key] !== null) {
        indexArray.push(timeColumns[key]);
      }
    });
    return indexArray;
  }

  /**
   * Returns the key associated with a specific time column index
   *
   * @param {array} timeColumns - the columns object passed in from the parent
   * @param {number} index - the index of the selected column
   *
   * @return {string} - the time key for the selected column
   */
  getTimeKeyForSelectedIndex(timeColumns, index) {
    let timeKey;
    Object.keys(timeColumns).forEach((key)=>{
      if (timeColumns[key] === index) {
        timeKey = key;
      }
    });
    return timeKey;
  }

  render() {
    const flowFooterProps = {
      onBackButtonClick: this.handleBackButtonClick,
      uuid: this.props.uuid,
      saveDisabled: this.state.saveDisabled,
      onSaveClick: this.handleSaveClick,
      onNextButtonClick: this.handleNextClick,
      footerStyle: 'allButtons',
    };

    // create a combinedProps object to pass down to the child (FlowFooter)
    const combinedProps={...flowFooterProps, ...this.props};
    let csvTable = this.props.csv ? <VariablesCSVTable
      csvData={this.props.csv.timeseries['_csv_content']}
      variableMetadata={this.state.variableMetadata}
      handleSaveVariable={(i, newData) => this.handleSaveVariable(i, newData)}
      handleEnableVariable={(i, isEnabled) => this.handleEnableVariable(i, isEnabled)}
    /> : <h3>No data to display</h3>;
    return (
      <div>
        <div className='innerContainer' style={{paddingBottom: '60px'}}>
          <h1>Variable Identification</h1>
          <h3>Click the EDIT button to describe the variable.</h3>
          <h3>Use the checkbox to skip columns.</h3>
          <div className='jsonContainer'>
            {csvTable}
          </div>
          {this.state.sessionExpiredModalOpen &&
            <SessionExpiredModal
              {...combinedProps}
            />
          }
        </div>
        <div className='footer' style={{position: 'fixed', bottom: '0px', width: '100%'}}>
          <FlowFooter
            {...combinedProps}
          />
        </div>
      </div>
    );
  }
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {Array.<Array.<string>>} props.csv - the raw csv 2d array to be displayed in the table
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {object} props.json - the full json object returned by the server
 * @return {string} props.jwt - the jwt key passed back on server save calls
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    csv: state.flowData.csvFragment,
    uuid: state.flowData.uuid,
    json: state.flowData.json,
    jwt: state.flowData.jwt,
  };
};

/**
 * @typedef {function} handleSaveData
 * @global
 * @description Handles the posting of the data to the server on save
 * @param {object} newData - the new edited data used in the UI
 * @param {object} originalData - the original json object used to populate the pages
 * @param {string} dataType - describes the data type, i.e. 'metadata' or 'variables'
 * @param {string} id - the unique identifier of the dataset for server calls
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleSaveData}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    handleSaveData: (newData, originalData, dataType, id)=>{
      dispatch(saveData(newData, originalData, dataType, id));
    },
    handlePopulateVariables: (variableData)=>{
      dispatch(variablesPopulated(variableData));
    },
    handleChangeVariables: (tabName, rowIndex, fieldName, value)=>{
      dispatch(variablesChange(tabName, rowIndex, fieldName, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariablesIdentificationFormStep);
