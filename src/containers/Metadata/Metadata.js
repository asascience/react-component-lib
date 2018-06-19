import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {loadFromTemplate} from 'utils/general/fetchDataset.js';
import TabbedView from 'containers/TabbedView/TabbedView';
import AutocompleteDataset from 'containers/SearchTool/SearchTool';
import {modifyTableBodyHeight} from 'utils/DOM/DomManipulation';
import SessionExpiredModal from 'components/SessionExpiredModal/SessionExpiredModal';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Stepper page component used to render a table of ACDD metadata fields
 *
 */
class MetadataFormStep extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {object} props.jsonData - the json data object to be rendered in the table
   * @param {func} props.handleTextUpdate - callback function for when a metadata field is changed.
   */
  constructor(props) {
    super(props);

    this.state={
      templateModalOpen: false,
      sessionExpiredModalOpen: false,
      selectedDataset: {},
      tableHeight: 200,
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;

    this.handleSelectDataset = this.handleSelectDataset.bind(this);
    this.cancelTemplate = this.cancelTemplate.bind(this);
    this.fetchTemplate = this.fetchTemplate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.formatTabViewJSON = this.formatTabViewJSON.bind(this);
  }


  formatTabViewJSON(json) {
    // TODO: pathInJson should be replaced with keyInJson
    let transformedJSON = {};
    Object.keys(json).forEach((tabName)=>{
      transformedJSON[tabName] = json[tabName];
      let transformedContent = Object.keys(json[tabName]).map((key)=>{
        let rowObject = json[tabName][key];
        return [
          {
            text: rowObject['ui:name'],
            fieldType: 'textBox',
            disabled: rowObject['ui:disabled'] !== undefined ? rowObject['ui:disabled'] : true,
            hidden: rowObject['ui:hidden'] !== undefined ? rowObject['ui:hidden'] : false,
            description: rowObject['ui:description'],
          },
          {
            text: rowObject['ui:value'],
            fieldType: rowObject['ui:fieldType'],
            severity: rowObject['ui:severity'],
            pathInJson: key,
            options: rowObject.options,
          },
        ];
      });
      transformedJSON[tabName] = {header: [{text: 'Field Name'}, {text: 'Value'}], content: transformedContent};
    });
    return transformedJSON;
  }

  /**
   * Handles when a dataset is selected from the dropdown to load data from
   *
   * @param {object} dataset - the dataset object containing an id that will be accessed
   */
  handleSelectDataset(dataset) {
    this.setState({
      selectedDataset: dataset,
      templateModalOpen: true,
    });
  }

  /**
   * Handles when the cancel button is pressed on the template modal
   */
  cancelTemplate() {
    this.setState({
      templateModalOpen: false,
      selectedDataset: {},
    });
  }

  /**
   * Handles when the OK button is pressed on the template modal
   */
  fetchTemplate() {
    loadFromTemplate(this.state.selectedDataset.id, true);
    this.setState({
      templateModalOpen: false,
      selectedDataset: {},
    });
  }

  updateDimensions() {
    modifyTableBodyHeight('td', 'div', 'tag', true);
  }

  componentDidMount() {
    ['resize', 'load'].forEach(function(e) {
      window.addEventListener(e, this.updateDimensions, false);
    }, this);

    this.updateDimensions();
  }

  componentDidUpdate() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    ['resize', 'load'].forEach(function(e) {
      window.removeEventListener(e, this.updateDimensions, false);
    }, this);
  }

  render() {
    const actions = [
      <RaisedButton
        label='Cancel'
        primary={true}
        onClick={this.cancelTemplate}
        style={{marginRight: '10px'}}
      />,
      <RaisedButton
        label="Ok"
        primary={true}
        onClick={this.fetchTemplate}
      />,
    ];

    const combinedProps={...this.props};
    return (
      <div>
          <div className='loadFromContainer'>
            <AutocompleteDataset
              requestDataset={(dataset) => this.handleSelectDataset(dataset)}
              placeholder='&#xf002; Load metadata from template'
              buttonTitle="Select Template"
            />
          </div>
          <div className='data-tab'>
            <TabbedView jsonData={this.formatTabViewJSON(this.props.jsonData)}
                        tableType={'acdd'}
                        onTextUpdate={
                          (propKey, newValue) =>
                          this.props.handleTextUpdate(propKey, newValue)
                        }
                        unsaved={!this.props.saveDisabled}
            />
          </div>
          <Dialog
            title='Confirm Load from Template'
            open={this.state.templateModalOpen}
            actions={actions}
            modal={true}
          >
            <p><b>Are you sure you want to load from {
              this.state.selectedDataset.title ?
              this.state.selectedDataset.title :
              this.state.selectedDataset.id
            }?</b></p>
            <p>Doing so will overwrite your current metadata.</p>
          </Dialog>
          {this.state.sessionExpiredModalOpen &&
            <SessionExpiredModal
              {...combinedProps}
            />
          }
      </div>
    );
  }
}

MetadataFormStep.propTypes = {
  jsonData: PropTypes.object,
  handleTextUpdate: PropTypes.func,
};


export default MetadataFormStep;

