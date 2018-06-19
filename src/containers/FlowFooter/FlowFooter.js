import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FTPManager from 'utils/general/FTPManager.js';
import {dataSubmitted, changeStep, updateSaveStatus} from 'redux/actions/Actions.js';
import {saveData} from 'utils/general/fetchDataset.js';
import {updateCSRFToken, uploadAxiosPromise} from 'utils/security/securityUtilities.js';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CheckedSubmit from 'components/SubmitButton/SubmitButton';
import Dialog from 'material-ui/Dialog';
import {muiTheme} from '../../theme.js';
import history from '../../history';
import DatasetComparisonModal from 'containers/DatasetComparisonModal/DatasetComparisonModal';


/**
 * Common footer component used across the entire app
 */
class FlowFooter extends Component {
  /**
   * @param {object} props - the props passed to the component
   * @param {number} props.step - the step index of the present page
   * @param {object} props.metadata - the shared metadata reference across all pages
   * @param {object} props.variables- the shared variable data reference across all pages
   * @param {string} props.uuid - the unique identifier of the dataset used for server calls
   * @param {object} props.json - the full json object returned by the server
   * @param {string} props.csrf - the csrf key passed back on server save calls
   * @param {string} props.footerStyle - string such as 'allButtons' or 'pagingOnly' describing the footer style
   * @param {boolean} props.saveDisabled - whether the save button is currently disabled
   * @param {string} props.saveType - the save type (one of ['metadata','variables'])
   * @param {object} prop.saveStatus - object with keys status, code, message
   * @param {string} props.contentPage - the name of the table (i.e. 'General', 'Data Extents', 'Attribution', 'Variables')
   * @param {function} props.onUndoClick - called when clicking on the the undo button that undoes all changes to a particular table
   * @param {style} props.style - style of the flowflooter
   */
  constructor(props) {
    super(props);

    this.state={
      downloadKey: 'Yaml',
      undoModalOpen: false,
      comparisonModalOpen: false,
      submitClicked: false,
      saveStatusModalOpen: false,
      statusDialogOpen: false,
      statusDialogTitle: '',
      statusDialogHeading: '',
      statusDialogContent: '',
      statusDialogOnClose: undefined,
    };

    // Main server
    this.localApiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;


    // Fetch the user's FTP credentials to display later if requested.
    let self = this;
    self.ftpTitle = 'FTP Credentials';
    FTPManager.getFTPCredentials(this.localApiUrl, this.props.uuid, this.props.jwt, (err, res)=>{
      // Create a list of the key value pairs to show in the Dom.
      let ftpDOM = Object.keys(res).map((key, index)=>{
        return (<p key={index}><b>{key}: </b>{res[key]}</p>);
      });
      self.ftpContent = (<span>{ftpDOM}</span>);
    });


    this.handleFTPDialogOpen = this.handleFTPDialogOpen.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleUndoClick = this.handleUndoClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
    this.handleUndoClose = this.handleUndoClose.bind(this);
    this.undoFormChanges = this.undoFormChanges.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.showStatusDialog = this.showStatusDialog.bind(this);
    this.changeSaveStatus = this.changeSaveStatus.bind(this);
  }


  // Track when the save status prop changes in order to show a dialog about it.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.saveStatus !== this.props.saveStatus) {
      let saveStatus = this.props.saveStatus ? this.props.saveStatus.status : 'pending';
      let saveStatusMessage = this.props.saveStatus ? this.props.saveStatus.message +
      ' (status code: ' + this.props.saveStatus.code + ')' : '';

