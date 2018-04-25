import moment from 'moment';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {updateCSRFToken, uploadAjaxPromise} from '../../helpers/securityUtilities.js';
import CircularProgress from 'material-ui/CircularProgress';
import {dataSubmitted} from 'data-upload-connector';
import FlowFooter from '../../components/FlowFooter/FlowFooter';
import DataChangeReport from '../../components/DataChangeReport/DataChangeReport';
import AjaxHelper from '../../helpers/AjaxHelper';
import {modifyTableBodyHeight} from '../../helpers/DomManipulation';
import {SessionExpiredModal} from '../../components/Modal/Modal';
import DialogModal from '../../components/Modal/Modal';
/**
 * Final stepper page component used to render summary and process submit
 *
 * @prop {boolean} showSubmitModal - whether the submit results modal should be shown
 * @prop {string} submitModalHeading - the heading text to be displayed in the submit modal
 * @prop {string} submitModalContent - the main content text of the submit modal
 */
class SummaryFormStep extends Component {
  /**
   * @param {Object} props - Component properties
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {object} props.history - redux location manager passed in from parent container
   * @param {object} [props.surveyColumns] - optional object describing the survey x/y/z
   *                                         selections (only in survey flow)
   */
  constructor(props) {
    super(props);

    this.state = {
      showSubmitModal: false,
      submitModalHeading: '',
      submitModalContent: '',
      sessionExpiredModalOpen: false,
      loading: false, // Drives the use of a spinner
      // submitClicked: this.props.submitted,
    };

    // Main server
    this.localApiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;


    if (this.props.surveyType === 'dem') {
      this.surveyApiUrl = process.env.REACT_APP_SURVEY_DEM_UPLOAD_SERVER_IP;
      this.fileUploadUrl = process.env.REACT_APP_SURVEY_DEM_FILE_UPLOAD_SERVER_IP;
    } else if (this.props.surveyType === 'profile') {
      this.surveyApiUrl = process.env.REACT_APP_SURVEY_BEACH_PROFILE_UPLOAD_SERVER_IP;
      this.fileUploadUrl = process.env.REACT_APP_SURVEY_BEACH_PROFILE_FILE_UPLOAD_SERVER_IP;
    } else {
      this.surveyApiUrl = process.env.REACT_APP_SURVEY_POINT_UPLOAD_SERVER_IP;
      this.fileUploadUrl = process.env.REACT_APP_SURVEY_POINT_FILE_UPLOAD_SERVER_IP;
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.populateSurveyQuery = this.populateSurveyQuery.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
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
   * Transforms the survey metadata object into a url query string
   *
   * @param {object} metadata - the edited survey metadata passed in
   *
   * @return {string} - the query string to be used for upload
   */
  populateSurveyQuery(fileId, dataColumns, metadata) {
    let queryString = this.surveyApiUrl + '/submitJob?f=json';
    // Start by adding file ID

    if (dataColumns.id) {  // Must be a profile dataset (input zip file)
      queryString += '&Input_Zip=%7B"itemID":"' + fileId + '"%7D';
    } else {
      queryString += '&input_file=%7B"itemID":"' + fileId + '"%7D';
    }
    // Then add the survey data column info
    queryString += '&Latitude_Column=' + (dataColumns.y + 1);
    queryString += '&Longitude_Column=' + (dataColumns.x + 1);
    queryString += '&Elevation_Column=' + (dataColumns.z + 1);
    if (dataColumns.id) {
      queryString += '&Profile_ID_Column=' + (dataColumns.id + 1);
    }

    for (let i = 0; i < metadata.length; i++) {
      if (metadata[i].value.name) {
        // arcGIS service expects dates in ms since epoch
        if (metadata[i]['Variable Name'].toLowerCase().indexOf('date') > -1) {
          metadata[i].value.name = moment(metadata[i].value.name, 'YYYY-MM-DD').valueOf();
        }
        let kvString = '&' + metadata[i]['Variable Name'] + '=' + metadata[i].value.name;
        queryString += kvString;
      }
    }
    return queryString;
  }

  /**
   * Handles when the footer submit button is clicked and posts data to the appropriate server(s)
   */
  handleSubmitClick() {
    this.props.handleFinalSubmit({submit: true});
    // this.props.handleSurveyDataSubmit(this.props.file);
    this.setState({
      showSubmitModal: false,
      submitModalHeading: '',
      submitModalContent: '',
      // submitClicked: true,
    });
    // modalContent is an array of objects containing URL's to display in the modal
    let modalContent = [];
    if (this.props.dataType === 'Survey') {
      /*
        For survey datasets:
          1) Upload the file to the fileUploadUrl (POST)
          2) If successful, upload the metadata (GET)
       */

      // Turn on the spinner while we wait
      this.setState({
        loading: true,
      });
      AjaxHelper.uploadRequest(this.fileUploadUrl + '/uploads/upload', this.props.file, (res, resUrl) => {
        let parsedResponse = JSON.parse(res);
        if (parsedResponse.success && parsedResponse.item) {
          let itemId = parsedResponse.item.itemID;

          // Keep track of the file itemId to generate a URL for the user
          // let fileUrl = this.fileUploadUrl + '/uploads/' + itemId;
          // modalContent.push({
          //   link: fileUrl,
          //   title: 'Access your file upload here',
          // });

          let key = Object.keys(this.props.metadata)[0];
          let metadataUrl = this.populateSurveyQuery(itemId,
                                                     this.props.surveyColumns,
                                                     this.props.metadata[key]);

          AjaxHelper.getRequest(metadataUrl, (response) => {
            let parsedResponse = JSON.parse(response);
            let jobUrl = this.surveyApiUrl + '/jobs/' + parsedResponse.jobId + '?f=json';

            let checkStatus = () => {
              AjaxHelper.getRequest(jobUrl, (statusResponse) => {
                let parsedStatus = JSON.parse(statusResponse);
                console.log(parsedStatus);
                if (parsedStatus.jobStatus === 'esriJobSubmitted' || parsedStatus.jobStatus === 'esriJobExecuting') {
                  // wait a second and try again
                  setTimeout(checkStatus, 1000);
                } else if (parsedStatus.jobStatus === 'esriJobFailed') {
                  let jobUrl = this.surveyApiUrl + '/jobs/' + parsedResponse.jobId;
                  modalContent.push({
                    link: jobUrl,
                    title: 'View Processing Log',
                  });
                  this.setState({
                    loading: false,
                    submitModalHeading: 'Upload Failed',
                    submitModalContent: modalContent,
                    showSubmitModal: true,
                  });
                } else if (parsedStatus.jobStatus === 'esriJobSucceeded') {
                  // And another request to get the output URLs
                  let output = parsedStatus.results.Output.paramUrl;
                  let outputUrl = this.surveyApiUrl + '/jobs/' + parsedResponse.jobId + '/' + output + '?f=pjson';
                  AjaxHelper.getRequest(outputUrl, (response) => {
                    let parsedResponse = JSON.parse(response);
                    let mapUrl = parsedResponse.value.output_map_url;
                    modalContent.push({
                      link: mapUrl,
                      title: 'View data in ArcGIS Map',
                    });
                    let metadataUrl = parsedResponse.value.output_metadata_url;
                    modalContent.push({
                      link: metadataUrl,
                      title: 'View your metadata',
                    });
                    let serviceUrl = parsedResponse.value.output_service_url;
                    modalContent.push({
                      link: serviceUrl,
                      title: 'View geojson service',
                    });
                    let dataUrl = parsedResponse.value.output_data_url;
                    modalContent.push({
                      link: dataUrl,
                      title: 'View your raw data',
                    });
                    this.setState({
                      loading: false,
                      submitModalHeading: 'Success!',
                      submitModalContent: modalContent,
                      showSubmitModal: true,
                    });
                  });  // AjaxHelper.getRequest(outputUrl
                }
              });
            };
            checkStatus();
          });
        } else {
          // Error uploading file, let's report our findings to the user
          let message = 'Error uploading data\n';
          if (parsedResponse.error && parsedResponse.error.message) {
            message += parsedResponse.error.message;
          }
          this.setState({
            loading: false,
            submitModalHeading: message,
            submitModalContent: '',
            showSubmitModal: true,
          });
          return;
        }
      });
    } else { // Submit methods for timeseries and model datatypes
      let self = this;
      let url = this.localApiUrl + '/' + this.props.uuid + '/submit/';
      let ajaxCall = uploadAjaxPromise(url);

      ajaxCall.done(function(res, textStatus, jqXHR) {
        updateCSRFToken(jqXHR);
        if (res) {
          modalContent.push({link: res.url, title: 'Access your data on the THREDDS server'});
          self.setState({
            submitModalHeading: 'Your submission has succeeded!',
            submitModalContent: modalContent,
            showSubmitModal: true,
          });
        } else {
          self.setState({
            submitModalHeading: 'There was a problem with your submission.',
            showSubmitModal: true,
          });
        }
      });

      ajaxCall.fail(function(jqXHR, textStatus, errorThrown) {
        updateCSRFToken(jqXHR);
        self.setState({
          submitModalHeading: 'There was a server error. Please try again later.',
          showSubmitModal: true,
        });
      });
    }
  }

  updateDimensions() {
    modifyTableBodyHeight('.summaryDataContainer', 'summaryDataContainer', 'class', false);
  }

  componentDidMount() {
    ['resize', 'load'].forEach(function(e) {
        window.addEventListener(e, this.updateDimensions, false);
      }, this);
    this.updateDimensions();
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
    let footerStyle = this.props.dataType === 'Survey' ? 'surveySubmit': 'submit';
    let progressStyle = {
      margin: 30,
      passing: 30,
    };
    const flowFooterProps = {
      backPath: this.backPath,
      onBackButtonClick: this.handleBackButtonClick,
      onSubmitClick: this.handleSubmitClick,
      uuid: this.props.uuid,
      footerStyle: footerStyle,
    };

    // create a combinedProps object to pass down to the child (FlowFooter)
    // let submitClicked = this.props.dataType === 'Point Timeseries' && this.props.file && this.props.file.name.indexOf('.nc') === -1 ? true : this.props.submitted;
    let submitClicked = false;
    const combinedProps={...{...flowFooterProps, ...this.props}, submitClicked: submitClicked};

    let variableData = this.props.dataType === 'Survey' ? null :
    <DataChangeReport title={'Variable Data'}
      flow={this.props.flow}
      completedFields={56}
      totalFields={61}
      tableData={this.props.variableDataChanges}
      id='variableData'
    />;
    let discoveryDataId = this.props.dataType === 'Survey' ? 'surveyData' : 'discoveryData';
    let serverDescription = this.props.dataType === 'Survey' ? 'ArcGIS' : 'THREDDS Data Server';
    let complianceUrl = process.env.REACT_APP_UPLOAD_SERVER_IP + '/'+ this.props.uuid + '/export/?type=compliance';
    return(
      <div>
        <div className='innerContainer'>
          <div className='summaryDataContainer'>

            {(this.props.dataType === 'Gridded Model' || this.props.dataType === 'Point Timeseries') &&
            <h2>Click <a id='cc-report-link' href={complianceUrl}>here</a> to get your IOOS compliance checker report.
            </h2>
            }
            <h3>If ready, click "Submit" to push this dataset to {serverDescription}.</h3>
            {this.state.loading &&
              <div style={progressStyle}>
                <CircularProgress size={80} thickness={5} />
              </div>
            }
            {<DataChangeReport title={'Metadata'}
                          completedFields={'23'}
                          totalFields={'78'}
                          tableData={this.props.metaDataChanges}
                          id={discoveryDataId}
             />}
            {variableData}
            {this.state.showSubmitModal &&
              <DialogModal
                key="0"
                title='Submission Results'
                heading={this.state.submitModalHeading}
                content={this.state.submitModalContent}
              />
            }
            {this.state.sessionExpiredModalOpen &&
              <SessionExpiredModal
                {...combinedProps}
              />
            }
          </div>
        </div>
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
 * @return {string} props.surveyType - specifies the survey data type ('Point', 'DEM', 'Profile')
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {object} props.file - the file object uploaded in the dropbox
 * @return {string} props.jwt - the jwt key passed back on server save calls
 * @return {boolean} props.submitted - whether the current data has already been submitted
 * @return {object} props.metaDataChanges - the changes in the metadata to be displayed in the change report
 * @return {object} props.variableDataChanges - the variable changes to be displayed in the change report
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    metaDataChanges: state.metadata.changes,
    variableDataChanges: state.variables.changes,
    dataType: state.flowData.type,
    surveyType: state.flowData.surveyType,
    metadata: state.metadata.content,
    uuid: state.flowData.uuid,
    file: state.flowData.file,
    submitted: state.flowData.submitted,
    jwt: state.flowData.jwt,
  };
};

/**
 * @typedef {function} handleFinalSubmit
 * @global
 * @description Controls the disabling of the submit button for the current dataset
 * @param {boolean} submitted - whether the dataset submitted successfully
 */


/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleFinalSubmit}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    handleFinalSubmit: (submitted)=>{
      dispatch(dataSubmitted(submitted));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFormStep);
