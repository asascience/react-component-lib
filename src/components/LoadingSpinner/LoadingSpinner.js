import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const divStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'grey',
  zIndex: 1101,
  opacity: 0.8,
};

const spinnerStyle = {
  position: 'fixed',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1102,
};

class LoadingScreen extends React.Component {
  render() {
    return (
      <div>
        <div style={divStyle}></div>
        <CircularProgress size={120} thickness={5} style={spinnerStyle}/>
      </div>
    );
  }
}

export default LoadingScreen;
