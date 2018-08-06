import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Form from "react-jsonschema-form";
import './SchemaFormEditor.css';

class SchemaFormEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schemaJson: '{\n"title": "A registration form",\n"description": "A simple form example.",\n"type": "object",\n"required": [\n  "firstName",\n  "lastName"\n],\n"properties": {\n  "firstName": {\n    "type": "string",\n    "title": "First name"\n  },\n  "lastName": {\n    "type": "string",\n    "title": "Last name"\n  },\n  "age": {\n    "type": "integer",\n    "title": "Age"\n  },\n  "bio": {\n    "type": "string",\n    "title": "Bio"\n  },\n  "password": {\n    "type": "string",\n    "title": "Password",\n    "minLength": 3\n  },\n  "telephone": {\n    "type": "string",\n    "title": "Telephone",\n    "minLength": 10\n  }\n}\n}',
      uiJSON: '{\n"firstName": {\n  "ui:autofocus": true,\n  "ui:emptyValue": ""\n},\n"age": {\n  "ui:widget": "updown",\n  "ui:title": "Age of person",\n  "ui:description": "(earthian year)"\n},\n"bio": {\n  "ui:widget": "textarea"\n},\n"password": {\n  "ui:widget": "password",\n  "ui:help": "Hint: Make it strong!"\n},\n"date": {\n  "ui:widget": "alt-datetime"\n},\n"telephone": {\n  "ui:options": {\n    "inputType": "tel"\n  }\n}\n}',
    };
  }
  render() {
    let parsedSchemaJSON = {};
    let parsedUIJSON = {};
    let parseErrorText;
    try {
      parsedSchemaJSON = JSON.parse(this.state.schemaJson.replace('\n', ''));
      parsedUIJSON = JSON.parse(this.state.uiJSON.replace('\n', ''));
    } catch (e) {
      parseErrorText = 'Error parsing json: ' + e;
    }
    return (
      <div id="editor-container">
        <div className="text-container">
          Schema JSON
          <textarea onChange={(e)=>{
            this.setState({'schemaJson': e.target.value});
          }}>
            {this.state.schemaJson}
          </textarea>
        </div>
        <div className="text-container">
        UI JSON
        <textarea onChange={(e)=>{
          this.setState({'uiJSON': e.target.value});
        }}>
          {this.state.uiJSON}
        </textarea>
        </div>
        <div>{parseErrorText}</div>
        <Form schema={parsedSchemaJSON} uiSchema={parsedUIJSON} onChange={(e, v)=>{
          console.log(e);
          console.log(v);
        }}/>
      </div>
    );
  }
}

export default SchemaFormEditor;
