import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCSRFToken} from '../../helpers/securityUtilities.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DialogModal from '../../components/Modal/Modal';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ForgotPW from './ForgotPW';
import $ from 'jquery';
import {userInfoUpdated} from 'data-upload-connector';

class ForgotLink extends Component {
   render() {
      let myStyle = {
         fontSize: 10,
         color: '#0088cc',
         cursor: 'pointer',
         padding: '10px 0',
      };
      return (
         <div>
            <p style={{marginTop: 8, marginBottom: 0, marginLeft: 0, textAlign: 'left'}}>
              <a onClick = {this.props.handleForgotPW} style = {myStyle}>Forgot Password?</a>
            </p>
         </div>
      );
   }
}


class Login extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: '',
      password: '',
      openModal: false,
      modalTitle: '',
      modalContent: '',
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPW = this.handleForgotPW.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogClose() {
    this.setState({openModal: false});
  }

  handleSubmit(event) {
    event.preventDefault();

    let self = this;
    let authData = {
      'email': self.state.email,
      'password': self.state.password,
    };

    let verifyCredentials = $.ajax({
      url: this.apiUrl + '/login/',
      type: 'POST',
      data: authData,
      xhrFields: {
        withCredentials: true,
      },
    });
    verifyCredentials.done(function(res, textStatus, jqXHR) {
      const csrfToken = jqXHR.getResponseHeader('X-Csrf-Token');
      const name = jqXHR.getResponseHeader('Name');
      const email = jqXHR.getResponseHeader('Email');
      const organization = jqXHR.getResponseHeader('Organization');

      if (csrfToken) {
        updateCSRFToken(csrfToken);
        self.props.userInfoUpdated({name: name, email: email, organization: organization});
        let returnUrl = '/';
        if (sessionStorage.projectName !== undefined) {
          returnUrl = '/' + sessionStorage.projectName;
        };
        self.props.parentContext.props.history.push(returnUrl);
      } else {
        self.setState({
          'openModal': true,
          'modalTitle': 'Verification Error',
          'modalContent': 'No token returned. Please contact the system administrator.',
        });
      }
    });

    verifyCredentials.fail(function(jqXHR, textStatus, errorThrown) {
      let title;
      let bodyText;
      if (jqXHR.status === 400) {
        // Bad request Typically means it failed basic validation
        title = 'Bad request';
        bodyText = 'Did you provide a valid email address?';
      } else if (jqXHR.status === 401) {
        // Unauthorized
        title = 'Unauthorized';
        bodyText = 'The server could not verify that you are authorized. ' +
                   'Did you supply the wrong credentials (e.g., bad password)?';
      } else {
        title = 'Login Failed';
        bodyText = jqXHR.status + ': ' + jqXHR.statusText;
      }

      self.setState({
        'openModal': true,
        'modalTitle': title,
        'modalContent': bodyText,
      });
    });
  }


  handleForgotPW(event) {
    let loginscreen = [];
    let loginmessage = [];
    loginscreen.push(<ForgotPW parentContext={this} appContext={this.props.appContext} />);
    loginmessage.push(<p style={{color: '#737373', fontSize: 12}}>Back to Sign in</p>);

    let loginButtons=[];
    loginButtons.push(
      <div>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={'Sign in'} style={{marginTop: 10}} onClick={(event) => this.props.parentContext.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    );

    this.props.parentContext.setState({
       loginscreen: loginscreen,
       loginmessage: loginmessage,
       loginButtons: loginButtons,
       isLogin: 'forgot_pw',
    });
  }

  render() {
    let modal = <DialogModal
                  title={this.state.modalTitle}
                  heading=''
                  content={this.state.modalContent}
                  history={this.props.parentContext.props.history}
                  onRequestClose={this.handleDialogClose}
                />;
    return (
      <div>
        <MuiThemeProvider>
        <div style={{textAlign: 'left'}}>
          <form onSubmit={this.handleSubmit}>
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
             <ForgotLink handleForgotPW={this.handleForgotPW} />
             <div style={{textAlign: 'right'}}>
              <RaisedButton type='submit' label="Sign in" backgroundColor="#e6e6e6" />
             </div>
             {this.state.openModal && modal}
           </form>
       </div>
       </MuiThemeProvider>
      </div>
    );
  }
}


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

export default connect(null, mapDispatchToProps)(Login);
