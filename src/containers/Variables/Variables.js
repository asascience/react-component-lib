import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {modifyTableBodyHeight} from 'utils/DOM/DomManipulation';
import TabbedView from 'containers/TabbedView/TabbedView';
import SessionExpiredModal from 'components/SessionExpiredModal/SessionExpiredModal';
import standardNames from 'utils/autocomplete/StandardNameFiltered.js';

/**
 * Stepper page component used to render a table of CF variables fields
 *
 * @prop {boolean} saveDisabled - whether edits have occured so the save button can be disabled
 */
class VariablesFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {object} props.jsonData - the json data object to be rendered in the table
   * @param {number} props.stepIndex - the index of the form page in the stepper layout
   * @param {function} props.handleBackButtonClick - callback to return to previous stepper page
   * @param {function} props.handleBackOut - callback to return to home page
   * @param {function} props.handleNextClick - callback to move to next page
   * @param {object} props.history - redux location manager passed in from parent container
   */
  constructor(props) {
    super(props);

    this.state={
      sessionExpiredModalOpen: false,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.updateDimensions = this.updateDimensions.bind(this);
    this.formatTabViewJSON = this.formatTabViewJSON.bind(this);
  }

  formatTabViewJSON(json) {
    let transformedJSON = {};
    let content = Object.keys(json).map((variableName, indx)=>{
      let rowObject = json[variableName];
      return [
        {
          text: rowObject['Variable Name'],
          fieldType: 'textBox',
          pathInJson: {variableName: variableName, field: 'Variable Name'},
          sortIndx: indx,
          disabled: true,
        },
        {
          text: (rowObject['Dimensions']).length + 'D',
          fieldType: 'numericBadge',
          data: rowObject['Dimensions'],
          disabled: true,
          pathInJson: {variableName: variableName, field: 'Dimensions'},
        },
        {
          text: rowObject['Units'],
          fieldType: 'textBox',
          pathInJson: {variableName: variableName, field: 'Units'},
          validated: rowObject.unitsValidated,
          validationTooltip: 'Invalid units. Units string must be recognized by UNIDATA\'s Udunits package',
        },
        {
          text: rowObject['Standard Name'],
          fieldType: 'textBox',
          pathInJson: {variableName: variableName, field: 'Standard Name'},
          options: standardNames,
          validated: rowObject.standardNameValidated,
          validationTooltip: 'Invalid standard_name. The set of permissible standard names is contained in the CF standard name table.',
        },
        {
          text: rowObject['Long Name'],
          fieldType: 'textBox',
          pathInJson: {variableName: variableName, field: 'Long Name'},
        },
      ];
    });
    let firstField = json[Object.keys(json)[0]]
    let filteredHeaders = Object.keys(firstField).filter((h) => {
      let excludeItems = ['standardNameValidated','unitsValidated', 'Short Name'];
      return excludeItems.indexOf(h) === -1 ? true : false;

    });
    let tabHeader = filteredHeaders.map((header)=>{
      // Set the sorting type for swap vertical
      let sortType;
      // Set the reference links for the header.
      let link;
      switch(header) {
        case 'Variable Name':
          sortType = 'alphabetical';
          break;
        case 'Dimensions':
          sortType = 'numeric';
          break;
        case 'Units':
          sortType = 'alphabetical';
          link = 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#units';
          break;
        case 'Standard Name':
          sortType = 'alphabetical';
          link = 'http://cfconventions.org/Data/cf-standard-names/27/build/cf-standard-name-table.html';
          break;
        case 'Long Name':
          sortType = 'alphabetical';
          link = 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#long-name';
          break;
        default:
          break;
      }

      return {
        text: header,
        sortType: sortType,
        link: link,
      };
    });

    transformedJSON['Variables'] = {header: tabHeader, content: content};

    return transformedJSON;
  }

  updateDimensions() {
    modifyTableBodyHeight('td', 'div', 'tag', true);
  }

  componentDidMount() {
    ['resize', 'load'].forEach(function(e) {
      window.addEventListener(e, this.updateDimensions, false);
    },this)
    this.updateDimensions();
  }

  componentDidUpdate() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    ['resize', 'load'].forEach(function(e) {
      window.removeEventListener(e, this.updateDimensions, false);
    },this)
  }

  render() {
    const combinedProps={...this.props};
    return (
      <div>
        <div className='data-tab'>
        <TabbedView jsonData={this.formatTabViewJSON(this.props.jsonData)}
                    tableType={'variables'}
                    headerEnabled={true}
                    onTextUpdate={
                      (pathInJson, newValue) =>
                      this.props.handleTextUpdate(pathInJson, newValue)
                    }
        />
        </div>
        {this.state.sessionExpiredModalOpen &&
          <SessionExpiredModal
            {...combinedProps}
          />
        } 
      </div>
    );
  }
}

VariablesFormStep.propTypes = {
  jsonData: PropTypes.object,
  stepIndex: PropTypes.number,
  handleBackButtonClick: PropTypes.func,
  handleBackOut: PropTypes.func,
  handleNextClick: PropTypes.func,
  history: PropTypes.object,
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {object} props.variables - the shared variables reference across all pages
 * @return {string} props.dataType - specifies the type of the data (i.e. 'Gridded Model' or 'Survey')
 * @return {string} props.uuid - the unique identifier of the dataset used for server calls
 * @return {object} props.json - the full json object returned by the server
 * @return {string} props.csrf - the csrf key passed back on server save calls
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    variables_orig: state.variables.original,
    variables: state.variables.content,
    dataType: state.flowData.type,
    uuid: state.flowData.uuid,
    json: state.flowData.json,
    csrf: state.flowData.csrf,
  };
};

export default connect(mapStateToProps, null)(VariablesFormStep);