import React, {Component} from 'react';
import {connect} from 'react-redux';
import SurveyCSVTable from '../../components/SurveyCSVTable/SurveyCSVTable';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import RaisedButton from 'material-ui/RaisedButton';
import DialogModal, {SessionExpiredModal} from '../../components/Modal/Modal';

/**
 * Stepper page component used to select x/y/z variable fields for survey csv data
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 * @prop {Array} variableSelections - array containing the x/y/z or null selection for each variable
 * @prop {boolean} showModal - whether the warning modal is showing
 */
class SurveyCSVSelectionFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {object} props.selectedColumns - tracks the indices of the selected x/y/z columns
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {function} props.handleNextClick - callback to move to next page
   * @param {function} props.clearAll - callback to clear all variable selections
   * @param {function} props.updateVariableSelection - callback to update a variable selection
   * @param {object} props.history - redux location manager passed in from parent container
   */
  constructor(props) {
    super(props);

    let variableSelections = [];
    for (let i = 0; i < this.props.csv.survey['_csv_content'][0].length; i++) {
      variableSelections[i] = null;
    }

    this.state={
      saveDisabled: true,
      variableSelections: variableSelections,
      showModal: false,
      sessionExpiredModalOpen: false,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  /**
   * Handles when the footer back button is clicked
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
   * Handles when the footer next button is clicked and advances to summary if variables are selected
   */
  handleNextClick() {
    if (this.props.jwt) {
      if (this.props.selectedColumns.x != null &&
          this.props.selectedColumns.y != null &&
          this.props.selectedColumns.z != null &&
          (Object.keys(this.props.selectedColumns).indexOf('id') === -1 || this.props.selectedColumns.id !== null)) {
        this.props.handleNextClick();
      } else {
        this.setState({
          showModal: true,
        });
      }
    } else {
      this.setState({
        sessionExpiredModalOpen: true,
      });
    }
  }

  /**
   * Handles when a new variable selection is made and calls props function to update parent state
   *
   * @param {number} index - the column index of the edited variable in the csv table
   * @param {string} key - the string value (x, y, or z) of the selected variable, or null if cleared
   */
  handleVariableChange(index, key) {
    let varStates = this.state.variableSelections;
    varStates[index] = key;
    this.props.updateVariableSelection(index, key);
    this.setState({
      variableSelections: varStates,
      showModal: false,
    });
  }

  /**
   * Clears all current variable selections in the csv table
   */
  clearAll() {
    let variableSelections = [];
    for (let i = 0; i < this.props.csv.survey['_csv_content'][0].length; i++) {
      variableSelections[i] = null;
    }
    this.props.clearAll();
    this.setState({
      variableSelections: variableSelections,
    });
  }

  render() {
    const flowFooterProps = {
      onBackButtonClick: this.handleBackButtonClick,
      uuid: this.props.uuid,
      saveDisabled: this.state.saveDisabled,
      onNextButtonClick: this.handleNextClick,
      footerStyle: 'pagingOnly',
    };

    // create a combinedProps object to pass down to the child (FlowFooter)
    const combinedProps={...flowFooterProps, ...this.props};
    let csvTable = this.props.csv ? <SurveyCSVTable
      csvData={this.props.csv.survey['_csv_content']}
      handleVariableChange={(i, key) => this.handleVariableChange(i, key)}
      selectedColumns={this.props.selectedColumns}
      variableSelections={this.state.variableSelections}
    /> : <h3>No data to display</h3>;
    return (
      <div>
        <div className='innerContainer' style={{paddingBottom: '60px'}}>
          <h1>Survey CSV Selection</h1>
          <h4>{'Choose the variables for ' + (Object.keys(this.props.selectedColumns).indexOf('id') === -1 ? '' : 'Profile ID (id), ') + 'longitude (x), latitude (y), and elevation (z)'}</h4>
          <RaisedButton
            label='Clear All'
            primary={true}
            onTouchTap={this.clearAll}
            style={{width: '40%', marginLeft: '30%'}}
          />
          <div className='jsonContainer'>
            {csvTable}
          </div>
        </div>
        {this.state.showModal &&
          <DialogModal
            title='Invalid Input'
            content={'You must select ' + (Object.keys(this.props.selectedColumns).indexOf('id') === -1 ? '' : 'id, ') + 'x, y, and z variables to advance.'}
          />
        }
        {this.state.sessionExpiredModalOpen &&
          <SessionExpiredModal
            {...combinedProps}
          />
        }
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
 * @return {string} props.jwt - the jwt key passed back on server save calls
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    csv: state.flowData.csvFragment,
    uuid: state.flowData.uuid,
    jwt: state.flowData.jwt,
  };
};

export default connect(mapStateToProps, null)(SurveyCSVSelectionFormStep);
