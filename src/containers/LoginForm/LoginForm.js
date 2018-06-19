import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {updateCSRFToken} from 'utils/security/securityUtilities.js';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ForgotPasswordLink from 'components/ForgotPasswordLink/ForgotPasswordLink';
import ForgotPWForm from 'containers/ForgotPWForm/ForgotPWForm';
import {userInfoUpdated} from 'redux/actions/Actions.js';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import history from '../../history';
import axios from 'axios';

/**
 * Login form component which gets passed to login page
 *
 */
class LoginForm extends Component {
  /**
  * @param {object} props - the props passed to the component
  * @param {object} props.parentContext - the props and state of the parent component (Login page)
  * @return {object} - component
  */

  constructor(props) {
    super(props);

    this.state={
      email: '',
      password: '',
      openModal: false,
      modalTitle: '',
      modalContent: '',
      loginPending: false,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPW = this.handleForgotPW.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  /**
  * function called to close the dialog modal
  */
  handleDialogClose() {
    this.setState({openModal: false});
  }

  /**
  * function called when clicking sign in button
  *
  @param {event} event - synthetic event
  */
  handleSubmit(event) {
    event.preventDefault();

    this.setState({loginPending: true});

    let self = this;

    let bodyFormData = new URLSearchParams();
    bodyFormData.append('email', self.state.email);
    bodyFormData.append('password', self.state.password);

    axios.post(this.apiUrl + '/login/', bodyFormData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
    .then((res)=>{
      self.setState({'loginPending': false});
      const csrfToken = res.headers['x-csrf-token'];
      const name = res.headers.name;
      const email = res.headers.email;
      const organization = res.headers.organization;

      if (csrfToken) {
        updateCSRFToken(csrfToken);
        self.props.userInfoUpdated({name: name, email: email, organization: organization});
        let returnUrl = '/';
        if (sessionStorage.projectName !== undefined) {
          returnUrl = '/' + sessionStorage.projectName;
        };
        history.push(returnUrl);
      } else {
        self.setState({
          'openModal': true,
          'modalTitle': 'Verification Error',
          'modalContent': 'No token returned. Please contact the system administrator.',
        });
      }
    }).catch((err)=>{
      let title;
      let bodyText;
      if (err.response.status === 400) {
        // Bad request Typically means it failed basic validation
        title = 'Bad request';
        bodyText = 'Did you provide a valid email address?';
      } else if (err.response && err.response.status === 401) {
        // Unauthorized
        title = 'Unauthorized';
        bodyText = 'The server could not verify that you are authorized. ' +
                   'Did you supply the wrong credentials (e.g., bad password)?';
      } else {
        title = 'Login Failed';
        bodyText = err.response.status + ': ' + err.response.data;
      }

      self.setState({
        'openModal': true,
        'modalTitle': title,
        'modalContent': bodyText,
        'loginPending': false,
      });
    });
  }

  /**
  * function called when clicking forgot password button
  *
  @param {event} event - synthetic event
  */
  handleForgotPW(event) {
    let loginscreen = [];
    let loginmessage = [];
    loginscreen.push(<ForgotPWForm parentContext={this} />);
    loginmessage.push(<p style={{color: '#737373', fontSize: 12}}>Back to Sign in</p>);

    let loginButtons=[];
    loginButtons.push(
      <MuiThemeProvider>
        <RaisedButton label={'Sign in'}
                     style={{marginTop: 10}}
                     onClick={(event) => this.props.parentContext.handleClick(event)}
        />
      </MuiThemeProvider>
    );

    this.props.parentContext.setState({
       loginscreen: loginscreen,
       loginmessage: loginmessage,
       loginButtons: loginButtons,
       isLogin: 'forgot_pw',
    });
  }

  render() {
    let actions = [
      <RaisedButton
        label="Ok"
        backgroundColor="#e6e6e6"
        onClick={this.handleDialogClose}
        style={{marginRight: 20}}
      />,
    ];

    let modal = (<Dialog
      title={this.state.modalTitle}
      open={this.state.openModal}
      actions={actions}
      onRequestClose={this.handleDialogClose}
    >
      <p>{this.state.modalContent}</p>
    </Dialog>);

    return (
      <MuiThemeProvider>
        <div>
          <form onSubmit={this.handleSubmit} style={{textAlign: 'left'}}>
            <TextField
               hintText="Enter your email"
               floatingLabelText="Email"
               fullWidth={true}
               onChange = {(event, newValue) => this.setState({email: newValue})}
            />
            <br/>
            <TextField
              type="Password"
              hintText="Enter your password"
              floatingLabelText="Password"
              fullWidth={true}
              onChange = {(event, newValue) => this.setState({password: newValue})}
            />
             <br/>
             <ForgotPasswordLink handleForgotPW={this.handleForgotPW} />
             <div style={{textAlign: 'right'}}>
              <RaisedButton type='submit' label="Sign in" backgroundColor="#e6e6e6" />
             </div>
             {modal}
         </form>
        {this.state.loginPending && <LoadingSpinner />}
      </div>
     </MuiThemeProvider>
    );
  }
}

LoginForm.propTypes = {
  parentContext: PropTypes.object,
};

/**
 * @typedef {function} userInfoUpdated
 * @global
 * @description update the redux store with user infomation
 * @param {object} userInfoObj - {name: name, email: email, organization: organization}
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {userInfoUpdated}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    userInfoUpdated: (userInfoObj) => {
      dispatch(userInfoUpdated(userInfoObj));
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));