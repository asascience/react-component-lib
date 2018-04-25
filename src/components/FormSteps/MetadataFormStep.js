import React, {Component} from 'react';
import {connect} from 'react-redux';
import {metadataChange,
        saveData,
        loadFromTemplate} from 'data-upload-connector';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import TabbedView from '../../components/TabbedView/TabbedView';
import AutocompleteDataset from '../../components/SearchTool/SearchTool';
import {modifyTableBodyHeight} from '../../helpers/DomManipulation';
import {SessionExpiredModal} from '../../components/Modal/Modal';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Stepper page component used to render a table of ACDD metadata fields
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 * @prop {boolean} templateModalOpen - controls the opening and closing of the confirm template selection modal
 * @prop {Object} selectedDataset - the object representing the dataset selected in the template field
 */
class MetadataFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {object} props.jsonData - the json data object to be rendered in the table
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {function} props.handleBackOut - callback to return to home page
   * @param {function} props.handleNextClick - callback to move to next page
   * @param {object} props.history - redux location manager passed in from parent container
   */
  constructor(props) {
    super(props);

    this.state={
      templateModalOpen: false,
      sessionExpiredModalOpen: false,
      undoModalOpen: false,
      selectedDataset: {},
      tableHeight: 200,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
    this.handleSave=this.handleSave.bind(this);
    this.handleSaveClick=this.handleSaveClick.bind(this);
    this.handleRevertClick=this.handleRevertClick.bind(this);
    this.undoFormChanges=this.undoFormChanges.bind(this);
    this.handleDialogClose=this.handleDialogClose.bind(this);
    this.handleNextClick=this.handleNextClick.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.handleSelectDataset = this.handleSelectDataset.bind(this);
    this.cancelTemplate = this.cancelTemplate.bind(this);
    this.fetchTemplate = this.fetchTemplate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.formatTabViewJSON = this.formatTabViewJSON.bind(this)
  }


  /**
   * Handles text updates in the metadata form
   *
   * @param {string} tabName - the name of the tab the update occurs in
   * @param {object} pathInJson: the json path to the edited data and contains rowIndex and field keys
   * @param {string} newValue - the value typed in the field
   */
  handleTextUpdate(tabName, pathInJson, newValue) {
    if (this.props.saveDisabled) {
      let saveDisabled = false;
      this.props.updateSaveState(saveDisabled);
    }

    this.props.handleTextUpdate(tabName, pathInJson, newValue);
  }

  formatTabViewJSON(json) {
    let transformedJSON = {};
    Object.keys(json).forEach((tabName)=>{
      transformedJSON[tabName] = json[tabName];
      let transformedContent = Object.keys(json[tabName]).map((key)=>{
        let rowObject = json[tabName][key];
        return [
          {
            text: rowObject.fieldName,
            fieldType: 'textBox',
            disabled: rowObject.disabled !== undefined ? rowObject.disabled : true,
            hidden: rowObject.hidden !== undefined ? rowObject.hidden : false,
            description: rowObject.description,
          },
          {
            text: rowObject.name,
            fieldType: rowObject.fieldType,
            severity: rowObject.severity,
            pathInJson: {tab: tabName, field: rowObject.fieldName},
            options: rowObject.options,
          },
        ];
      });
      transformedJSON[tabName] = {header: [{text: 'Field Name'}, {text: 'Value'}], content: transformedContent};
    });

    return transformedJSON;
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
    this.props.handleSaveData(this.props.metadata, this.props.json, 'metadata', this.props.uuid);
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
   * Handles the case where the form undo modal "Cancel" button is clicked
   */
  handleDialogClose() {
    this.setState({undoModalOpen: false});
  };


  /**
   * Opens the form undo modal
   */
  handleRevertClick() {
    this.setState({undoModalOpen: true});
  }

  /**
   * Undo all changes to a particular form
   */
  undoFormChanges() {
    this.setState({undoModalOpen: false});

    let tabName = Object.keys(this.props.jsonData)[0];
    let newValue = null;
    let pathInJson = null;
    let key;

    // find the difference between orig and updated (loop through and update using handleTextUpdate)
    for (key in this.props.metadata[tabName]) {
      if (this.props.metadata[tabName][key]['name'] !== this.props.metadata_orig[tabName][key]['name']) {
        pathInJson = {tab: tabName, field: key};
        newValue = this.props.metadata_orig[tabName][key]['name'];
        this.handleTextUpdate(tabName, pathInJson, newValue);
      }
    }
  }

  /**
   * Handles when the footer next button is clicked and calls handleSave() if there are outstanding edits
   */
  handleNextClick() {
    if (this.props.jwt) {
      if (!this.props.saveDisabled) {
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
    this.props.handleLoadFromTemplate(this.state.selectedDataset.id, true);
    this.setState({
      templateModalOpen: false,
      selectedDataset: {},
    });
  }

  updateDimensions() {
    modifyTableBodyHeight('td', 'div', 'tag', true);
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
    const flowFooterProps = {
      saveDisabled: this.props.saveDisabled,
      uuid: this.props.uuid,
      onBackButtonClick: this.handleBackButtonClick,
      onSaveClick: this.handleSaveClick,
      onRevertClick: this.handleRevertClick,
      onNextButtonClick: this.handleNextClick,
      footerStyle: 'allButtons',
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

    const undoActions = [
      <RaisedButton
        label="Yes"
        primary={true}
        style={{marginRight: 12}}
        onClick={this.undoFormChanges}
      />,
      <RaisedButton
        label="Cancel"
        onClick={this.handleDialogClose}
      />
    ];

    const combinedProps={...flowFooterProps, ...this.props};
    return (
      <div>
          <div className='loadFromContainer'>
            <AutocompleteDataset
              requestDataset={(dataset) => this.handleSelectDataset(dataset)}
              placeholder='&#xf002; Load metadata from template'
              buttonTitle="Select Template"
            />
          </div>
          <div className='data-tab'>
            <TabbedView jsonData={this.formatTabViewJSON(this.props.jsonData)}
                        tableType={'acdd'}
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
          <Dialog
            actions={undoActions}
            open={this.state.undoModalOpen}
            onRequestClose={this.handleDialogClose}
            modal={false}
          >
          Are you sure you want to undo all changes to this form?
        </Dialog>
          {this.state.sessionExpiredModalOpen &&
            <SessionExpiredModal
              {...combinedProps}
            />
          }

        <div className="footer" style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
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
 * @return {object} props.json - the full json object returned by the server
 * @return {string} props.jwt - the jwt key passed back on server save calls
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    metadata_orig: state.metadata.original,
    metadata: state.metadata.content,
    dataType: state.flowData.type,
    uuid: state.flowData.uuid,
    json: state.flowData.json,
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
 * @typedef {function} handleLoadFromTemplate
 * @global
 * @description Handles the loading of a template dataset over the original data
 * @param {string} uuid - the unique identifier of the selected dataset
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleTextUpdate}
 * @return {handleSaveData}
 * @return {handleLoadFromTemplate}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    handleTextUpdate: (tabName, pathInJson, newValue) =>{
      dispatch(metadataChange(tabName, pathInJson.field, newValue));
    },
    handleSaveData: (newData, originalData, dataType, id)=>{
      dispatch(saveData(newData, originalData, dataType, id));
    },
    handleLoadFromTemplate: (uuid, keepChangeHistory) => {
      dispatch(loadFromTemplate(uuid, keepChangeHistory));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetadataFormStep);
