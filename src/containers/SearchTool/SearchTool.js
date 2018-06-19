import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateCSRFToken, uploadAxiosPromise} from 'utils/security/securityUtilities.js';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Search component used to render a list of selectable datasets and a select button
 *
 * @prop {boolean} dataSelected - whether a data selection has been made
 * @prop {Array.<Object>} json - the full json object returned from the server
 * @prop {Array.<Object>} autocompleteJson - the trimmed array of selectable datasets to be displayed
 * @prop {string} inputValue - the current text in the text field
 */
class AutocompleteDataset extends Component {
  /**
   * @param {string} props.placeholder - a placeholder string for the textfield component
   * @param {string} props.buttonTitle - an optional title to override the default button text of 'Select Dataset'
   * @param {function} props.requestDataset - callback for when a dataset is selected and confirmed by the button
   */
  constructor(props) {
    super(props);

    this.state = {
      dataSelected: false,
      json: [],
      autocompleteJson: [],
      inputValue: '',
    };

    this.apiUrl = process.env.REACT_APP_UPLOAD_SERVER_IP;
    this.maxResults = 15;
    this.getTextValue = this.getTextValue.bind(this);
    this.handleAutocompleteChange = this.debounce(this.handleAutocompleteChange, 500).bind(this);
  }

  /**
   * Debounce function to prevent ajax calls from backing up
   * Debouncing enforces that a function not be called again until
   * a certain amount of time has passed without it being called.
   *
   * @param {function} func - the generic function to be called
   * @param {number} wait - the timeout delay to be set
   * @param {boolean} immediate - whether the function should be called immediately
   *
   * @return {function} - returns the callable function with reset timeout
   */
  debounce(func, wait, immediate) {
    let timeout;
    let self = this;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func.apply(self, args);
      }, wait);
      if (immediate && !timeout) func.apply(self, [...args]);
    };
  }

  /**
   * Controls the initial dataset search on component mounting (crsfToken)
   */
  componentDidMount() {
    let self = this;
    let url = this.apiUrl + '/dataset/';
    let ajaxCall = uploadAxiosPromise(url);

    ajaxCall.then(function(res) {
      updateCSRFToken(res.request);
      self.setState({json: res.data, autocompleteJson: res.data.slice(0, self.maxResults)});
    });

     ajaxCall.catch(function(error) {
      console.error(error);
      updateCSRFToken(error.request);
    });
  }

  /**
   * Returns the dataset associated with a given input
   */
  getTextValue() {
    let input = this.state.inputValue;
    let datasetIndex = this.state.json.findIndex(function(dataset) {
      return input === dataset.title || input === dataset.id;
    });

    if (datasetIndex >= 0) {
      this.setState({dataSelected: true});
      this.props.requestDataset(this.state.json[datasetIndex]);
    } else {
      alert('This is not a valid dataset!');
    }
  }

  /**
   * Callback to handle the autocomplete changes
   *
   * @param {object} event - edit event object for the autocomplete change
   */
  onChangeCallback(event) {
    event.persist();
    this.handleAutocompleteChange(event);
  }

  /**
   * Handles updates to the autocomplete search field
   *
   * @param {object} event - the edit event object, event.target.value is the search text
   */
  handleAutocompleteChange(event) {
    let self = this;
    let url;
    let searchText = event.target.value;

    if (searchText !== '') {
      url = this.apiUrl + '/dataset/?q=' + searchText;
    } else {
      url = this.apiUrl + '/dataset/' + searchText;
    }

    let ajaxCall = uploadAxiosPromise(url);

     ajaxCall.then(function(res) {
      updateCSRFToken(res.request);
      self.setState({autocompleteJson: res.data.slice(0, self.maxResults)});
    });

    ajaxCall.catch(function(error) {
      updateCSRFToken(error.request);
      console.error(error);
    });

    this.setState({inputValue: searchText});
  }

  render() {

    const searchbarStyle = {
      marginTop: 20,
      marginBottom: 20,
      padding: 10,
      width: '35%',
      textOverflow: 'ellipsis',
      fontSize: 18,
      fontFamily: 'FontAwesome, Arial, Helvetica, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: 'inherit'
    }

    return (
      <div>
        <input
          type='text'
          list='dataset-list'
          style={searchbarStyle}
          placeholder={this.props.placeholder}
          onChange={this.onChangeCallback.bind(this)}
        />
        <datalist id='dataset-list'>
          {this.state.autocompleteJson.map(
            (opt, i) =>
            <option key={i}>{this.state.autocompleteJson[i].title ?
              this.state.autocompleteJson[i].title :
              this.state.autocompleteJson[i].id}
            </option>)
          }
        </datalist>
        <RaisedButton
          label={this.props.buttonTitle || 'Select Dataset'}
          onClick={this.getTextValue}
          backgroundColor='#0a548b'
          labelColor='#ffffff'
          style={{marginLeft: 15, boxShadow: 'black 2px 2px 5px'}}
        />
      </div>
    );
  }
}

AutocompleteDataset.propTypes = {
  placeholder: PropTypes.string,
  buttonTitle: PropTypes.string,
  requestDataset: PropTypes.func,
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.csrf - the csrf token (now csrf)
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    csrf: state.flowData.csrf,
  };
};


export default connect(mapStateToProps, null)(AutocompleteDataset);