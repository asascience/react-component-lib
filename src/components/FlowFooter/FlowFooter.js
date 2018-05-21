import React, {Component} from 'react';
//import {uploadAjaxPromise} from '../../helpers/securityUtilities.js';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import muiThemeable from 'material-ui/styles/muiThemeable';
import CheckedSubmit from '../SubmitButton/SubmitButton';
import DialogModal from '../../components/Modal/Modal';
import $ from 'jquery';

// Defines a footer with back, download, save and next button.
// requires nextPath, backPath and history to be passsed to props for navigation to work properly.
/**
 * Common footer component used across the entire app
 *
 * @prop {boolean} dropDownOpen - whether the download dropdown is open
 */
class FlowFooter extends Component {
  /**
   * @param {string} props.footerStyle - string such as 'allButtons' or 'pagingOnly' describing the footer style
   * @param {boolean} props.saveDisabled - whether the save button is currently disabled
   * @param {function} props.onBackButtonClick - callback for when the back button is clicked
   * @param {function} props.onNextButtonClick - callback for when the next button is clicked
   * @param {function} props.onSaveClick - callback for when the save button is clicked
   * @param {string} props.uuid - the unique identifier of the current dataset
   * @param {boolean} props.submitClicked - whether the submit button should display a check mark
   */
  constructor(props) {
    super(props);

    this.state={
      dropDownOpen: true,
      downloadKey: 'Yaml',
      openModal: false,
      modalTitle: 'FTP Credentials',
      modalContent: '',
    };

    // Set modal content
    let self = this;
    let url = process.env.REACT_APP_UPLOAD_SERVER_IP + '/' + this.props.uuid + '/ftp/?type=json';
    /*let ajaxCall = uploadAjaxPromise(url);

    ajaxCall.done(function(data, textStatus, jqXHR) {
      if (data) {
        data['FTPCredentials'] = true;
        self.state.modalContent = data;
      }
    });

    ajaxCall.fail(function() {
      // TODO: send error to log
      console.error('Error getting FTP Credentials');
    });*/

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  /**
   * Controls the closing of the dialog modal
   */
  handleDialogClose() {
    this.setState({openModal: false});
  }

  /**
   * Controls the opening of the export dropdown menu
   */
  handleOpen() {
    this.setState({dropDownOpen: true});
  };

  /**
   * Controls the closing of the export dropdown menu
   */
  handleClose() {
    this.setState({dropDownOpen: false});
  };

  /**
   * Controls the opening of the dialog modal
   */
  handleClick() {
    this.setState({openModal: true});
  }

  /**
   * Handles clicking on the buttons of the export dropdown menu
   */
  handleDownloadClick(e) {
    const fileName = $(e.target).data('download-name') + $(e.target).data('extension');
    const fileType = $(e.target).data('type');

    let url = process.env.REACT_APP_UPLOAD_SERVER_IP + '/' + this.props.uuid + '/ftp/?type=' + fileType;
    /*let ajaxCall = uploadAjaxPromise(url, 'GET', null);

    ajaxCall.done(function(data, textStatus, jqXHR) {
      if (data) {
          let anchor = document.createElement('a');
          let textData = new Blob([data], {type: 'text/plain'});
          let objectUrl = window.URL.createObjectURL(textData);

          anchor.href = objectUrl;
          anchor.download = fileName;
          anchor.click();

          window.URL.revokeObjectURL(objectUrl);
        }
    });

    ajaxCall.fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error downloading FTP credentials');
    });*/
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
        onTouchTap={this.props.onBackButtonClick}
        disabled={this.props.backPath === null}
      >
        <i className='fa fa-backward' aria-hidden='true'></i>&nbsp;Back
      </RaisedButton>
    );

    const downloadButton = (
      <IconMenu
        iconButtonElement={<RaisedButton onTouchTap={this.handleOpenMenu} label="FTP" />}
        open={this.state.openMenu}
        onRequestChange={this.handleOnRequestChange}
        onItemTouchTap={this.handleSelect}
        style={downloadStyle}
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <a style={linkStyle} onClick={this.handleClick}>View</a>
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

    let footerContent;
    if (this.props.footerStyle === 'allButtons') {
      footerContent = (<div style={divStyle}>
          {backButton}
          <div id="FlowFooterInner">
            {downloadButton}
            <RaisedButton
              backgroundColor={buttonBackgroundColor}
              onTouchTap={this.props.onSaveClick}
              disabled={this.props.saveDisabled}
              style={{marginRight: 5}}
            >
            <i className='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;Save
            </RaisedButton>
            <RaisedButton
              backgroundColor={buttonBackgroundColor}
              onTouchTap={this.props.onRevertClick}
              disabled={false}
            >
            <i className='fa fa-undo' aria-hidden='true'></i>&nbsp;Undo
            </RaisedButton>
          </div>
          <RaisedButton
            backgroundColor={buttonBackgroundColor}
            style={nextStyle}
            onTouchTap={this.props.onNextButtonClick}
            disabled={false}
          >
          Next&nbsp;<i className='fa fa-forward' aria-hidden='true'></i>
          </RaisedButton>
        </div>);
    } else if (this.props.footerStyle === 'admin') {
        footerContent = (<div style={divStyle}>
          {backButton}
          <div id="FlowFooterInner">
            {downloadButton}
            <RaisedButton
              backgroundColor={buttonBackgroundColor}
              onTouchTap={this.props.onSaveClick}
              disabled={this.props.saveDisabled}
              style={{marginLeft: 5}}
            >
            <i className='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;Save
            </RaisedButton>
          </div>
          <RaisedButton
            backgroundColor={buttonBackgroundColor}
            style={nextStyle}
            onTouchTap={this.props.onNextButtonClick}
            disabled={false}
          >
          Next&nbsp;<i className='fa fa-forward' aria-hidden='true'></i>
          </RaisedButton>
        </div>);
    }else if (this.props.footerStyle === 'survey') {
      footerContent = (<div style={divStyle}>
          {backButton}
          <div id="FlowFooterInner">
            <RaisedButton
              backgroundColor={buttonBackgroundColor}
              onTouchTap={this.props.onSaveClick}
              disabled={this.props.saveDisabled}
            >
            <i className='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;Save
            </RaisedButton>
          </div>
          <RaisedButton
            backgroundColor={buttonBackgroundColor}
            style={nextStyle}
            onTouchTap={this.props.onNextButtonClick}
            disabled={false}
          >
          Next&nbsp;<i className='fa fa-forward' aria-hidden='true'></i>
          </RaisedButton>
        </div>);
    } else if (this.props.footerStyle === 'pagingOnly') {
      footerContent = (<div style={divStyle}>
          {backButton}
          <RaisedButton
            backgroundColor={buttonBackgroundColor}
            style={nextStyle}
            onTouchTap={this.props.onNextButtonClick}
            disabled={false}
          >
          Next&nbsp;<i className='fa fa-forward' aria-hidden='true'></i>
          </RaisedButton>
        </div>);
    } else if (this.props.footerStyle === 'submit') {
      footerContent = (<div style={divStyle}>
          {backButton}
          {downloadButton}
          <RaisedButton
            backgroundColor={buttonBackgroundColor}
            onTouchTap={this.props.onSubmitClick}
            disabled={this.props.submitClicked ? true : false}
          >
          <CheckedSubmit submitted={this.props.submitClicked}/>
          </RaisedButton>
        </div>);
    } else if (this.props.footerStyle === 'surveySubmit') {
      footerContent = (<div style={divStyle}>
          {backButton}
          <RaisedButton
            backgroundColor={buttonBackgroundColor}
            onTouchTap={this.props.onSubmitClick}
            disabled={this.props.submitClicked ? true : false}
          >
          <CheckedSubmit submitted={this.props.submitClicked}/>
          </RaisedButton>
        </div>);
    }

    const FTPModal = <DialogModal
                      title = {this.state.modalTitle}
                      content = {this.state.modalContent}
                      parentContext = {this}
                      onRequestClose={this.handleDialogClose}
                     />;
    return(
      <div style={this.props.style}>
        {footerContent}
        {this.state.openModal && FTPModal}
      </div>
    );
  }
}

export default muiThemeable()(FlowFooter);
