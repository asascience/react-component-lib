import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeProjectName} from 'redux/actions/Actions.js';
import ProjectSelector from 'containers/ProjectSelector/ProjectSelector';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {muiTheme} from '../../theme.js';
import './HomePage.css';

/**
 * Home page container
 */
class HomePage extends Component {
  /**
   * @param {object} props - the props passed to the component
   * @param {boolean} props.sessionExpired - is the session expired
   * @param {function} props.handleProjectChange - dispatches an event to the the upload connector to update the project name
   */

  constructor(props) {
    super(props);

    this.handleProjectSelect = this.handleProjectSelect.bind(this);
  }

  /**
  * function to update the projectName in both session storage and in redux state
  *
  @param {string} projectName - the project or service name
  */
  handleProjectSelect(projectName) {
    this.props.handleProjectChange(projectName);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <ProjectSelector onChoose={this.handleProjectSelect} />
      </MuiThemeProvider>
    );
  }
}

/**
 * @typedef {function} handleProjectChange
 * @global
 * @description Controls the selection of a upload service type from the service chooser
 * @param {string} projectName - the name of the selected service
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleProjectSelect}
 */
const mapDispatchToProps = (dispatch)=>{
  return {
    handleProjectChange: (projectName) => {
      dispatch(changeProjectName(projectName));
    },
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
