import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import OrganizationMenu from 'components/OrganizationMenu/OrganizationMenu';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import {validateEmail} from 'utils/validation/validation';
import history from '../../history';
import axios from 'axios';

/**
* Registration form component used on login page
*/
class RegisterForm extends Component {
  /**
  * @param {object} props - the props passed to the component
  * @param {object} props.organizations - component array of organizations
  * @param {object} props.submitButtonStyle - style of the submit button
  * @return {object} - component
  */

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
      registrationPending: false,
    };
    this.handleOrganizationChange=this.handleOrganizationChange.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;
  }

  /**
  * called when a user selects a different organization
  *
  * @param {event} event - synthetic event
  * @param {number} index - the numeric index of the menu item
  * @param {number} value - the data attribute value of the menu item
  */
  handleOrganizationChange(event, index, value) {
    this.setState((prevState, props) => ({
      organization_value: value,
    }));
  }

  /**
  * called when a user fills in an input field
  *
  * @param {event} event - synthetic event
  * @param {string} newValue - the new input value
  */
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

  /**
  * called when the submit button is clicked
  *
  * @param {event} event - synthetic event
  */
  handleSubmit(event) {
    let self = this;

    let registrationFormReady = this.state.email_error_text === '' && this.state.password_error_text === ''
      && this.state.password_confirm_error_text === '' && this.state.password.length>0
      && this.state.password_confirm.length>0 && this.state.email.length>0;

    if (registrationFormReady) {
      this.setState({registrationPending: true});
      let organization = this.state.organization_value !== null ?
        this.props.organizations[this.state.organization_value-1].props.primaryText : '';

      let registrationData = {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        organization: organization,
      };

      axios.post(this.apiUrl + '/user/new/', registrationData, {responseType: 'json'})
        .then((res)=>{
          self.setState({'registrationPending': false});
          // if they aren't active but the ajax call was successful then we need a modal popup to check email for pw
          if (res.data.active) {
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
        })
        .catch((err)=>{
           self.setState({
            'registrationPending': false,
            'openModal': true,
            'modalTitle': 'Server Error',
            'modalContent': 'An issue occured and verification failed.',
          });
        });
    } else {
      self.setState({
        'openModal': true,
        'modalTitle': 'Form Incomplete',
        'modalContent': 'Please complete the required fields.',
      });

      if (self.state.password.length === 0) {
        self.setState({'password_error_text': 'This field is required'});
      };

      if (self.state.password_confirm.length === 0) {
        self.setState({'password_confirm_error_text': 'This field is required'});
      };

      if (self.state.email.length === 0) {
        self.setState({'email_error_text': 'This field is required'});
      };
    }
  }
  handleDialogClose() {
    history.push('/');
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
          <form onSubmit={this.handleSubmit}>
            <TextField
              hintText="Enter your Name"
              floatingLabelText="Name"
              onChange = {(event, newValue) => this.setState({name: newValue})}
            />
            <br/>
            <OrganizationMenu handleOrganizationChange={this.handleOrganizationChange}
                             value={this.state.organization_value}
                             menuItems={this.props.organizations}
                             style={{verticalAlign: 'bottom'}}
            />
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
              <RaisedButton type='submit'
                            label='Submit'
                            backgroundColor="#e6e6e6"
                            style={this.props.submitButtonStyle}
              />
            </div>
            {modal}
          </form>
          {this.state.registrationPending && <LoadingSpinner />}
        </div>
      </MuiThemeProvider>
    );
  }
}

RegisterForm.propTypes = {
  organizations: PropTypes.array,
  submitButtonStyle: PropTypes.object,
};

RegisterForm.defaultProps = {
  submitButtonStyle: {
    margin: 15,
  },
  organizations: [
    <MenuItem key={1} value={1} primaryText="RPS" />,
    <MenuItem key={2} value={2} primaryText="IOOS" />,
    <MenuItem key={3} value={3} primaryText="COMT" />,
    <MenuItem key={4} value={4} primaryText="LSU" />,
    <MenuItem key={5} value={5} primaryText="UNC" />,
    <MenuItem key={6} value={6} primaryText="VIMS" />,
  ],
};


export default RegisterForm;
