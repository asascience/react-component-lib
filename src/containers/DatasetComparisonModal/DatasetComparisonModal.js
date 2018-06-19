import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DataChangeReport from 'containers/DataChangeReport/DataChangeReport';
import {updateVariableOriginal} from 'utils/general/fetchDataset.js';

/**
 * A modal component so that the user can review their changes before saving.
 */
class DatasetComparisonModal extends Component {
  /**
   * @param {object} props - Props to be passed into this component
   * @param {boolean} props.open - the state of the modal open/closed
   * @param {function} props.onSave - function to be called when user clicks Save
   * @param {function} props.onDecline - function to be called when the user cancels the undo action
   * @param {object} props.variableData - variable change data to be passed to the dataChangeReport Component.
   * @param {object} props.metadata - metadata change data to be passed to the dataChangeReport Component.
   * @return {object} - component
   */

  constructor(props) {
    super(props);

    // We keep track of the open state here, because the dialog component itself won't open until the data is loaded.
    this.state = {
      isLoadingChanges: true,
      open: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snap) {
    // When the props.open changes from false to true-when the dialog is opened.
    if (this.props.open === true && prevProps.open === false) {
      this.setState({isLoadingChanges: true});

      // Fetch the current dataset on the db and compare with current state (updates variable and metadata change states.)
      updateVariableOriginal((success, err)=>{
        this.setState({isLoadingChanges: false, open: this.props.open});
      });
    }

    // If the props changes open to false, close the dialog.
    if (this.props.open === false && prevProps.open === true) {
      this.setState({open: false});
    }
  }

  render() {
    // transform the variable changes to match the schema required in the data change report.
    let transformedVariableChanges = Object.keys(this.props.variableChanges).map((sectionKey)=>{
      return {
        sectionName: sectionKey,
        changes: Object.keys(this.props.variableChanges[sectionKey]).map((changeKey)=>{
          return this.props.variableChanges[sectionKey][changeKey];
        }),
      };
    });

    const undoActions = [
      <RaisedButton
        label="Save"
        primary={true}
        style={{marginRight: 12}}
        onClick={this.props.onSave}
      />,
      <RaisedButton
        label="Cancel"
        onClick={this.props.onDecline}
      />,
    ];

    let loadingSpinnerDOM;
    if (this.state.isLoadingChanges && this.props.open) {
      loadingSpinnerDOM = (<LoadingSpinner onCancel={()=>{
        this.setState({open: false, isLoadingChanges: false});
      }}/>);
    }

    return (
      <div>
        <Dialog
          title="Review Changes"
          actions={undoActions}
          open={this.state.open}
          onRequestClose={this.props.onDecline}
          modal={false}
          autoScrollBodyContent={true}
        >
          <div style={{margin: '15px'}}>
            <DataChangeReport
              title="Metadata Changes"
              tableData={[{changes: this.props.metaDataChanges}]}
            />
            <DataChangeReport
              title="Variable Changes"
              tableData={transformedVariableChanges}
            />
          </div>
        </Dialog>
        {loadingSpinnerDOM}
      </div>
    );
  }
}


/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {object} props.metaDataChanges - the changes to the metaData that the user has made.
 * @return {object} props.variableChanges - the changes to the variables that the user has made.
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    metaDataChanges: state.metadata.changes,
    variableChanges: state.variables.changes,
  };
};

/**
 * @typedef {function} handleSaveData
 * @global
 * @description Handles the posting of the data to the server on save
 * @param {object} newData - the new edited data used in the UI
 * @param {object} originalData - the original json object used to populate the pages
 * @param {string} dataType - describes the data type, i.e. 'metadata' or 'variables'
 * @param {string} id - the unique identifier of the dataset for server calls
 */

 /**
 * @typedef {function} handleFinalSubmit
 * @global
 * @description dispatches a submit button clicked action to the upload connector
 * @param {object} submitted - object with the shape {submit: true}
 */

 /**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @return {handleSaveData}
 * @return {changeStep}
 */

const mapDispatchToProps = (dispatch)=>{
  return {
    // handleSaveData: (newData, originalData, dataType, id)=>{
    //   dispatch(saveData(newData, originalData, dataType, id));
    // },
    // handleFinalSubmit: (submitted)=>{
    //   dispatch(dataSubmitted(submitted));
    // },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DatasetComparisonModal);
