import React, {Component} from 'react';
import {updateCSRFToken} from 'utils/security/securityUtilities.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import history from '../../history';

/**
 * Session expired modal
 */
class SessionExpiredModal extends Component {
  /**
   * @param {Object} props - Props to be passed into this component (none)
   */
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false});
    updateCSRFToken('logged-out');
    history.push('/');
  };

  render() {
    const sessionExpiredActions = [
      <RaisedButton
        label="OK"
        primary={true}
        onClick={this.handleClose}
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

export default SessionExpiredModal;
