import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import LoginForm from 'containers/LoginForm/LoginForm';
import RegisterForm from 'containers/RegisterForm/RegisterForm';
import './Login.css';

/**
 * The login page
 */
class Login extends Component {
  constructor(props) {
    super(props);
    let loginButtons = [];
    loginButtons.push(
      <div key="0">
      <MuiThemeProvider>
        <div>
           <RaisedButton label={'Register'} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    );

    this.state = {
      username: '',
      password: '',
      loginscreen: [],
      loginmessage: [],
      loginButtons: loginButtons,
      registerbuttonLabel: 'Register',
      isLogin: 'login_page',
    };
  }

  componentWillMount() {
    let loginscreen = [];
    let loginmessage = [];
    loginscreen.push(<LoginForm key="0" parentContext={this}/>);
    loginmessage.push(<p key="0" style={{color: '#737373', fontSize: 12}}>Not registered yet? Register Now</p>);
    this.setState({
      loginscreen: loginscreen,
      loginmessage: loginmessage,
    });
  }

  handleClick(event) {
    let loginmessage = [];
    let loginscreen = [];
    let loginButtons = [];
    if (this.state.isLogin === 'login_page') {
      loginscreen.push(<RegisterForm key="0" parentContext={this} />);
      loginmessage.push(<p key="0" style={{color: '#737373', fontSize: 12}}>Already registered? Go to Sign in</p>);
      loginButtons.push(
        <div key="0">
        <MuiThemeProvider>
          <div>
             <RaisedButton label={'Sign in'} style={{clear: 'both'}} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
        </div>
      );
      this.setState({
                     loginscreen: loginscreen,
                     loginmessage: loginmessage,
                     loginButtons: loginButtons,
                     isLogin: 'register_page',
                   });
    } else {
      loginButtons.push(
        <div key="0">
        <MuiThemeProvider>
          <div>
             <RaisedButton label={'Register'} style={{clear: 'both'}} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
        </div>
      );
      loginscreen.push(<LoginForm key="0" parentContext={this} appContext={this.props.appContext} />);
      loginmessage.push(<p key="0" style={{color: '#737373', fontSize: 12}}>Not registered yet? Register Now</p>);
      this.setState({
                     loginscreen: loginscreen,
                     loginmessage: loginmessage,
                     loginButtons: loginButtons,
                     isLogin: 'login_page',
                   });
    }
  }


  render() {
    const signInTabStyle = {
      width: 120,
      height: 40,
      lineHeight: '40px',
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 12,
      backgroundColor: '#003087',
      position: 'absolute',
      right: 0,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    };

    let tab = null;
    if (this.state.isLogin === 'login_page') {
      tab = <span><i className='fa fa-user' aria-hidden='true'></i> SIGN IN </span>;
    } else if (this.state.isLogin === 'register_page') {
      tab = 'REGISTER';
    } else {
      tab = 'FORGOT PW';
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="loginscreen-outer">
            <div style={{height: 40}}>
              <div style={signInTabStyle}>
                {tab}
              </div>
            </div>
            <div className="loginscreen-inner">
              {this.state.loginscreen}
              <div>
                {this.state.loginmessage}
                {this.state.loginButtons}
              </div>
            </div>
            <p style={{color: '#999', fontSize: 13}}>&copy; Copyright {(new Date()).getFullYear()}. All rights Reserved.</p>
          </div>
        </div>
      </MuiThemeProvider>
      
    );
  }
}

export default Login;
