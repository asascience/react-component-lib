import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import './Modal.css';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 *
 * @prop {boolean} open - whether the dialog is open
 */
export default class DialogModal extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {string} props.title - the title of the dialog box
   * @param {string} props.heading - the bold heading over the content
   * @param {string|string[]} props.content - either the content text or an array of content links
   * @param {Object} props.uploadResponse - the response from a failed upload
   */
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handles the opening of the modal view on display
   */
  handleOpen() {
    this.setState({open: true});
  };

  /**
   * Handles the closing of the modal view on selecting the OK button
   */
  handleClose() {
    this.setState({open: false});
    if (this.props.hasOwnProperty('history') && this.props.hasOwnProperty('reroute')) {
      if (this.props.reroute) {
        this.props.history.push('/');
      }
    }
    if (this.props.hasOwnProperty('onRequestClose')) {
      this.props.onRequestClose();
    }
  };

  render() {
    let actions = [
      <RaisedButton
        className="modal-ok-button"
        label="Ok"
        backgroundColor="#e6e6e6"
        onTouchTap={this.handleClose}
      />,
    ];
    let content;
    if (Array.isArray(this.props.content)) {
      let links = this.props.content.map((obj, ind)=>{
        let link = obj.link;
        let title = obj.title;
        return (<li key={ind} display='block'>
                  <a href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{color: '#0645AD'}}
                  >{title}</a>
                </li>);
      });
      content = (<ul style={{listStyle: 'none'}}>
        {links}
      </ul>);
    } else if (this.props.content.FTPCredentials === true) {
      content = <p><b>Username:</b> {this.props.content.username}
            <br /> <b>Password:</b> {this.props.content.password}
            <br /> <b>URL:</b> {this.props.content.url}
                </p>;
    } else if (this.props.duplicateUpload === true) {
      // encapsulate dataset ID in an object to match getAutocompleteDataset function definition in GenericUploadPage.js
      let dataset = Object;
      dataset.id = this.props.uploadResponse.datasets[0];

      actions.push(<RaisedButton
                      label="Go To Dataset"
                      backgroundColor="#1D8BDD"
                      onTouchTap={(e) => {e.preventDefault(); this.props.parentContext.getAutocompleteDataset(dataset);}}
                    />);
      content = this.props.content;
    }
    else {
      content = <p>{this.props.content}</p>;
    }
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <p><b>{this.props.heading}</b></p>
        {content}
        </Dialog>
      </div>
    );
  }
}

/**
 * A modal dialog can only be closed by selecting one of the actions.
 *
 * @prop {boolean} open - whether the dialog is open
 */
export class SessionExpiredModal extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   */
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };

    this.sessionExpired = this.sessionExpired.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handles the opening of the modal view on display
   */
  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  /**
   * Handles when a session is expired
   */
  sessionExpired() {
    this.handleClose();
    this.props.history.push('/');
  }

  render() {
    const sessionExpiredActions = [
      <RaisedButton
        label="Ok"
        primary={true}
        onTouchTap={this.sessionExpired}
      />,
    ];
    return (
        <Dialog
            title='Your session has expired!'
            open={this.state.open}
            actions={sessionExpiredActions}
            modal={true}
        >
          <p>You are being redirected to the home page.</p>
        </Dialog>
    );
  }
}
