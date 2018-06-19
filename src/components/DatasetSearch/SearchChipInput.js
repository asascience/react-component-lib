import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Clear from 'material-ui/svg-icons/content/clear';
import SearchManager from 'utils/general/SearchManager.js';
import SearchResults from './SearchResults';
import './DatasetSearch.css';

/*
* Search Chip Input
* Replacement for the chip input class so that more customization can take place.
* props:
* value - an array of strings that controls the chips displayed.
* chipMode -  a string, either 'partial' or 'none' that tells the Component if the last
*   was part of a partial filter.
* dataSource - an array of strings that controls the autocomplete suggestions
* onUpdateInput - a callback that will be called when the text input is changed.
* onRequestAdd - a callback that is called when the user tries to add a new chip.
*   Rhe deletion must take place in the controller -- that is, by changing the value prop.
* onRequestDelete - a callback that is called when the user tries to delete a chip.
*   The deletion must take place in the controller -- that is, by changing the value prop.
*
*/
class SearchChipInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filteredSuggestions: props.dataSource,
      filterButtonSelected: false,
      expandedFilter: undefined,
    };

    this.keyAction = this.keyAction.bind(this);
    this.suggestionClicked = this.suggestionClicked.bind(this);
    this.filterSuggestions = this.filterSuggestions.bind(this);
    this.filterButtonClicked = this.filterButtonClicked.bind(this);
    this.expandChip = this.expandChip.bind(this);
  }

  componentDidUpdate() {
    document.getElementById('textArea').value = this.state.searchText;
  }

  componentWillReceiveProps(nextProps) {
    // When adding new tags, remove the search text.
    if(this.props.value.length < nextProps.value.length) {
      this.setState({searchText: ''});
    }
  }

  filterButtonClicked() {
    // Flip the filterButtonClicked variable in the state.
    this.setState({filterButtonSelected: !this.state.filterButtonSelected});
  }

  // Given a search text, return a filtered version of this.props.dataSource.
  filterSuggestions(searchText) {
   // if(searchText.length === 0) {
      return this.props.dataSource;
    //}

    return this.props.dataSource.reduce((a, suggestion)=>{
      if(suggestion.indexOf(searchText) !== -1) {
        a.push(suggestion);
      }
      return a;
    }, []);
  }


  // Handles key events from the DOM input.
  keyAction(e) {
    // Get the new value.
    let newSearchText = document.getElementById('textArea').value;
    if (e.key === 'Enter') {
      let splitTag = newSearchText.split(':');

      // Check the second portion of the potential tag and make sure it has non-whitespace characters (hence regex.)
      let valid = splitTag.filter((string)=>{
         return /\S/.test(string);
      });

      if(splitTag.length > 1 && valid) {
        this.props.onRequestAdd(newSearchText);
      }else {
        this.props.onSearch(newSearchText);
      }
    } else if ((e.key === 'Backspace' || e.key === 'Delete') && newSearchText.length === 0 && this.props.value.length > 0) {
      // If the user backspaces on the input with no text, delete the "top" chip.
      this.props.onRequestDelete(this.props.value[this.props.value.length-1]);
    } else {
      this.setState({
        searchText: newSearchText,
        filteredSuggestions: this.filterSuggestions(newSearchText),
      });
      this.props.onUpdateInput(newSearchText);
    }
  }

  suggestionClicked(suggestion) {
    // If the suggestion is determined not to be allowed to be added, this
    // could cause weird behavior down the road. For example, the suggestions
    // would collapse and the chip would not be added.
    if(this.props.chipMode === 'partial') {
      this.setState({filterButtonSelected: false});
    }
    this.props.onRequestAdd(suggestion);
  }

  expandChip(chip){
    this.setState({expandedFilter: chip});
  }

  render() {
    let autoCompleteDOM;
    if(this.state.filterButtonSelected) {
      let suggestionDOM = this.filterSuggestions(this.state.searchText).map((object)=>{
        return (<div onClick={()=>{
          this.suggestionClicked(object);
        }} className="filterOption">{object}</div>);
      });

      // TODO:  this if statement is ment to change the header for the suggestions, not working right now.
      if (this.props.chipMode === 'partial') {
        let lastChip = this.props.value[this.props.value.length-1];
        autoCompleteDOM = (
          <div id="autoComplete">
            <div id="filterSuggestionHeader">{'Filter By ' + lastChip}</div>
            <div id="filterSuggestions">
              {suggestionDOM}
            </div>
          </div>
        );
      }else{
        autoCompleteDOM = (
          <div id="autoComplete">
            <div id="filterSuggestionHeader">Filters:</div>
            <div id="filterSuggestions">
              {suggestionDOM}
            </div>
          </div>
        );
      }
    }
    let chips = this.props.value.map((chip)=>{
      let processedChip = chip;
      if (chip.length > 30 && this.state.expandedFilter !== chip) {
        processedChip = chip.split(':').reduce((result, substring, index)=>{
          let newString;
          if (substring.length > 8) {
            newString = substring.slice(0, 4) + '...' + substring.slice(substring.length - 4, substring.length-1);
          }
          let res = result + (index !== 0 ? ':' : '') + newString;
          return res;
        }, '');
      }
      return (
        <div 
          className="chip"
          onMouseEnter={()=>{
            this.setState({expandedFilter: chip});
          }}
          onMouseLeave={()=>{
            this.setState({expandedFilter: undefined});
          }}
        >
          <div className="chipText">{processedChip}</div>
          <div
            className="deleteDiv"
            onClick={()=>{
              this.props.onRequestDelete(processedChip);
            }}
          >
            <Clear
              color="lightgrey"
              style={{height: '20px', width: '20px'}}
            />
          </div>
        </div>
      );
    });

    return(
      <div id="searchChipInputContainer">
        <div id="searchChipInput">
          <div
            id="filterButton"
            className={this.state.filterButtonSelected ? 'selected':'unselected'}
            onClick={this.filterButtonClicked}
          >
            <div>Filters</div>
            <div id="arrowContainer"><div className="arrowDown" /></div>
          </div>
          {chips}
          <input type="text" id="textArea" rows="1" onKeyUp={this.keyAction}></input>
        </div>
        {autoCompleteDOM}
      </div>
    );
  }
}

export default SearchChipInput;