import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Check from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info-outline';
import {green500, red500} from 'material-ui/styles/colors';

/*
* Component for an editable text box.
*/
class TableTextBox extends Component {
  /**
   * @param {object} props - the text box's props.
   * @param {string} props.text - the text to be displayed in the cell
   * @param {number} props.id - the unique id of the cell (determined in DataRow)
   * @param {boolean} props.disabled - whether the text field should be disabled for editing
   * @param {function} props.onTextUpdate - callback for when the field text is changed
   * @param {array} props.dataSource - optional data source array for autocomplete cells
   * @param {string} props.severity - 'required' if the field must be filled in
   * @param {object} props.pathInJson - an object with this shape {tab: "General", field: "title"}
   */

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
    this.onTextUpdate = this.debouncer(this.props.onTextUpdate, 400);
  }

  // updating the text for every keystroke is a bad idea (each one would cause some degree of rerender.)
  debouncer(func, wait) {
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      let later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text});
  }

  render() {
    let noVisibleText;
    if (this.props.text) {
      noVisibleText = false;
    } else {
      noVisibleText = true;
    }

    let textFieldStyle = {
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      maxWidth: '100%',
    };

    let textBox;
    if (!this.props.disabled) {
      let required = this.props.severity === 'required';

      // If a datasource is provided, assume that we want an autocomplete textbox.
      if (this.props.dataSource) {
        textBox = <AutoComplete
                    key={this.props.id}
                    fullWidth={true}
                    openOnFocus={true}
                    filter={AutoComplete.caseInsensitiveFilter}
                    value={this.state.text}
                    searchText={this.state.text}
                    dataSource={this.props.dataSource}
                    onUpdateInput={(newValue, index)=>{
                      this.setState({text: newValue});
                      this.onTextUpdate(this.props.pathInJson, newValue);
                    }}
                    onNewRequest={(chosenValue, index)=>{
                      this.props.onTextUpdate(this.props.pathInJson, chosenValue);
                    }}
                    hintText={required ? 'required field *' : 'suggested field'}
                    errorText ={(noVisibleText && required) === true ? 'This field is required' : undefined}
                    menuStyle = {{maxHeight: '200px'}}
                    anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                    targetOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    popoverProps={{style: {width: '400px'}}}
                    maxSearchResults={100}
                  />;
      } else {
        textBox = <TextField
          style={textFieldStyle}
          value={this.state.text}
          rowsMax={3}
          fullWidth={true}
          multiLine={true}
          errorText = {(noVisibleText && required) === true ? 'This field is required' : undefined}
          onChange={(event, newValue)=>{
            this.setState({text: newValue});
            this.onTextUpdate(this.props.pathInJson, newValue);
          }}
          hintText={required ? 'required field *' : 'suggested field'}
        />;
      }
    } else {
      textBox =<div style={textFieldStyle}>
        <p style={{fontSize: '16px', textAlign: 'left'}}>{this.props.text}</p>
      </div>;
    }


    // If there is a description in the object data, add a hover button to show it.
    let descriptionButton;
    if (this.props.description) {
      let width = 400;
      const infoToolTipStyle = {
        width: width,
        whiteSpace: 'normal',
        textAlign: 'justify',
        fontSize: 14,
      };

      // Approximate the # of lines to get height of info text to change top margin
      // so that the info text doesn't get clipped.
      let approxLines = Math.floor((this.props.description.length * 7.5) / 400);
      let topEntry = this.props.listIndex === 0;
      let topMargin = topEntry ? 20 : 30 + (approxLines * 17 * (topEntry ? 1: -1)) + 'px';
      descriptionButton = (<IconButton
        href={this.props.acddLinkUrl+this.props.text}
        target='_blank'
        tooltip={<div style={infoToolTipStyle}>{this.props.description}</div>}
        tooltipStyles={{opacity: 0.95, zIndex: 9999, marginLeft: '40px', marginTop: topMargin}}
        tooltipPosition={'top-right'}>
          <Info color='#0645AD'/>
        </IconButton>
      );
    }

    // If validation done on the input, display the correct validation icon.
    let validated;
    if (this.props.validated !== undefined && this.props.validated !== null) {
      let errorElements = (
        <IconButton tooltip={this.props.validationTooltip}>
          <ErrorOutline color={red500}/>
        </IconButton>
      );
      validated = this.props.validated ? <Check color={green500}/> : errorElements;
    }

    return (
      <div style={{'width': '100%', 'display': 'flex', 'justifyContent': 'flex-start'}}>
        {textBox}
        {descriptionButton}
        {validated}
      </div>
    );
  }
}

TableTextBox.propTypes = {
  acddLinkUrl: PropTypes.string,
  dataSource: PropTypes.array,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.number,
  listIndex: PropTypes.number,
  onTextUpdate: PropTypes.func,
  pathInJson: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  severity: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
  validated: PropTypes.bool,
  validationTooltip: PropTypes.string,
};


export default TableTextBox;
