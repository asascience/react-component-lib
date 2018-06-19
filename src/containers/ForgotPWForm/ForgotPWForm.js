import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LoginForm from 'containers/LoginForm/LoginForm';
import history from '../../history';

/**
* The forgot password form
*/
class ForgotPWForm extends Component {
   /**
  * @param {object} props - the props passed to the component.
  * @param (object) props.parentContext - the props and state of the parent component (Login page)
  * @return {object} - component
  */

  constructor(props) {
    super(props);
    this.state={
      email: '',
    };
  }

  handleClick(event, role) {
    let self = this;
    let validEmail = true;
    if (validEmail) {
      let loginscreen=[];
      loginscreen.push(<LoginForm parentContext={self} />);

      let loginmessage = 'Not Registered yet? Go to registration';

      self.props.parentContext.setState({loginscreen: loginscreen,
        loginmessage: loginmessage,
        buttonLabel: 'Register',
        isLogin: true,
        forgotPW: false,
      });

      // Placeholder
      alert('This feature isn\'t enabled. Please contact Brian.McKenna@rpsgroup.com');
      history.push('/');
    } else {
      alert('Non valid email');
    }
  };
  render() {
    return (
      <MuiThemeProvider>
        <div>
         <TextField
           hintText="Enter your email"
           floatingLabelText="Email"
           fullWidth={true}
           onChange = {(event, newValue) => this.setState({email: newValue})}
         />
         <br/>
         <div style={{textAlign: 'right'}}>
          <RaisedButton label="Submit" backgroundColor="#e6e6e6" onClick={(event) => this.handleClick(event)}/>
         </div>
        </div>
       </MuiThemeProvider>
    );
  }
}

ForgotPWForm.propTypes = {
  parentContext: PropTypes.object,
}

export default ForgotPWForm;
