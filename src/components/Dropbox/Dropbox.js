import React, {Component} from 'react';
import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import './Dropbox.css';

/**
 * Dropbox component for uploading files on the upload page
 */
class Dropbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRenderComponent: true,
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

    // Flip the rendering of the dropzone component...
    // The component is a weird wrapper of a native js package and needs
    // this to respond to prop changes correctly.
    if (this.props.useFiles !== prevProps.useFiles) {
      this.setState({shouldRenderComponent: false}, ()=>{
        this.setState({shouldRenderComponent: true});
      });
    }
  }
  /**
   * @param {function} onFileDrop - callback for when a file is dropped in
   * @param {function} onError - callback for when an error occurs
   * @param {function} onUpload - callback for when a file is uploaded
   */
  render() {
    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    const djsConfig = {
      addRemoveLinks: true,
      params: {  // Pass in other params with the upload post here
        // doc: JSON.stringify({comt: {project: 'comt_project'}}),
      },
      maxFilesize: 500,
      acceptedFiles: this.props.useFiles,
      //headers: {'X-Csrf-Token': this.props.csrf},
      withCredentials: true,
    };

    let url = process.env.REACT_APP_UPLOAD_SERVER_IP + '/upload/';
    const componentConfig = {
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

    let dropzone;
    if (this.state.shouldRenderComponent) {
      dropzone = (<DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}
      />);
    }
    return (
      <div className="dropbox">
        <h2>Upload your data (Max Size 500 MB)</h2>
        {dropzone}
      </div>
    );
  }
}

export default Dropbox;
