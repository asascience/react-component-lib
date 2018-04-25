import React, {Component} from 'react';
import {connect} from 'react-redux';
import {metadataChange,
        saveData,
        loadFromTemplate} from 'data-upload-connector';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import TabbedView from '../../components/TabbedView/TabbedView';
import {SessionExpiredModal} from '../../components/Modal/Modal';
import AutocompleteDataset from '../../components/SearchTool/SearchTool';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Stepper page component used to render a table of survey metadata fields
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 */
class SurveyMetadataFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {function} props.handleBackOut - callback to return to home page
   * @param {function} props.handleNextClick - callback to move to next page
   * @param {object} props.history - redux location manager passed in from parent container
   */
  constructor(props) {
    super(props);

    this.state = {
      templateModalOpen: false,
      sessionExpiredModalOpen: false,
      selectedDataset: {},
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.handleSelectDataset = this.handleSelectDataset.bind(this);
  }

  /**
   * Handles text updates in the metadata form
   *
   * @param {string} tabName - the name of the tab the update occurs in
   * @param {object} pathInJson: -the json path to the edited data - contains rowIndex and field keys
   * @param {string} newValue - the value typed in the field
   */
  handleTextUpdate(tabName, pathInJson, newValue) {
    if (this.props.saveDisabled) {
      let saveDisabled = false;
      this.props.updateSaveState(saveDisabled);
    }

    this.props.handleTextUpdate(tabName, pathInJson, newValue);
  }

  /**
   * Handles when the footer back button is clicked and returns to previous page/home page
   */
  handleBackButtonClick() {
    if (this.props.jwt) {
      if (this.props.stepIndex === 0) {
        this.props.handleBackOut();
      } else {
        this.props.handleBackButtonClick();
      }
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
    let key = Object.keys(this.props.metadata)[0];
    // this.props.handleSaveData(this.props.metadata, this.props.json, 'metadata', this.props.uuid);
    this.props.handleSaveData(this.props.metadata[key], null, 'survey', this.props.uuid);
  }

  /**
   * Handles when the footer save button is clicked and calls handleSave()
   */
  handleSaveClick() {
    if (this.props.jwt) {
      this.handleSave();
      this.props.updateSaveState(true);
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
   * Handles when a dataset is selected from the dropdown to load data from
   *
   * @param {object} dataset - the dataset object containing an id that will be accessed
   */
  handleSelectDataset(dataset) {
    this.setState({
      selectedDataset: dataset,
      templateModalOpen: true,
    });
  }

  /**
   * Handles when the cancel button is pressed on the template modal
   */
  cancelTemplate() {
    this.setState({
      templateModalOpen: false,
      selectedDataset: {},
    });
  }

  /**
   * Handles when the OK button is pressed on the template modal
   */
  fetchTemplate() {
    this.props.handleLoadFromTemplate(this.state.selectedDataset.id);
    this.setState({
      templateModalOpen: false,
      selectedDataset: {},
    });
  }

  render() {
    const flowFooterProps = {
      saveDisabled: this.props.saveDisabled,
      uuid: this.props.uuid,
      onBackButtonClick: this.handleBackButtonClick,
      onSaveClick: this.handleSaveClick,
      onNextButtonClick: this.handleNextClick,
      footerStyle: 'survey',
    };

    const discoveryStyle = {
      margin: '5px auto',
      textAlign: 'center',
    };

    const titleStyle = {
      fontWeight: 'normal',
      textAlign: 'left',
    };

    const actions = [
      <RaisedButton
        label='Cancel'
        primary={true}
        onTouchTap={this.cancelTemplate}
        style={{marginRight: '10px'}}
      />,
      <RaisedButton
        label="Ok"
        primary={true}
        onTouchTap={this.fetchTemplate}
      />,
    ];

    const combinedProps={...flowFooterProps, ...this.props};
    return (
      <div>
        <div className='innerContainer' style={{paddingBottom: '60px'}}>
          <div style={discoveryStyle}>
            <h1 style={titleStyle}>Survey Metadata</h1>
          </div>
          <div className='loadFromContainer'>
            <AutocompleteDataset
              requestDataset={(dataset) => this.handleSelectDataset(dataset)}
              placeholder='&#xf002; Load metadata from template'
              buttonTitle="Select Template"
            />
          </div>
          <div className='jsonContainer'>
            <TabbedView jsonData={this.props.metadata}
                        tableType={'survey'}
                        height={'500px'}
                        onTextUpdate={
                          (tabName, pathInJson, newValue) =>
                          this.handleTextUpdate(tabName, pathInJson, newValue)
                        }
            />
          </div>
          <Dialog
            title='Confirm Load from Template'
            open={this.state.templateModalOpen}
            actions={actions}
            modal={true}
          >
            <p><b>Are you sure you want to load from {
              this.state.selectedDataset.title ?
              this.state.selectedDataset.title :
              this.state.selectedDataset.id
            }?</b></p>
            <p>Doing so will overwrite your current metadata.</p>
          </Dialog>
          {this.state.sessionExpiredModalOpen &&
            <SessionExpiredModal
              {...combinedProps}
            />
          }
        </div>
        <div className="footer" style={{position: 'fixed', bottom: '0px', width: '100%'}}>
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
 * @return {object} props.metadata - the shared metadata reference across all pages
 * @return {string} props.dataType - specifies the type of the data (i.e. 'Gridded Model' or 'Survey')
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {string} props.jwt - the jwt key passed back on server save calls
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    metadata: state.metadata.content,
    dataType: state.flowData.type,
    uuid: state.flowData.uuid,
    jwt: state.flowData.jwt,
  };
};

/**
 * @typedef {function} handleTextUpdate
 * @global
 * @description Handles the changing of redux state on text field update
 * @param {string} tabName - the name of the tab containing the edited field
 * @param {object} pathInJson - object describing the path in original json to the field, contains rowIndex and field keys
 * @param {string} newValue - the edited value of the field
 */

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
 * @return {handleTextUpdate}
 * @return {handleSaveData}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    handleTextUpdate: (tabName, pathInJson, newValue)=>{
      dispatch(metadataChange(tabName, pathInJson.rowIndex, pathInJson.field, newValue));
    },
    handleSaveData: (newData, originalData, dataType, id)=>{
      dispatch(saveData(newData, originalData, dataType, id));
    },
    handleLoadFromTemplate: (uuid) => {
      dispatch(loadFromTemplate(uuid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyMetadataFormStep);