      if (saveStatus === 'fail') {
        this.showStatusDialog('Save Result', 'Failed To Save Data.', saveStatusMessage, this.changeSaveStatus);
      } else if (saveStatus === 'success') {
        this.showStatusDialog('Save Result', 'Your submission has succeeded!');
      }
    }
  }

  /**
   * Handles when the footer next button is clicked and calls handleSave() if there are outstanding edits
   */
  handleNextClick() {
    // increment the step
    let presentStep = this.props.step;
    this.props.changeStep(presentStep+1);
  }

  /**
   * Handles when the footer back button is clicked and returns to previous page/home page
   */
  handleBackClick() {
    if (this.props.csrf !== undefined && this.props.csrf !== 'logged-out') {
      if (this.props.step === 0) {
        history.push('/');
      } else {
        // decrement the step
        let presentStep = this.props.step;
        this.props.changeStep(presentStep-1);
      }
    }
  }

  /**
   * Handles when the footer save button is clicked and dispatches updates to the redux store and backend
   */
  handleSaveClick() {
     if (this.props.csrf !== undefined && this.props.csrf !== 'logged-out') {
       this.setState({comparisonModalOpen: true});
     }
   }

  handleSave() {
    this.setState({comparisonModalOpen: false});
    if (this.props.csrf !== undefined && this.props.csrf !== 'logged-out') {
      // Attempt to save the data, and alert the user to the result.
      let data = {metadata: this.props.metadata, variables: this.props.variables};
      saveData(data, this.props.json, 'all', this.props.uuid);
      this.props.updateSaveState(true);
      this.props.updateSaveState(true);
    }
  }

  // Show a modal with the corresponding text to the user
  showStatusDialog(title, heading, content, onClose) {
    // Function to reset the dialog's status when the dialog is closed.
    const onCloseFunction = ()=>{
      onClose && onClose();
      this.setState({
        statusDialogOpen: false,
        statusDialogTitle: '',
        statusDialogHeading: '',
        statusDialogContent: '',
      });
    };
    this.setState({
      statusDialogOpen: true,
      statusDialogTitle: title,
      statusDialogHeading: heading,
      statusDialogContent: content,
      statusDialogOnClose: onCloseFunction,
    });
  }

  /**
   * Function that is called when user clicks on undo button. It updates state so the undo modal is shown.
   */
  handleUndoClick() {
    this.setState({undoModalOpen: true});
    this.showStatusDialog('', '', 'Are you sure you want to undo all changes to this form?', this.handleUndoClose);
  }

  /**
   * Function that is called when user closes the undo modal
   */
  handleUndoClose() {
    this.setState({undoModalOpen: false});
  }

  /**
   * Function that is called when a user clicks "OK" in the undo modal
   */
  undoFormChanges() {
    this.props.onUndoClick(this.props.contentPage, this.props.saveType);
    this.handleUndoClose();
  }


  /**
   * Controls the opening of the dialog modal
   */
  handleFTPDialogOpen() {
    this.showStatusDialog(this.ftpTitle, undefined, this.ftpContent);
  }

  /**
   * Handles clicking on the buttons of the export dropdown menu
   * @paramater {event} e - synthetic event
   */
  handleDownloadClick(e) {
    const fileType = e.target.attributes.getNamedItem('data-type').value;
    FTPManager.downloadFTP(process.env.REACT_APP_UPLOAD_SERVER_IP, this.props.uuid, fileType, this.props.csrf,
     (err, res)=>{
      if (err) {
        console.error(err);
      }
    });
  }

  /**
   * Handles dispatching an action to update the "save" status
   */
  changeSaveStatus() {
    this.props.handleUpdateSaveStatus({status: 'pending', code: '', message: ''});
  };

  /**
   * Handles when the footer submit button is clicked and gets data from the appropriate server(s)
   */
  handleSubmitClick() {
    let self = this;

    this.props.handleFinalSubmit({submit: true});


    /* Clicking the submit button doesn't post any data. it starts a get request
    * that indicates to the backend that the dataset should be moved to the THREDDS server
    */
    let url = this.localApiUrl + '/' + this.props.uuid + '/submit/';
    let axiosCall = uploadAxiosPromise(url);

    axiosCall.then(function(res) {
      updateCSRFToken(res.request);
      if (res.status === 200) {
        let modalDOM = (<p key={0} display='block'>
          <a href={res.url}
            target='_blank'
            rel='noopener noreferrer'
            style={{color: '#0645AD'}}
          >{'Access your data on the THREDDS server'}</a>
        </p>);

        self.showStatusDialog('Submission Results', 'Your submission has succeeded!', modalDOM);
      } else {
        self.showStatusDialog('Submission Results', 'There was a problem with your submission.');
      }
    });

    axiosCall.catch(function(error) {
      updateCSRFToken(error.request);
      self.showStatusDialog('Submission Results', 'There was a server error. Please try again later');
    });
  }

  render() {
    const divStyle = {
      position: 'relative',
      padding: 10,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
      WebkitFlexFlow: 'row nowrap',
      justifyContent: 'space-around',
      background: '#0093b2',
      borderRadius: '2px',
    };

    const backStyle = {
      alignSelf: 'flex-start',
    };

    const nextStyle = {
      alignSelf: 'flex-end',
    };

    const linkStyle = {
      padding: '10px',
      cursor: 'pointer',
    };

    const downloadStyle = this.props.footerStyle === 'allButtons' ? {marginRight: 5} : {marginRight: 0};

    const buttonBackgroundColor = '#FFFFFF';

    // Common buttons to follow DRY
    const backButton = (
      <RaisedButton
        backgroundColor={buttonBackgroundColor}
        style={backStyle}
        onClick={this.handleBackClick}
        disabled={this.props.backPath === null}
      >
        <i className='fa fa-backward' aria-hidden='true'></i>&nbsp;Back
      </RaisedButton>
    );

    const nextButton = (
      <RaisedButton
        backgroundColor={buttonBackgroundColor}
        style={nextStyle}
        onClick={this.handleNextClick}
        disabled={false}
      >
        Next&nbsp;<i className='fa fa-forward' aria-hidden='true'></i>
      </RaisedButton>
    );

    const submitButton = (
      <RaisedButton
        backgroundColor={buttonBackgroundColor}
        onClick={this.handleSubmitClick}
        disabled={this.state.submitClicked}
      >
        <CheckedSubmit submitted={this.props.submitClicked}/>
      </RaisedButton>
    );

    const downloadButton = (
      <IconMenu
        iconButtonElement={<RaisedButton label="FTP" />}
        style={downloadStyle}
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <a style={linkStyle} onClick={this.handleFTPDialogOpen}>View</a>
          <a style={linkStyle} onClick={this.handleDownloadClick}
            data-download-name="FTP_Python"
            data-type="python"
            data-extension=".py"
          >Python</a>
          <a style={linkStyle} onClick={this.handleDownloadClick}
            data-download-name="Shell_Script"
            data-type="shell"
            data-extension=".sh"
          >Shell</a>
        </div>
      </IconMenu>
    );

    const saveButton = (
      <RaisedButton
        backgroundColor={buttonBackgroundColor}
        onClick={this.handleSaveClick}
        disabled={this.props.saveDisabled}
        style={{marginRight: 5}}
      >
        <i className='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;Save
      </RaisedButton>
    );

    let footerContent;

    switch (this.props.footerStyle) {
      case 'allButtons':
        footerContent = [
          backButton,
          (<div id="FlowFooterInner">
            {downloadButton}
            {saveButton}
            <RaisedButton
              backgroundColor={buttonBackgroundColor}
              onClick={this.handleUndoClick}
              disabled={false}
            >
            <i className='fa fa-undo' aria-hidden='true'></i>&nbsp;Undo
            </RaisedButton>
          </div>),
          nextButton,
        ];
        break;
      case 'admin':
        footerContent = [
          backButton,
          (<div id="FlowFooterInner">
            {downloadButton}
            {saveButton},
          </div>),
          nextButton,
        ];
        break;
      case 'survey':
        footerContent = [
          backButton,
          (<div id="FlowFooterInner">
            {saveButton}
          </div>),
          nextButton,
        ];
        break;
      case 'pagingOnly':
        footerContent = [backButton, nextButton];
        break;
      case 'submit':
        footerContent = [backButton, downloadButton, submitButton];
        break;
      case 'surveySubmit':
       footerContent = [backButton, submitButton];
       break;
    }

    // Different actions for undo modal.
    let actions;
    if (this.state.undoModalOpen) {
      actions = [
        <RaisedButton
          label="Yes"
          primary={true}
          style={{marginRight: 12}}
          onClick={this.undoFormChanges}
        />,
        <RaisedButton
          label="Cancel"
          onClick={this.handleUndoClose}
        />,
      ];
    } else {
      actions = [
        <RaisedButton
          label="Ok"
          backgroundColor="#e6e6e6"
          onClick={()=>{
            this.setState({statusDialogOpen: false});
          }}
          style={{marginRight: 20}}
        />,
      ];
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={this.props.style} className='footer'>
          <div style={divStyle}>
            {footerContent}
          </div>
          <DatasetComparisonModal
              open={this.state.comparisonModalOpen}
              onDecline={()=>{
                this.setState({comparisonModalOpen: false});
              }}
              onSave={this.handleSave}
          />
          <Dialog
            title={this.state.statusDialogTitle}
            open={this.state.statusDialogOpen}
            actions={actions}
            onRequestClose={this.state.statusDialogOnClose}
          >
            <p><b>{this.state.statusDialogHeading}</b></p>
            <br/>
            <div>{this.state.statusDialogContent}</div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

FlowFooter.propTypes = {
  step: PropTypes.number,
  metadata: PropTypes.object,
  variables: PropTypes.object,
  uuid: PropTypes.string,
  json: PropTypes.object,
  csrf: PropTypes.string,
  footerStyle: PropTypes.string,
  saveDisabled: PropTypes.bool,
  saveType: PropTypes.string,
  saveStatus: PropTypes.object,
  contentPage: PropTypes.string,
  onUndoClick: PropTypes.func,
  style: PropTypes.object,
};


/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {number} props.step - the step index of the present page
 * @return {object} props.metadata - the shared metadata reference across all pages
 * @return {object} props.variables- the shared variable data reference across all pages
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {object} props.json - the full json object returned by the server
 * @return {string} props.csrf - the csrf key passed back on server save calls
 * @return {string} props.saveStatus - the save status ('success', 'fail', 'pending')
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    step: state.flowData.step,
    metadata: state.metadata.content,
    metaDataChanges: state.metadata.changes,
    variableChanges: state.variables.changes,
    variables: state.variables.content,
    uuid: state.flowData.uuid,
    json: state.flowData.json,
    csrf: state.flowData.csrf,
    saveStatus: state.flowData.saveStatus,
  };
};


 /**
 * @typedef {function} changeStep
 * @global
 * @description Manages where the user is inside of the app (each page has a different step index)
 * @param {Number} step - an integer detailing what step the user is on.. i.e 0,1,2,3...
 */

  /**
 * @typedef {function} handleUpdateSaveStatus
 * @global
 * @description dispatches a save status update
 * @param {object} statusObj - object with the shape {status: 'pending', code: '', message: ''}
 */

 /**
 * @typedef {function} handleFinalSubmit
 * @global
 * @description dispatches a submit button clicked action to the upload connector
 * @param {object} submitted - object with the shape {submit: true}
 */

 /**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleSaveData}
 * @return {handleUpdateSaveStatus}
 * @return {changeStep}
 */

const mapDispatchToProps = (dispatch)=>{
  return {
    changeStep: (step) => {
      dispatch(changeStep(step));
    },
    handleUpdateSaveStatus: (statusObj) => {
      dispatch(updateSaveStatus(statusObj));
    },
    handleFinalSubmit: (submitted)=>{
      dispatch(dataSubmitted(submitted));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(FlowFooter);
