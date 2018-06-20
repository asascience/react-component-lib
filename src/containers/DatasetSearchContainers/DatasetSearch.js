import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Clear from 'material-ui/svg-icons/content/clear';
import SearchResults from '../../components/DatasetSearch/SearchResults';
import SearchChipInput from '../../components/DatasetSearch/SearchChipInput';
import PropTypes from 'prop-types';
import './DatasetSearch.css';

// TODO: remove the mui theme wrappers, they shoud not be required.
const muiTheme = getMuiTheme({
    palette: {
      primary1Color: '#6bc4ea',  // Light Blue
      primary2Color: '#0a548b',  // Dark Blue
      accent1Color: '#323c19',  // Dark Green
      pickerHeaderColor: '#eb3e3c',  // Red
    },
});

/*
* DatasetSearch - a component that allows search results for datasets
* to be intelligently searched and filtered.
* props:
*
*/
class DatasetSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appliedFilters: {
      },
      currentFilter: '',
      inputSuggestions: Object.keys(this.props.filterList),
      searchText: '',
    };

    // Debounce the input.
    this.inputUpdated = this.debouncer(this.inputUpdated, 300);

    this.inputUpdated = this.inputUpdated.bind(this);
    this.requestAddChip = this.requestAddChip.bind(this);
    this.requestDelete = this.requestDelete.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.debouncer = this.debouncer.bind(this);
  }

  /*
    Search Methods
  */

  onSearch(inputValue) {
    // Return to first page when searching to prevent user from becoming stranded on blank page
    this.props.getFirstPage();

    this.props.onSearchValueChanged(inputValue);
    this.setState({searchText: inputValue});

    // Update the enabled buttons based on search results
    this.props.updateEnabledButtons();
  }

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

  inputUpdated(value) {
    // Return to first page when input is updated to prevent user from becoming stranded on blank page
    this.props.getFirstPage();

    this.props.onSearchValueChanged(value);

    // Update the enabled buttons based on search results
    this.props.updateEnabledButtons();
  }

  /*
    Chip Handling Methods
  */

  // Handle when the user requests to remove a chip in the search bar.
  requestDelete(chipValue) {
    // split complete chips (ei. "author: bob")
    let splitChip = chipValue.split(':');

    // if the chip is in the applied filters.
    if (splitChip.length > 1 && this.state.appliedFilters[splitChip[0]] !== undefined) {
      let newAppliedFilters = this.state.appliedFilters;
      delete newAppliedFilters[splitChip[0]];
      this.setState({appliedFilters: newAppliedFilters});
      this.props.onFiltersChanged(newAppliedFilters, this.state.currentFilter);
    }

    // if the chip is partial (ei. "author")
    if (splitChip[0] === this.state.currentFilter) {
      this.props.onFiltersChanged(this.state.appliedFilters, '');

      // Update the suggestions:
      this.setState({currentFilter: '', inputSuggestions: Object.keys(this.props.filterList)});
    }
  }

  // Handle when the user requests to add a chip to the search bar.
  requestAddChip(chipValue) {
    // Do not allow adding chips that are not in the suggestions.
    // Set up for mutating these.
    let newSuggestions = this.state.inputSuggestions;
    let newCurrentFilter = this.state.currentFilter;
    let newAppliedFilters = this.state.appliedFilters;

    // Indicates that the user has just selected a filter type.
    if (this.state.currentFilter.length === 0) {
      let splitChip = chipValue.split(':');
      if(splitChip.length > 1) {
        newAppliedFilters[splitChip[0]] = splitChip[1] + (splitChip[2] ? ':' + splitChip[2]: '');
        newCurrentFilter = '';
      } else {
        newSuggestions = this.props.filterList[chipValue];
        newCurrentFilter = chipValue;
      }
    // Indicates that the user has just selected a specific value for a filter.
    } else if (chipValue.indexOf(':') === -1) {
      newSuggestions = Object.keys(this.props.filterList);
      newCurrentFilter = '';
      newAppliedFilters[this.state.currentFilter] = chipValue;
    }

    this.props.onFiltersChanged(newAppliedFilters, newCurrentFilter);

    this.setState({
      inputSuggestions: newSuggestions,
      currentFilter: newCurrentFilter,
      appliedFilters: newAppliedFilters,
      searchText: '',
    });
  }

  render() {
    // the value of the search bar component is derived from the applied filters.
    let chips = Object.keys(this.state.appliedFilters).map((filterKey)=>{
      return filterKey + ': ' + this.state.appliedFilters[filterKey];
    });

    // If there is a partially selected filter, add it to the chips.
    if(this.state.currentFilter) {
      chips.push(this.state.currentFilter);
    }

    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="datasetSearchContainer">
          <SearchChipInput
            value={chips}
            chipMode={this.state.currentFilter !== '' ? 'partial' : 'none'}
            dataSource={this.state.inputSuggestions}
            onUpdateInput={this.inputUpdated}
            onRequestAdd={this.requestAddChip}
            onRequestDelete={this.requestDelete}
            onSearch={this.onSearch}
          />
          <div id="resultContainer">
            <SearchResults
              searchResults={this.props.searchResults}
              onDatasetSelected={this.props.onDatasetSelected}
              searchText={this.state.searchText}
              resultsPerPage={this.props.resultsPerPage}
              pageIndex={this.props.pageIndex}
              leftButtonsDisabled={this.props.leftButtonsDisabled}
              rightButtonsDisabled={this.props.rightButtonsDisabled}
              getNextPage={this.props.getNextPage}
              getPreviousPage={this.props.getPreviousPage}
              getFirstPage={this.props.getFirstPage}
              getLastPage={this.props.getLastPage}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

DatasetSearch.propTypes = {
  filterList: PropTypes.object,
  searchResults: PropTypes.array,
  onSearchValueChanged: PropTypes.func,
  onFiltersChanged: PropTypes.func,
  resultsPerPage: PropTypes.number,
  pageIndex: PropTypes.number,
  leftButtonsDisabled: PropTypes.bool,
  rightButtonsDisabled: PropTypes.bool,
  getPreviousPage: PropTypes.func,
  getNextPage: PropTypes.func,
  getFirstPage: PropTypes.func,
  getLastPage: PropTypes.func,
  updateEnabledButtons: PropTypes.func,
};

export default DatasetSearch;
