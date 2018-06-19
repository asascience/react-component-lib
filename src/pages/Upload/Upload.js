import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeStep,
        fileWasUploaded,
        fileUploadStateChanged,
        changeProjectName} from 'redux/actions/Actions.js';
import {datasetChosen} from 'utils/general/fetchDataset.js';
import {updateCSRFToken} from 'utils/security/securityUtilities.js';
import {modifyTableBodyHeight} from 'utils/DOM/DomManipulation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropbox from 'containers/Dropbox/Dropbox';
import AutocompleteDataset from 'containers/SearchTool/SearchTool';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import './Upload.css';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import SessionExpiredModal from 'components/SessionExpiredModal/SessionExpiredModal';
import {muiTheme} from '../../theme.js';
import history from '../../history';


/**
 * Upload page component used as the starting point for all data flows
 */
class GenericUploadPage extends Component {
  /**
  * @prop {boolean} loading - whether a dataset is currently being uploaded to run the spinner
  * @prop {boolean} error - whether there has been an error uploading
  * @prop {string} modalHeading - the heading text to be displayed in the error modal
  * @prop {string} modalContent - the main content text of the error modal
  * @prop {number} authRetries - the number of attempts to authenticate the user
  */

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      openModal: false,
      modalHeading: '',
      modalContent: '',
      sessionExpiredModalOpen: false,
      authRetries: 0,
      uploadResponse: '',
      duplicateUpload: false,
    };

    this.pmagentURL = process.env.REACT_APP_PMAGENT_AUTH_IP;
    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.uploadErrorHandler = this.uploadErrorHandler.bind(this);
    this.fileAddCallback = this.fileAddCallback.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }


  getAutocompleteDataset(dataset) {
    // this.props.handleDatasetChosen(dataset.id);
    datasetChosen(dataset.id);
  }

  /**
   * Set the component state to open a modal and display
   * the contents on modalHeading and modalContent
   *
   * @param {String} modalHeading - Text to show in the modal heading
   * @param {String} modalContent - Text to show in the modal body
   * @param {Object} uploadResponse - The response from the failed upload
   * @param {Boolean} duplicateUpload - Whether or not the dataset has already been uploaded
   */
  setErrorModal(modalHeading, modalContent, uploadResponse, duplicateUpload) {
    this.setState({
      loading: false,
      openModal: true,
      treebeardVisible: false,
      modalHeading: modalHeading,
      modalContent: modalContent,
      uploadResponse: uploadResponse,
      duplicateUpload: duplicateUpload,
      filePanelHeight: 300,
    });
  }

  /**
   * Controls the closing of the dialog modal
   */
  handleDialogClose() {
    this.setState({openModal: false});
  }

  // Watch the fileStatus prop and react to it accordingly.
  componentWillReceiveProps(nextProps) {
    if (this.props.fileStatus !== nextProps.fileStatus) {
      if (nextProps.fileStatus === 'success') {
        // need to keep track of steps and start at the beginning
        this.props.changeStep(0);
          history.push('/metadata_form');
        } else if (nextProps.fileStatus === 'failure') {
        let modalHeading = 'Upload Failed';
        let modalContent = 'Timeout Error. We are looking into this issue.';
        this.setErrorModal(modalHeading, modalContent);
      }
    }
  }

  componentWillMount() {
    // if the user is coming from an outside URL to the project, we need to define the project
    if (this.props.projectName === undefined) {
      sessionStorage.projectName = window.location.pathname.substr(1);
      this.props.handleProjectChange(sessionStorage.projectName);
    }

    let userLogged = this.props.csrf !== undefined && this.props.csrf !== 'logged-out'? true : false;

    if (!userLogged) {
      history.push('/login');
    } else {
      // if logged in but this.props.csrf doesnt exist then need to update it
      if (typeof(Storage) !== undefined && this.props.csrf === undefined) {
        updateCSRFToken(sessionStorage.token);
      }
      // check session storage for projectName (this is useful if the user did a page refresh while logged in)
      if (typeof(Storage) !== undefined && this.props.projectName === undefined) {
        this.props.handleProjectChange(sessionStorage.projectName);
      }
    }
  }

  /**
   * Callback for when a file is added in the dropbox to start the spinner
   */
  fileAddCallback() {
    this.setState({loading: true});
    this.props.handleFileDropped('in_progress');
  }

  /**
   * Handles the uploading of a dropped file to the server
   *
   * @param {object} file - the file object dropped into the dropbox
   * @param {string} id - the file id string for the server location
   */
  handleFileUpload(file, id) {
    const csrfToken = file.xhr.getResponseHeader('X-Csrf-Token');
    if (csrfToken) {
      updateCSRFToken(csrfToken);
    }
    // update the status from in_progress to success
    this.props.handleFileDropped('success');
    this.props.handleFileUpload(file, id);
  }

  /**
   * Handles the display of modal errors for the upload
   *
   * @param {object} file - the file object returned from the upload attempt
   * @param {object} res - the response object returned from the upload attempt
   */
  uploadErrorHandler(file, res) {
    const csrfToken = file.xhr.getResponseHeader('X-Csrf-Token');
    if (csrfToken) {
      updateCSRFToken(csrfToken);
    }
    if (file.xhr.status === 400 && file.xhr.statusText === 'Bad CSRF Token') {
      // Bad token means we're logging them out and returning to home page
      this.setState({
        sessionExpiredModalOpen: true,
      });
    } else if (file.status === 'error') {
      let modalHeading = 'Failed to load ' + file.name;
      let modalContent = '';
      let duplicateUpload = false;
      // Check if this data set has already been uploaded
      if (res.hasOwnProperty('datasets')) {
        modalContent = 'This dataset has already been uploaded. ' +
          'Click the "GO TO DATASET" button to view the dataset.';
        duplicateUpload = true;
      }
      this.setErrorModal(modalHeading, modalContent, res, duplicateUpload);
      // TODO: log error
    }
  }

  /**
   * updates the dimensions of elements on the page
   */
  updateDimensions() {
    modifyTableBodyHeight('.innerContainer', 'innerContainer', 'class', false);
  }

  componentDidUpdate() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    ['resize', 'load'].forEach(function(e) {
      window.removeEventListener(e, this.updateDimensions, false);
    }, this);
  }

  render() {
    // prevent component from rendering is the user isn't logged in
    let userLogged = this.props.csrf !== undefined && this.props.csrf !== 'logged-out'? true : false;
    if (!userLogged) {
      return null;
    }

    let files = '.nc,.nc3,.nc4,.grib';
    let icons = ['.nc', '.nc3', '.nc4', '.grib'];


    // Actions for the duplicate dataset warning dialog.
    let actions = [
      <RaisedButton
        label="Ok"
        backgroundColor="#e6e6e6"
        onClick={this.handleDialogClose}
        style={{marginRight: 20}}
      />,
      <RaisedButton
        label="Go To Dataset"
        backgroundColor="#1D8BDD"
        onClick={(e) => {this.getAutocompleteDataset({id: this.state.uploadResponse.datasets[0]});}}
      />,
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {this.state.loading && <LoadingSpinner onCancel={()=>{this.setState({loading: false})}}/>}
          <div ref='testtest'>
            <AutocompleteDataset
              requestDataset={(dataset) => this.getAutocompleteDataset(dataset)}
              placeholder='&#xf002; Search for an existing dataset'
            />
          </div>
          <h1 style={{margin: '0px auto 5px'}}>or...</h1>
          <Dropbox
            useFiles={files}
            useIcons={icons}
            onFileAdd={this.fileAddCallback}
            onUpload={(file, res)=>{
              this.handleFileUpload(file, res.id);
            }}
            onError={this.uploadErrorHandler}
            dropBoxRef={(el) => this.dropBox = el}
          />
          <Dialog
            title='Data Upload Tool'
            open={this.state.openModal}
            actions={actions}
            onRequestClose={this.handleDialogClose}
          >
            <p><b>{this.state.modalHeading}</b></p>
            <p>{this.state.modalContent}</p>
          </Dialog>
          {this.state.sessionExpiredModalOpen &&
            <SessionExpiredModal />
          }
          <div className="footerSpecial" style={{position: 'fixed', bottom: 0, left: 0, right: 0}}></div>
        </div>
      </MuiThemeProvider>
    );
  }
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.dataType - specifies the type of the data (i.e. 'Gridded Model' or 'Survey')
 * @return {string} props.fileStatus - the current status of the file upload attempt
 * @return {string} props.csrf - the csrf token
 * @return {string} props.projectName - the project name
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    dataType: state.flowData.type,
    fileStatus: state.flowData.fileStatus,
    csrf: state.flowData.csrf,
    projectName: state.flowData.projectName,
  };
};

 /**
 * @typedef {function} changeStep
 * @global
 * @description Handles the updating of the application step (where you are in the app)
 * @param {number} step - a number represent the step
 */
/**
 * @typedef {function} handleDatasetChosen
 * @global
 * @description Handles the selection of a dataset from the search dropdown
 * @param {number} id - the unique identifier of the selected dataset
 */
/**
 * @typedef {function} handleFileUpload
 * @global
 * @description Handles the upload of a file dropped into the dropbox
 * @param {object} file - the file object returned by the dropbox
 * @param {string} uuid - the unique identifier of the file space on the server
 */
/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {changeStep}
 * @return {handleDatasetChosen}
 * @return {handleFileUpload}
 * @return {handleProjectChange}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    changeStep: (step) => {
      dispatch(changeStep(step));
    },
    handleDatasetChosen: (id) => {
      dispatch(datasetChosen(id));
    },
    handleFileDropped: (status) => {
      dispatch(fileUploadStateChanged(status));
    },
    handleFileUpload: (file, uuid, url) =>{
      dispatch(fileWasUploaded(file, uuid, url));
    },
    handleProjectChange: (serviceName) =>{
      dispatch(changeProjectName(serviceName));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenericUploadPage);