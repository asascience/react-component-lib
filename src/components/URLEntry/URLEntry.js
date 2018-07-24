import React, { Component } from 'react';
import URLBar from './URLBar.js';
import axios from 'axios';
import './URLEntry.css'

class URLEntry extends Component {
  constructor(props){
    super(props);

    this.state = {
      outputValue: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value){
    //console.log(encodeURIComponent(value));
    let url = 'https://m2q2c4bs3b.execute-api.us-east-1.amazonaws.com/PRODUCTION/GetCapabilities?url=' + encodeURIComponent(value);
    //console.log(url);
    axios.get(url).then((res)=>{
      this.props.getCapabilitiesResult(res.data.content);
    })

    this.props.updateSearchValue(value);
  }
  render() {
    return (
      <div id="url-entry-container">
        <div id="url-bar-outer">
          <div id="url-bar-label">🔍</div>
          <URLBar id="url-bar" onSearch={this.handleSearch}/>
        </div>
      </div>
    );
  }
}

export default URLEntry;