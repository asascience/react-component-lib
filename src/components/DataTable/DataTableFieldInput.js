import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Check from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import Info from 'material-ui/svg-icons/action/info-outline';
import {green500, red500} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ChipInput from 'material-ui-chip-input';
import moment from 'moment';

/*
* DatatableFieldInput - a wrapper class that takes json data for a input field and returns an appropriate ui element.
* Props:
* objectData - an object containing information about the input to be rendered including
* disabled - whether the element is disabled.
* onUpdate - a function to be called when the input value changes.
* index && uniqueID - used for assigning ids.
*/

class DataTableFieldInput extends Component {
  render() {
    let element;
    switch (this.props.objectData.fieldType) {
      case 'datePicker':
        element = (
          <DataDatePicker
            style={{width: '100%'}}
            parsedDate={this.props.objectData.date}
            key={this.props.index}
            id={this.props.index}
            pathInJson={this.props.objectData.pathInJson}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onDateUpdate={(pathInJson, newValue) => {
              let parsedDate = moment(newValue).format('YYYY-MM-DD');
              this.props.onUpdate(pathInJson, parsedDate);
            }}
            disabled={this.props.disabled}
          />
        );
        break;
      case 'dropdown':
        element = (
          <Dropdown
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            pathInJson={this.props.objectData.pathInJson}
            dataSource={this.props.objectData.dataSource}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onTextUpdate={this.props.onUpdate}
            disabled={this.props.objectData.disabled}
            options={this.props.objectData.options}
          />
        );
        break;
      case 'tagInput':
        element = (
          <DataTagInput
            style={{width: '100%'}}
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            pathInJson={this.props.objectData.pathInJson}
            dataSource={this.props.objectData.dataSource || this.props.objectData.options}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onTagUpdate={(newValue) => {
              this.props.onUpdate(this.props.objectData.pathInJson, newValue);
            }}
            disabled={this.props.disabled}
          />
        );
        break;
      default:
        element = (
          <DataTextBox
            style={{width: '500px'}}
            key={this.props.index}
            id={this.props.index}
            text={this.props.objectData.text}
            pathInJson={this.props.objectData.pathInJson}
            dataSource={this.props.objectData.dataSource || this.props.objectData.options}
            acddLinkUrl={this.props.acddLinkUrl}
            description={this.props.objectData.description}
            severity={this.props.objectData.severity}
            listIndex={this.props.uniqueID}
            onTextUpdate={this.props.onUpdate}
            disabled={this.props.objectData.disabled}
            validated={this.props.objectData.validated}
            validationTooltip={this.props.objectData.validationTooltip}
          />
        );
        break;
    }
    return(
      element ? element : null
    );
  }
}

class DataTagInput extends Component {

