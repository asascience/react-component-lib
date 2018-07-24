import React, { Component } from 'react';
import './URLBar.css';

class URLBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputUpdate(event) {
    this.setState({inputValue: event.target.value});
  }

  handleButtonClick(){
    this.props.onSearch(this.state.inputValue);
  }
  render() {
    return (
      <div id="url-bar-container">
        <input
          id="url-input"
          onChange={this.handleInputUpdate}
          onKeyPress={(event) => {
            if(event.key === 'Enter') {
              this.handleButtonClick();
            }
          }}
          placeholder="WMS Endpoint"
        />
        <button onClick={this.handleButtonClick}>Enter</button>
      </div>
    );
  }
}

export default URLBar;