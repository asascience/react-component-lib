import React from 'react';
import PropTypes from 'prop-types'; 
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * A loading spinner component
 */
class LoadingSpinner extends React.Component {
  /**
  * @param {object} props - the props passed to the component.
  * @param {object} props.divStyle - the style of the div that contains the spinner
  * @param {object} props.spinnerStyle - the style of the spinner
  * @param {function} props.onCancel - cancel callback function.
  * @return {object} - component
  */

  render() {
    return (
      <div>
        <div style={this.props.divStyle}>
          <CircularProgress size={120} thickness={5} style={this.props.spinnerStyle}/>
          <FlatButton primary={true} label="Cancel" onClick={()=>{
            this.props.onCancel && this.props.onCancel();
          }}/>
        </div>
      </div>
    );
  }
}

LoadingSpinner.defaultProps = {
  divStyle: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(128, 128, 128, 0.5)',
    zIndex: 1101,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerStyle: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 0 20px #000',
    zIndex: 1102,
  },
};

LoadingSpinner.propTypes = {
  divStyle: PropTypes.object,
  spinnerStyle: PropTypes.object,
};

export default LoadingSpinner;
