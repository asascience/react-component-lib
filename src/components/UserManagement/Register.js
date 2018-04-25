import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import DialogModal from '../../components/Modal/Modal';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import $ from 'jquery';

// build this from an ajax call?
const items = [
  <MenuItem key={1} value={1} primaryText="RPS" />,
  <MenuItem key={2} value={2} primaryText="IOOS" />,
  <MenuItem key={3} value={3} primaryText="COMT" />,
  <MenuItem key={4} value={4} primaryText="LSU" />,
  <MenuItem key={4} value={4} primaryText="UNC" />,
  <MenuItem key={4} value={4} primaryText="VIMS" />,
];

// https://www.w3resource.com/javascript/form/email-validation.php
function validateEmail(mail) {
  // eslint-disable-next-line
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  return (false);
}

class SelectFieldMenu extends Component {
  render() {
    return (
      <div>
        <SelectField
          value={this.props.value}
          onChange={this.props.handleOrganizationChange}
          floatingLabelText="Organization"
          floatingLabelFixed={true}
          hintText="Select Organization"
          style={{textAlign: 'left'}}
        >
          {items}
        </SelectField>
      </div>
    );
  }
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      organization_value: null,
      email: '',
      password: '',
      password_confirm: '',
      password_error_text: '',
      password_confirm_error_text: '',
      email_error_text: '',
      openModal: false,
      modalTitle: '',
      modalContent: '',
      reroute: false,
    };
    this.handleOrganizationChange=this.handleOrganizationChange.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  handleOrganizationChange(event, index, value) {
    this.setState((prevState, props) => ({
      organization_value: value,
    }));
  }

  handleInputChange(event, newValue) {
    switch (event.target.id) {
      case 'password':
        if (newValue.length === 0) {
          this.setState({'password_error_text': 'This field is required'});
        } else {
            if (newValue === this.state.password_confirm) {
              this.setState({
                'password': newValue,
                'password_error_text': '',
                'password_confirm_error_text': '',
              });
            } else {
              this.setState({
                'password': newValue,
                'password_confirm_error_text': 'Passwords do not match',
                'password_error_text': '',
              });
            }
          }
        break;
      case 'password_confirm':
        if (newValue.length === 0) {
          this.setState({'password_confirm_error_text': 'This field is required'});
        } else {
          if (newValue === this.state.password) {
            this.setState({
              'password_confirm': newValue,
              'password_confirm_error_text': '',
            });
          } else {
            this.setState({
              'password_confirm': newValue,
              'password_confirm_error_text': 'Passwords do not match',
            });
          }
        }
        break;
      case 'email':
        if (newValue.length === 0) {
          this.setState({
            'email_error_text': 'This field is required',
          });
        } else {
          if (validateEmail(newValue)) {
            this.setState({
              'email': newValue,
              'email_error_text': '',
            });
          } else {
            this.setState({
              'email': newValue,
              'email_error_text': 'Invalid email format',
            });
          }
        }
        break;
      default:
        // do nothing
    }
  }

  handleSubmit(event) {
    let self = this;

    let registrationFormReady = this.state.email_error_text === '' && this.state.password_error_text === ''
      && this.state.password_confirm_error_text === '' && this.state.password.length>0
      && this.state.password_confirm.length>0 && this.state.email.length>0;

    if(registrationFormReady) {
      let organization = this.state.organization_value !== null ? items[this.state.organization_value-1].props.primaryText : '';

      let registrationData = {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        organization: organization,
      };

      let sendRegistrationInfo = $.ajax({
        url: this.apiUrl + '/user/new/',
        dataType: 'json',
        type: 'POST',
        data: registrationData,
      });

      sendRegistrationInfo.done(function(res) {
        // if they aren't active but the ajax call was successful then we need a modal popup to check email for pw
        if (res.active) {
          self.setState({
            'openModal': true,
            'modalTitle': 'Error',
            'modalContent': 'This email and password entered are already registered. Enter these credentials on the log in page.',
          });
        } else {
          self.setState({
            'openModal': true,
            'modalTitle': 'Success!',
            'modalContent': 'Please check your email for registration confirmation.',
            'reroute': true,
          });
        }
      });

      sendRegistrationInfo.fail(function(jqXHR, textStatus, errorThrown) {
        self.setState({
          'openModal': true,
          'modalTitle': 'Server Error',
          'modalContent': 'An issue occured and verification failed.',
        });
        // do we need a where to paramater when the modal is closed?
      });
    } else {
      self.setState({
        'openModal': true,
        'modalTitle': 'Form Incomplete',
        'modalContent': 'Please complete the required fields.',
      });

      if (self.state.password.length === 0) {self.setState({'password_error_text': 'This field is required'})}
      if (self.state.password_confirm.length === 0) {self.setState({'password_confirm_error_text': 'This field is required'})}
      if (self.state.email.length === 0) {self.setState({'email_error_text': 'This field is required'})}
    }
  }

  render() {
    let modal = <DialogModal
                  title={this.state.modalTitle}
                  heading=''
                  content={this.state.modalContent}
                  parentContext={this}
                  history={this.props.parentContext.props.history}
                  reroute={this.state.reroute}
                />;

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                hintText="Enter your Name"
                floatingLabelText="Name"
                onChange = {(event, newValue) => this.setState({name: newValue})}
              />
              <br/>
              <SelectFieldMenu handleOrganizationChange={this.handleOrganizationChange} value={this.state.organization_value} style={{verticalAlign: 'bottom'}}/>
              <TextField
                id="email"
                hintText="Enter your email"
                floatingLabelText="Email"
                errorText={this.state.email_error_text}
                onChange = {this.handleInputChange}
              />
              <br/>
              <TextField
                id="password"
                type = "password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                errorText={this.state.password_error_text}
                onChange = {this.handleInputChange}
              />
              <br/>
              <TextField
                id="password_confirm"
                type = "password"
                hintText="Confirm your Password"
                floatingLabelText="Confirm Password"
                errorText={this.state.password_confirm_error_text}
                onChange = {this.handleInputChange}
              />
              <br/>
              <div style={{textAlign: 'right'}}>
                <RaisedButton type='submit' label="Submit" backgroundColor="#e6e6e6" style={style} />
              </div>
              {this.state.openModal && modal}
            </form>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
