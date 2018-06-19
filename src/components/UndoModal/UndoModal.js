import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal component when a user want to undo changes to data
 */
class UndoModal extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {boolean} props.open - the state of the modal open/closed
   * @param {function} props.onAccept - function to be called when user clicks OK
   * @param {function} props.onDecline - function to be called when the user cancels the undo action
   * @return {object} - component
   */
  render() {
    const undoActions = [
      <RaisedButton
        label="Yes"
        primary={true}
        style={{marginRight: 12}}
        onClick={this.props.onAccept}
      />,
      <RaisedButton
        label="Cancel"
        onClick={this.props.onDecline}
      />,
    ];

    return (
      <Dialog
        actions={undoActions}
        open={this.props.open}
        onRequestClose={this.props.onDecline}
        modal={false}
      >
        Are you sure you want to undo all changes to this form?
      </Dialog>
    );
  }
}

UndoModal.propTypes = {
  open: PropTypes.bool,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
};

export default UndoModal;
