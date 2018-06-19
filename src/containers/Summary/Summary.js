import moment from 'moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import {dataSubmitted} from 'redux/actions/Actions.js';
import DataChangeReport from 'containers/DataChangeReport/DataChangeReport';
import {modifyTableBodyHeight} from 'utils/DOM/DomManipulation';
import SessionExpiredModal from 'components/SessionExpiredModal/SessionExpiredModal';
import {updateVariableOriginal} from 'utils/general/fetchDataset.js';

/**
 * Final stepper page component used to render summary and process submit
 */
class SummaryFormStep extends Component {
  /**
   * @param {Object} props - Component properties
   * @param {boolean} showSubmitModal - whether the submit results modal should be shown
   * @param {string} submitModalHeading - the heading text to be displayed in the submit modal
   * @param {string} submitModalContent - the main content text of the submit modal
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {object} props.history - redux location manager passed in from parent container
   * @param {object} [props.surveyColumns] - optional object describing the survey x/y/z
   *                                         selections (only in survey flow)
   * @param {string} props.surveyType - the type of survey selected.
   */
  constructor(props) {
    super(props);

    this.state = {
      sessionExpiredModalOpen: false,
      loading: false, // Drives the use of a spinner
    };

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

    this.populateSurveyQuery = this.populateSurveyQuery.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
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

    if (dataColumns.id) { // Must be a profile dataset (input zip file)
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

  updateDimensions() {
    modifyTableBodyHeight('.summaryDataContainer', 'summaryDataContainer', 'class', false);
  }

  componentDidMount() {
    ['resize', 'load'].forEach(function(e) {
        window.addEventListener(e, this.updateDimensions, false);
      }, this);
    this.updateDimensions();

    this.setState({loading: true});

    // Fetch the current dataset on the db and compare with current state (updates variable and metadata change states.)
    updateVariableOriginal((success, err)=>{
      this.setState({loading: false});
    });
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
    const combinedProps={...this.props};

    // transform the variable changes to match the schema required in the data change report.
    let transformedVariableChanges = Object.keys(this.props.variableDataChanges).map((sectionKey)=>{
      return {
        sectionName: sectionKey,
        changes: Object.keys(this.props.variableDataChanges[sectionKey]).map((changeKey)=>{
          return this.props.variableDataChanges[sectionKey][changeKey];
        }),
      };
    });

    let variableData = this.props.dataType === 'Survey' ? null :
    <DataChangeReport title={'Variable Data'}
      flow={this.props.flow}
      completedFields={56}
      totalFields={61}
      tableData={transformedVariableChanges}
    />;


    let discoveryDataId = this.props.dataType === 'Survey' ? 'surveyData' : 'discoveryData';
    let serverDescription = this.props.dataType === 'Survey' ? 'ArcGIS' : 'THREDDS Data Server';
    let complianceUrl = process.env.REACT_APP_UPLOAD_SERVER_IP + '/'+ this.props.uuid + '/export/?type=compliance';
    return (
      <div>
        <div className='innerContainer'>
          <div className='summaryDataContainer'>

            {(this.props.dataType === 'Gridded Model' || this.props.dataType === 'Point Timeseries') &&
            <h2>Click <a id='cc-report-link' href={complianceUrl}>here</a> to get your IOOS compliance checker report.
            </h2>
            }
            <h3>If ready, click "Submit" to push this dataset to {serverDescription}.</h3>
            {this.state.loading &&
              <LoadingSpinner
                size={80}
                thickness={5}
                onCancel={()=>{
                  this.setState({loading: false});
                }}
              />
            }
            {<DataChangeReport title={'Metadata'}
                          completedFields={'23'}
                          totalFields={'78'}
                          tableData={[{changes: this.props.metaDataChanges}]}
                          id={discoveryDataId}
             />}
            {variableData}
            {this.state.sessionExpiredModalOpen &&
              <SessionExpiredModal
                {...combinedProps}
              />
            }

          </div>
        </div>
      </div>
    );
  }
}

SummaryFormStep.propTypes = {
  showSubmitModal: PropTypes.bool,
  submitModalContent: PropTypes.string,
  submitModalHeading: PropTypes.string,
  stepIndex: PropTypes.number,
  handleBackButtonClick: PropTypes.func,
  hisory: PropTypes.object,
  surveyType: PropTypes.string,
};

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {object} props.metadata - the shared metadata reference across all pages
 * @return {string} props.dataType - specifies the type of the data (i.e. 'Gridded Model' or 'Survey')
 * @return {string} props.surveyType - specifies the survey data type ('Point', 'DEM', 'Profile')
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {object} props.file - the file object uploaded in the dropbox
 * @return {string} props.csrf - the csrf key passed back on server save calls
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
    csrf: state.flowData.csrf,
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
