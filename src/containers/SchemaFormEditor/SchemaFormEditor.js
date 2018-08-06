import React, {Component} from 'react';
import SchemaForm from '../../components/SchemaForm/SchemaForm.js';
import RaisedButton from 'material-ui/RaisedButton';
import './SchemaFormEditor.css';

class SchemaFormEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schemaJson: '{\n"title": "A registration form",\n"description": "A simple form example.",\n"fields": {\n  "firstName": {\n    "type": "string",\n    "title": "First name"\n  },\n  "lastName": {\n    "type": "string",\n    "title": "Last name"\n  },\n  "age": {\n    "type": "integer",\n    "title": "Age"\n  },\n  "bio": {\n    "type": "string",\n    "title": "Bio"\n  },\n  "password": {\n    "type": "string",\n    "title": "Password",\n    "minLength": 3\n  },\n  "telephone": {\n    "type": "string",\n    "title": "Telephone",\n    "minLength": 10\n  }\n}\n}',
    }
  }

  render() {
    let parsedJSON = {};
    let parseErrorText;
    try {
      parsedJSON = JSON.parse(this.state.schemaJson.replace('\n', ''));
    } catch (e) {
      parseErrorText = 'Error parsing json';
    }
    return (
      <div id="editor-container">
        <textarea onChange={(e)=>{
          this.setState({'schemaJson': e.target.value});
        }}>
          {this.state.schemaJson}
        </textarea>
        <div>{parseErrorText}</div>
        <SchemaForm schemaJson={parsedJSON} onUpdate={(fieldName, value)=>{
          console.log(fieldName + ' changed to: ' + value);
        }}/>
      </div>
    );
  }
}

export default SchemaFormEditor;