  // Have a local state for the data array so that there is no lag on update.
  constructor(props) {
    super(props);
    this.state = {
      valueArray: this.props.text.length !== 0 ? this.props.text.split(',') : [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({valueArray: nextProps.text.length !== 0 ? nextProps.text.split(',') : []});
  }
  render() {
    return(
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
            if(this.state.valueArray.indexOf(value) === -1) {
              this.setState({valueArray: this.state.valueArray.concat(value)}, ()=>{
                this.props.onTagUpdate(this.state.valueArray.join(','));
              });
            }
          }}
          onRequestDelete={(value)=>{
            // Remove the value from the state and send a callback up.
            let index = this.state.valueArray.indexOf(value);
            if(index !== -1) {
              this.setState({valueString: this.state.valueArray.splice(index, 1)}, ()=>{
                this.props.onTagUpdate(this.state.valueArray.join(','));
              });
            }
          }}
          onBlur={event => {
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

/* Props:
* id - unique id for key
* onChange - callback for selecting new option
* disabled - whether the dropdown should be disabled
*/
/**
 * A date selection view for the data table
 */
class Dropdown extends Component {
    /**
     * @param {array} [props.dataSource] - data source array for dropdown
     */

    constructor(props) {
        super(props);
        this.state = {
            value: 'test',
        };
        this.onTextUpdate = this.props.onTextUpdate;
        this.handleChange = (event, index, value) => this.setState({value});
    }


    render() {
        // builds dropdown menu options from options defined in schema/ACDD.js
        let dropdownOptions = this.props.options.map((option, i) => {
            return <MenuItem key={i} value={option} primaryText={option} />;
        });

        return <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
                style={{flex: 0.6}}
                autoWidth={false}
               >
          {dropdownOptions}
        </DropDownMenu>;
    }
}

/* Props:
* id - unique id for key
* onChange - callback for selecting new date
* disabled - whether the date picker should be disabled
*/
/**
 * A date selection view for the data table
 */
class DataDatePicker extends Component {
  /**
   * @param {string} props.parsed - a parsed version of the date selection
   * @param {boolean} props.disabled - whether the date picker should be disabled for editing
   * @param {function} props.onDateUpdate - callback for when the date selection is changed
   */

  render() {
    let date;
    if (this.props.parsedDate) {
      date = moment(this.props.parsedDate).toDate();
    }
    let datePicker;
    if (!this.props.disabled) {
      datePicker = <DatePicker
                      defaultDate={date}
                      hintText="Select Date"
                      container="inline"
                      errorText={date === undefined ? 'This field is required' : undefined}
                      onChange={(event, newDate) => this.props.onDateUpdate(this.props.pathInJson, newDate)}
                   />;
    } else {
      datePicker =
        <p style={{display: 'inline-block', fontSize: '16px', textAlign: 'center'}}>{this.props.parsedDate}</p>;
    }
    return(
      datePicker
    );
  }
}


/*
* Component for an editable text box.
* props:
* autocomplete - boolean indicates if the object should be an autocomplete element. (optional)
* id - unique id used to generate a key
* text - default text
* dataSource - dataSource for autocomplete (optional)
* onTextUpdate - callback for changes with params (pathInJson, newValue);
* disabled - whether the text field should be disabled
*/
/**
 * An editable data text box for the data table
 */
class DataTextBox extends Component {
  /**
   * @param {string} props.text - the text to be displayed in the cell
   * @param {number} props.id - the unique id of the cell (determined in DataRow)
   * @param {boolean} props.disabled - whether the text field should be disabled for editing
   * @param {function} props.onTextUpdate - callback for when the field text is changed
   * @param {array} [props.dataSource] - optional data source array for autocomplete cells
   * @param {string} severity - 'required' if the field must be filled in
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
    let textBox;
    if (!this.props.disabled) {
      let required = this.props.severity === 'required';
      if (this.props.dataSource) {
        textBox = <AutoComplete
                    key={this.props.id}
                    fullWidth={true}
                    openOnFocus={true}
                    filter={AutoComplete.caseInsensitiveFilter}
                    value={this.state.text}
                    searchText={this.props.text}
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
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    targetOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    popoverProps={{style: {width: '400px'}}}
                    maxSearchResults={100}
                  />;
        } else {
          let numberOfRows = this.state.text && this.state.text.length/60;
          textBox = <TextField
            style={{
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              width: '100%',
            }}
            value={this.state.text}
            rowsMax={3}
            rows={Math.ceil(numberOfRows)}
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
        textBox =<div>
          <p style={{fontSize: '16px', textAlign: 'center', overflow: 'hidden', 'textOverflow': 'ellipsis'}}>{this.props.text}</p>
        </div>;
      }


      // If there is a description in the object data, add a hover button to show it.
      let descriptionButton;
      if(this.props.description) {
        const infoToolTipStyle = {
          width: 400,
          whiteSpace: 'normal',
          textAlign: 'justify',
          fontSize: 14,
        };
        descriptionButton = (<IconButton
          href={this.props.acddLinkUrl+this.props.text}
          target='_blank'
          tooltip={<div style={infoToolTipStyle}>{this.props.description}</div>}
          tooltipStyles={{opacity: 0.95, zIndex: 9999, left: 80}}
          tooltipPosition={this.props.listIndex === 0 ? "bottom-right" : "top-right"}>
            <Info color='#0645AD'/>
          </IconButton>
        );
      }

      // If validation done on the input, display the correct validation icon.
      let validated;
      if(this.props.validated !== undefined && this.props.validated !== null) {
        let errorElements = (
          <IconButton tooltip={this.props.validationTooltip}>
            <ErrorOutline color={red500}/>
          </IconButton>
        );
        validated = this.props.validated ? <Check color={green500}/> : errorElements;
      }

      return (<div style={{width: '100%', display: 'flex', 'justifyContent': 'flex-start'}}>
        {textBox}
        {descriptionButton}
        {validated}
        </div>);
    }
  }


export default DataTableFieldInput;
