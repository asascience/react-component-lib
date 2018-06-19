import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

/*
* A tag input field that allows users to pick several tags out of a set of suggestions.
*/
class TagInput extends Component {
  /**
   * @param {object} props - the text box's props.
   * @param {string} props.text - the text to be displayed in the cell
   * @param {number} props.id - the unique id of the cell (determined in DataRow)
   * @param {boolean} props.disabled - whether the text field should be disabled for editing
   * @param {function} props.onTextUpdate - callback for when the field text is changed
   * @param {array} props.dataSource - optional data source array for autocomplete cells
   * @param {string} props.severity - 'required' if the field must be filled in
   * @param {object} props.pathInJson - an object with this shape {tab: "General", field: "title"}
   * @param {object} props.style - styles to be applied.
   */
  constructor(props) {
    super(props);

    // Have a local state for the data array so that there is no lag on update.

    this.state = {
      valueArray: this.props.text.length !== 0 ? this.props.text.split(',') : [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({valueArray: nextProps.text.length !== 0 ? nextProps.text.split(',') : []});
  }
  render() {
    return (
      <div style={{
        width: '100%',
        height: 'auto',
        overflow: 'auto',
      }}>
        <ChipInput
          style={{
            display: 'inline-block',
            width: '100%',
            marginBottom: '0px',
            marginLeft: '0px',
          }}
          key={this.props.id}
          dataSource={this.props.dataSource}
          disabled={this.props.disabled}
          value={this.state.valueArray}
          onRequestAdd={(value)=>{
            // Add the value to the data array and callback updates.
            if (this.state.valueArray.indexOf(value) === -1) {
              this.setState({valueArray: this.state.valueArray.concat(value)}, ()=>{
                this.props.onTagUpdate(this.state.valueArray.join(','));
              });
            }
          }}
          onRequestDelete={(value)=>{
            // Remove the value from the state and send a callback up.
            let index = this.state.valueArray.indexOf(value);
            if (index !== -1) {
              this.setState({valueString: this.state.valueArray.splice(index, 1)}, ()=>{
                this.props.onTagUpdate(this.state.valueArray.join(','));
              });
            }
          }}
          onBlur={(event) => {
            let value = event.target.value.trim();
            if (value !== '' && this.state.valueArray.indexOf(value) === -1) {
              this.setState({valueArray: this.state.valueArray.concat(value)}, ()=>{
                this.props.onTagUpdate(this.state.valueArray.join(','));
              });
            }
          }}
        />
      </div>
    );
  }
}


TagInput.defaultProps = {
  id: 0,
  disabled: false,
  text: 'test',
  onTagUpdate: () => {},
};

TagInput.propTypes = {
  id: PropTypes.number,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  onTagUpdate: PropTypes.func,
  dataSource: PropTypes.array,
  listIndex: PropTypes.number,
  pathInJson: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  severity: PropTypes.string,
  style: PropTypes.object,
};

export default TagInput;
