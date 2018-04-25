import React, {Component} from 'react';
import {connect} from 'react-redux';
import {variablesChange, saveData} from 'data-upload-connector';
import {modifyTableBodyHeight} from '../../helpers/DomManipulation';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import TabbedView from '../../components/TabbedView/TabbedView';
import {SessionExpiredModal} from '../../components/Modal/Modal';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import standardNames from '../../helpers/autocomplete/StandardNameFiltered.js';

/**
 * Stepper page component used to render a table of CF variables fields
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 */
class VariablesFormStep extends Component {
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
      sessionExpiredModalOpen: false,
      undoModalOpen: false,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
    this.handleSave=this.handleSave.bind(this);
    this.handleSaveClick=this.handleSaveClick.bind(this);
    this.handleNextClick=this.handleNextClick.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleRevertClick=this.handleRevertClick.bind(this);
    this.undoFormChanges=this.undoFormChanges.bind(this);
    this.handleUndoClose=this.handleUndoClose.bind(this);
    this.formatTabViewJSON = this.formatTabViewJSON.bind(this);
  }

  /**
   * Handles text updates in the metadata form
   *
   * @param {string} tabName - the name of the tab the update occurs in
   * @param {object} pathInJson - the json path to the edited data - contains rowIndex and field keys
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
   * Handles the case where the form undo modal "Cancel" button is clicked
   */
  handleUndoClose() {
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

    let tabName = 'Variables';
    let variableArrayUpdated = this.props.variables[tabName];
    let variableArrayOrig = this.props.variables_orig[tabName];

    // find the difference between orig and updated (loop through and update using handleTextUpdate)
    for (let i=0; i < variableArrayOrig.length; i++) {
      let col;
      for (col in variableArrayOrig[i]) {
        if (variableArrayUpdated[i][col] !== variableArrayOrig[i][col]) {
          let pathInJson = {rowIndex: i, field: col};
          let newValue = variableArrayOrig[i][col];
          this.props.handleTextUpdate(tabName, pathInJson, newValue);
        }
      }
    }
  }

  formatTabViewJSON(json) {
    let transformedJSON = {};
    Object.keys(json).forEach((tabKey)=>{
      let tabContent = json[tabKey].map((rowObject, rowIndex)=>{
        return [
          {
            text: rowObject['Variable Name'],
            fieldType: 'textBox',
            pathInJson: {rowIndex: rowIndex, field: 'Variable Name'},
          },
          {
            text: rowObject['Units'],
            fieldType: 'textBox',
            pathInJson: {rowIndex: rowIndex, field: 'Units'},
            validated: rowObject.unitsValidated,
            validationTooltip: 'Invalid units. Units string must be recognized by UNIDATA\'s Udunits package',
          },
          {
            text: rowObject['Standard Name'],
            fieldType: 'textBox',
            pathInJson: {rowIndex: rowIndex, field: 'Standard Name'},
            options: standardNames,
            validated: rowObject.standardNameValidated,
            validationTooltip: 'Invalid standard_name. The set of permissible standard names is contained in the CF standard name table.',
          },
          {
            text: rowObject['Short Name'],
            fieldType: 'textBox',
            pathInJson: {rowIndex: rowIndex, field: 'Short Name'},
          },
          {
            text: rowObject['Long Name'],
            fieldType: 'textBox',
            pathInJson: {rowIndex: rowIndex, field: 'Long Name'},
          },
        ];
      });

      let filteredHeaders = Object.keys(json[tabKey][0]).filter((h)=> h !=='standardNameValidated' && h !== 'unitsValidated');
      let tabHeader = filteredHeaders.map((header)=>{
        // Set the reference links for the header.
        let link;
        switch(header) {
          case 'Units':
            link = 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#units';
            break;
          case 'Standard Name':
            link = 'http://cfconventions.org/Data/cf-standard-names/27/build/cf-standard-name-table.html';
            break;
          case 'Long Name':
            link = 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#long-name';
            break;
          default:
            break;
        }

        return {
          text: header,
          link: link,
        };
      });

      transformedJSON[tabKey] = {header: tabHeader, content: tabContent};
    });

    return transformedJSON;
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
    this.props.handleSaveData(this.props.variables, this.props.json, 'variables', this.props.uuid);
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
      nextDisabled: this.props.nextDisabled,
      uuid: this.props.uuid,
      onBackButtonClick: this.handleBackButtonClick,
      onRevertClick: this.handleRevertClick,
      onSaveClick: this.handleSaveClick,
      onNextButtonClick: this.handleNextClick,
      footerStyle: 'allButtons',
    };

    const undoActions = [
      <RaisedButton
        label="Yes"
        primary={true}
        style={{marginRight: 12}}
        onClick={this.undoFormChanges}
      />,
      <RaisedButton
        label="Cancel"
        onClick={this.handleUndoClose}
      />
    ];

    const combinedProps={...flowFooterProps, ...this.props};
    return (
      <div>
        <div className='data-tab'>
        <TabbedView jsonData={this.formatTabViewJSON(this.props.jsonData)}
                    tableType={'variables'}
                    headerEnabled={true}
                    onTextUpdate={
                      (tabName, pathInJson, newValue) =>
                      this.handleTextUpdate(tabName, pathInJson, newValue)
                    }
        />
        </div>
        {this.state.sessionExpiredModalOpen &&
          <SessionExpiredModal
            {...combinedProps}
          />
        }
        <Dialog
            actions={undoActions}
            open={this.state.undoModalOpen}
            onRequestClose={this.handleUndoClose}
            modal={false}
          >
          Are you sure you want to undo all changes to this form?
        </Dialog>
        <div className="footer" style={{position: 'fixed', left: 0, right: 0, bottom: 0}}>
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
 * @return {object} props.variables - the shared variables reference across all pages
 * @return {string} props.dataType - specifies the type of the data (i.e. 'Gridded Model' or 'Survey')
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {object} props.json - the full json object returned by the server
 * @return {string} props.jwt - the jwt key passed back on server save calls
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    variables_orig: state.variables.original,
    variables: state.variables.content,
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
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleTextUpdate}
 * @return {handleSaveData}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    handleTextUpdate: (tabName, pathInJson, newValue) =>{
      dispatch(variablesChange(tabName, pathInJson.rowIndex, pathInJson.field, newValue));
    },
    handleSaveData: (newData, originalData, dataType, id)=>{
      dispatch(saveData(newData, originalData, dataType, id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VariablesFormStep);
