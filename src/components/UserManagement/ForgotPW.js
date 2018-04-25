import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';


class ForgotPW extends Component {
  constructor(props) {
    super(props);
    this.state={
      email: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }
  handleClick(event, role) {
    let self = this;
    // To be done:check for valid email
    let validEmail = true;
    if(validEmail) {
      let loginscreen=[];
      loginscreen.push(<Login parentContext={self} appContext={self.props.appContext}/>);

      let loginmessage = 'Not Registered yet? Go to registration';

      self.props.parentContext.setState({loginscreen: loginscreen,
        loginmessage: loginmessage,
        buttonLabel: 'Register',
        isLogin: true,
        forgotPW: false,
      });

      // Placeholder
      alert('This feature isn\'t enabled. Please contact Brian.McKenna@rpsgroup.com');
      // use history prop instead so no page reload?
      window.location.href = window.location.origin;
    } else {
      alert('Non valid email');
    }
  };
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default ForgotPW;
