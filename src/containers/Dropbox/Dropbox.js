import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {DropzoneComponent} from 'react-dropzone-component';
import './Dropbox.css';

/**
 * Dropbox component for uploading files on the upload page
 */
class Dropbox extends Component {
  /**
   * @param {function} props.onFileDrop - callback for when a file is dropped in
   * @param {function} props.onError - callback for when an error occurs
   * @param {function} props.onUpload - callback for when a file is uploaded
   * @param {string} props.csrf - the csrf token
   * @param {string} props.project_name - specifies the name of the project
   * @param {string} props.name - the users name
   * @param {string} props.email - the user email
   * @param {string} props.organization - the users organization
   */

  render() {
    // TODO: replace this... (external file?)
    const projectMapping = {
      'chesapeake-bay-hypoxia': 'Chesapeake Bay Hypoxia',
    };

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
            project: 'Placeholder > ' + projectName,
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
      headers: {'X-Csrf-Token': this.props.csrf},
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

Dropbox.propTypes = {
  onFileDrop: PropTypes.func,
  onError: PropTypes.func,
  onUpload: PropTypes.func,
  csrf: PropTypes.string,
  project_name: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  organization: PropTypes.string,
} 

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.csrf - the csrf token
 * @return {string} props.project_name - specifies the name of the project
 * @return {string} props.name - the users name
 * @return {string} props.email - the user email
 * @return {string} props.organization - the users organization
 */

const mapStateToProps = (state, ownProps)=>{
  return {
    csrf: state.flowData.csrf,
    projectName: state.flowData.projectName,
    name: state.flowData.name,
    email: state.flowData.email,
    organization: state.flowData.organization,
  };
};

export default connect(mapStateToProps, null)(Dropbox);

