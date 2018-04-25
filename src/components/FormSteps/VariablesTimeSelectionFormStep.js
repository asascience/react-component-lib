import React, {Component} from 'react';
import {connect} from 'react-redux';
import VariablesTimeTable from '../../components/VariablesTimeTable/VariablesTimeTable';
import VariablesTimeTypeRadioButtons from '../../components/VariablesTimeTable/VariablesTimeTypeRadioButtons';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import RaisedButton from 'material-ui/RaisedButton';
import DialogModal, {SessionExpiredModal} from '../../components/Modal/Modal';
import TimezonePicker from '../../components/TimezonePicker/TimezonePicker';
import TextField from 'material-ui/TextField';

/**
 * Stepper page component used to select variable time columns for timeseries csv data
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 * @prop {Array} timeSelections - array containing the current time column selection for each variable
 * @prop {boolean} showModal - whether the warning modal is showing
 * @prop {string} modalText - the warning text to be shown in the modal
 */
class VariablesTimeSelectionFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {number} props.timeType - 1 (date+time), 2 (date, time), or 3 (at least three of y, m, d, h, m, s)
   * @param {object} props.selectedColumns - tracks the indices of the selected time columns
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {function} props.handleNextClick - callback to move to next page
   * @param {function} props.clearAll - callback to clear all variable selections
   * @param {function} props.handleTimeChange - callback to update a time selection
   * @param {object} props.history - redux location manager passed in from parent container
   */
  constructor(props) {
    super(props);

    let timeSelections = [];
    for (let i = 0; i < this.props.csv.survey['_csv_content'][0].length; i++) {
      timeSelections[i] = null;
    }
    if (this.props.selectedColumns) {
      if (this.props.timeType === 1) {
        timeSelections[this.props.selectedColumns.datetime] = 'Date + Time';
      } else if (this.props.timeType === 2) {
        timeSelections[this.props.selectedColumns.date] = 'Date';
        timeSelections[this.props.selectedColumns.time] = 'Time';
      } else if (this.props.timeType === 3) {
        timeSelections[this.props.selectedColumns.year] = 'Years';
        timeSelections[this.props.selectedColumns.month] = 'Months';
        timeSelections[this.props.selectedColumns.day] = 'Days';
        timeSelections[this.props.selectedColumns.hour] = 'Hours';
        timeSelections[this.props.selectedColumns.min] = 'Minutes';
        timeSelections[this.props.selectedColumns.sec] = 'Seconds';
      }
    }
    this.state={
      saveDisabled: true,
      timeSelections: timeSelections,
      showModal: false,
      modalText: '',
      sessionExpiredModalOpen: false,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
    this.handleNextClick=this.handleNextClick.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.getTransformedKey = this.getTransformedKey.bind(this);
    this.handleChangeTimeType = this.handleChangeTimeType.bind(this);
    this.shouldDisableNext = this.shouldDisableNext.bind(this);
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
   * Checks if the next button should be disabled based off of the time selections
   * Also handles the display of the text in the error modal
   * If timeType is 0 (unspecified), disable
   * If timeType is 1 Column, Date+Time must be specified
   * If timeType is 2 Columns, Date and Time columns must be specified
   * If timeType is 3+ Columns, at least three of Y/M/D/H/M/S must be specified
   *
   * @return {boolean} - whether the summary and variables selection should be disabled
   */
  shouldDisableNext() {
    if (this.props.timeType === 0) {
      this.setState({
        modalText: 'You must specify a time type for your variables',
      });
      return true;
    } else if (this.props.timeType === 1) {
      if (this.props.selectedColumns.datetime !== null) {
        return false;
      }
      this.setState({
        modalText: 'You must specify a Date + Time column to advance',
      });
      return true;
    } else if (this.props.timeType === 2) {
      if (this.props.selectedColumns.date === null || this.props.selectedColumns.time === null) {
        this.setState({
          modalText: 'You must specify both Date and Time columns to advance',
        });
        return true;
      } else {
        return false;
      }
    } else if (this.props.timeType === 3) {
      let colCount = 0;
      if (this.props.selectedColumns.year !== null) {
        colCount++;
      }
      if (this.props.selectedColumns.month !== null) {
        colCount++;
      }
      if (this.props.selectedColumns.day !== null) {
        colCount++;
      }
      if (this.props.selectedColumns.hour !== null) {
        colCount++;
      }
      if (this.props.selectedColumns.minute !== null) {
        colCount++;
      }
      if (this.props.selectedColumns.second !== null) {
        colCount++;
      }
      if (colCount >= 3) {
        return false;
      } else {
        this.setState({
          modalText: 'You must specify at least three out of Years, Months, Days, Hours, Minutes, Seconds to advance',
        });
        return true;
      }
    }
  }

  /**
   * Handles when the footer next button is clicked and advances to summary if variables are selected
   */
  handleNextClick() {
    if (this.props.jwt) {
      if (!this.shouldDisableNext()) {
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
   * Handles when a new time selection is made and calls props function to update parent state
   *
   * @param {number} index - the column index of the edited variable in the csv table
   * @param {string} key - the string value (x, y, or z) of the selected variable, or null if cleared
   */
  handleTimeChange(index, key) {
    let timeStates = this.state.timeSelections;
    timeStates[index] = key;
    let transformedKey = this.getTransformedKey(key);
    this.props.updateTimeSelection(index, transformedKey);
    this.setState({
      timeSelections: timeStates,
      showModal: false,
    });
  }

  /**
   * Handles when the variable time type is changes by the radio button selector and clears selections
   *
   * @param {string} button - the value of the radio button selected (1, 2, or 3)
   */
  handleChangeTimeType(button) {
    let newTimeType = 0;
    if (button === '1') {
      newTimeType = 1;
    } else if (button === '2') {
      newTimeType = 2;
    } else if (button === '3') {
      newTimeType = 3;
    }
    if (newTimeType !== this.props.timeType) {
      this.clearAll();
      this.props.handleChangeTimeType(newTimeType);
    }
    this.setState({
      showModal: false,
    });
  }

  /**
   * Returns the timeSelections object key associated with a formatted time value
   *
   * @param {string} key - the verbose time key
   *
   * @return {string} - the transformed key for the timeSelections object
   */
  getTransformedKey(key) {
    switch (key) {
      case 'Date + Time': return 'datetime';
      case 'Date': return 'date';
      case 'Time': return 'time';
      case 'Years': return 'year';
      case 'Months': return 'month';
      case 'Days': return 'day';
      case 'Hours': return 'hour';
      case 'Minutes': return 'min';
      case 'Seconds': return 'sec';
      default: return null;
    }
  }

  /**
   * Clears all current variable selections in the csv table
   */
  clearAll() {
    let timeSelections = [];
    for (let i = 0; i < this.props.csv.timeseries['_csv_content'][0].length; i++) {
      timeSelections[i] = null;
    }
    this.props.clearAll();
    this.setState({
      timeSelections: timeSelections,
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
    let csvTable = this.props.csv ? <VariablesTimeTable
      csvData={this.props.csv.timeseries['_csv_content']}
      handleTimeChange={(i, key) => this.handleTimeChange(i, key)}
      selectedColumns={this.props.selectedColumns}
      timeSelections={this.state.timeSelections}
      timeType={this.props.timeType}
      headerRows={this.props.headerRows}
    /> : <h3>No data to display</h3>;
    return (
      <div>
        <div className='innerContainer' style={{paddingBottom: '60px'}}>
          <h2>Time Variable Description</h2>
          <div style={{display: 'flex', width: '70%', marginLeft: '15%'}}>
            <h5 style={{marginRight: '10px', marginBottom: '5px'}}>Select the timezone:</h5>
            <TimezonePicker
              handleChangeTimezone={(timezone) => this.props.handleChangeTimezone(timezone)}
              value={this.props.timezone}
            />
          </div>
          <div style={{display: 'flex', width: '70%', marginLeft: '15%'}}>
            <h5 style={{marginRight: '10px', marginBottom: '5px'}}>Enter the number of header rows in your csv:</h5>
            <TextField
              value={this.props.headerRows}
              type='number'
              min={0}
              max={this.props.csv.timeseries['_csv_content'].length-1}
              onChange={(e, newValue) => this.props.handleChangeHeaderRows(newValue)}
            />
          </div>
          <h5>Choose the the time format for your data, then specify the columns with time data</h5>
          <VariablesTimeTypeRadioButtons
            onChangeTimeType={(button) => this.handleChangeTimeType(button)}
            selected={this.props.timeType}
          />
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
        {this.state.sessionExpiredModalOpen &&
          <SessionExpiredModal
            {...combinedProps}
          />
        }
        {this.state.showModal &&
          <DialogModal
            title='Invalid Input'
            content={this.state.modalText}
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

export default connect(mapStateToProps, null)(VariablesTimeSelectionFormStep);
