import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DropzoneComponent} from 'react-dropzone-component';
import './Dropbox.css';

/**
 * Dropbox component for uploading files on the upload page
 */
class Dropbox extends Component {
  /**
   * @param {function} onFileDrop - callback for when a file is dropped in
   * @param {function} onError - callback for when an error occurs
   * @param {function} onUpload - callback for when a file is uploaded
   */
  constructor(props) {
    super(props);
    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration  
  }

  render() {
    const projectMapping = {
      'chesapeake-bay-hypoxia': 'Chesapeake Bay Hypoxia',
      'gulf-of-mexico-hypoxia': 'Gulf of Mexico Hypoxia',
      'us-west-coast-model-intercomparsion': 'US West Coast Model Intercomparison',
      'puerto-rico-u.s.-virgin-islands-storm-surge-&-waves': 'Puerto Rico/U.S. Virgin Islands Storm Surge & Waves',
      'coastal-waves,-surge-and-inundation-in-the-gulf-of-maine': 'Coastal Waves, Surge and Inundation in the Gulf of Maine',
      'coastal-waves,-surge-and-inundation-in-the-gulf-of-mexico': 'Coastal Waves, Surge and Inundation in the Gulf of Mexico',
    };

    // TODO: get the name, email, organization from returned cookie?
    let projectName = this.props.projectName in projectMapping ? projectMapping[this.props.projectName] : this.props.projectName;
    let djsConfig = {
      addRemoveLinks: true,
      params: {
        doc: JSON.stringify({
          comt: {
            project: projectName,
            subproject: this.props.subprojectName,
          },
          acdd: {
            project: 'COMT > ' + projectName + ' > ' + this.props.subprojectName,
            license: 'Freely distributed',
            naming_authority: 'gov.noaa.comt',
            creator_name: this.props.name,
            creator_email: this.props.email,
            institution: this.props.organization,
          },
        }),
      },
      maxFilesize: 500,
      acceptedFiles: this.props.useFiles,
      headers: {'X-Csrf-Token': this.props.jwt},
      withCredentials: true,
    };
    let url = process.env.REACT_APP_UPLOAD_SERVER_IP + '/upload/';
    
    let componentConfig = {
      iconFiletypes: this.props.useIcons,
      showFiletypeIcon: true,
      postUrl: url,
    };

    // For a list of all possible events (there are many)!
    const eventHandlers = {
      // All of these receive the event as first parameter:
      drop: null,
      dragstart: null,
      dragend: null,
      dragenter: null,
      dragover: null,
      dragleave: null,
      // All of these receive the file as first parameter:
      addedfile: this.props.onFileAdd,
      removedfile: null,
      thumbnail: null,
      error: this.props.onError,
      processing: null,
      uploadprogress: null,
      sending: null,
      success: this.props.onUpload,
      complete: null,
      canceled: null,
      maxfilesreached: null,
      maxfilesexceeded: null,
      // All of these receive a list of files as first parameter
      // and are only called if the uploadMultiple option
      // in djsConfig is true:
      processingmultiple: null,
      sendingmultiple: null,
      successmultiple: null,
      completemultiple: null,
      canceledmultiple: null,
      // Special Events
      totaluploadprogress: null,
      reset: null,
      queuecompleted: null,
    };

    return (
      <div className="dropbox" ref={this.props.dropBoxRef}>
        <h3>Click in the box or drag a file to upload your data (Max Size 500 MB)</h3>
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        />
      </div>
    );
  }
}


/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.project_name - specifies the name of the project
 */

const mapStateToProps = (state, ownProps)=>{
  return {
    jwt: state.flowData.jwt,
    projectName: state.flowData.projectName,
    subprojectName: state.flowData.subprojectName,
    name: state.flowData.name,
    email: state.flowData.email,
    organization: state.flowData.organization,
  };
};

export default connect(mapStateToProps, null)(Dropbox);
