import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './SchemaForm.css';

class ValidationTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.defaultValue || '',
    };
  }
  render() {
    let errorText;
    if (this.props.minLength && this.props.minLength > this.state.text.length) {
      errorText = 'Min Length ' + this.props.minLength;
    } else if(this.props.maxLength && this.props.maxLength < this.state.text.length) {
      errorText = 'Max Length ' + this.props.minLength;
    }
    return(
      <TextField onChange={(e, val)=>{
          this.setState({text: val});
          this.props.onChange && this.props.onChange(e, val);
        }}
        errorText={errorText}
      />
    )
  }
}

class SchemaForm extends Component {
  render() {
    let fieldDOM;
    if(this.props.schemaJson.fields !== undefined)
    fieldDOM = Object.keys(this.props.schemaJson.fields).map((fieldKey)=>{
      let fieldObject = this.props.schemaJson.fields[fieldKey];
      return(
        <div>
          <div>{fieldObject.title}</div>
          <div>
            <ValidationTextField
              minLength={fieldObject.minLength}
              onChange={(e, val)=>{
                this.props.onUpdate(fieldKey, val)
              }}
            />
          </div>
        </div>
      )
    });
    return (
      <div id="schema-form-container">
        <div>{this.props.schemaJson.title}</div>
        <div>{this.props.schemaJson.description}</div>
        <div>
          {fieldDOM}
        </div>
      </div>
    );
  }
};


export default SchemaForm;
