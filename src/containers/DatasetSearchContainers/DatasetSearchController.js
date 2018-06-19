import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Clear from 'material-ui/svg-icons/content/clear';
import SearchManager from 'utils/general/SearchManager.js';
import DatasetSearch from './DatasetSearch';
import '../../components/DatasetSearch/DatasetSearch.css';

/*
[
  {
    title: 'Ocean Dataset',
    id: '987654321',
    author: 'Bob',
    abstract: 'This is a dataset collected in the ocean with an abstract!',
  },
  {
    title: 'Land Dataset',
    author: 'Brian',
    id: '123456789',
    abstract: 'This is a dataset collected in the land with an abstract!',
  },
  {
    title: 'Ocean Dataset',
    id: '987654321',
    author: 'Bob',
    abstract: 'This is a dataset collected in the ocean with an abstract!',
  },
  {
    title: 'Land Dataset',
    author: 'Brian',
    id: '123456789',
    abstract: 'This is a dataset collected in the land with an abstract!',
  },
  {
    title: 'Land Dataset',
    author: 'Brian',
    id: '123456789',
    abstract: 'This is a dataset collected in the land with an abstract!',
  },
]
*/

class SearchController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: undefined,
      resultsPerPage: 8,
      pageIndex: 0,
      leftButtonsDisabled: true,
      rightButtonsDisabled: false,
    };
    this.searchValueChanged();

    this.searchValueChanged = this.searchValueChanged.bind(this);

    this.getPreviousPage = this.getPreviousPage.bind(this);
    this.getNextPage =  this.getNextPage.bind(this);
    this.getFirstPage = this.getFirstPage.bind(this);
    this.getLastPage =  this.getLastPage.bind(this);
    this.getLastPageIndex = this.getLastPageIndex.bind(this);
    this.updateEnabledButtons =  this.updateEnabledButtons.bind(this);
  }

  searchValueChanged(value) {
    SearchManager.search(null, this.filterList, value, (res, err)=>{
      if (err) {
        this.updateEnabledButtons();
        return console.error(err);
      }
      let transformedRes = res.map((object)=>{
        if(!object.contactPoint) object['contactPoint'] = {fn: 'no author', hasEmail: 'no email'};
        if(!object.description) object['description'] = 'no abstract';
        if(!object.title) object['title'] = 'no title';
        return object;
      })

      this.setState({searchResults: transformedRes});
      this.updateEnabledButtons();
    });
  }

  /*
    Page Handling Methods
  */

  getLastPageIndex() {
    let lastPage =  0;
    if (this.state.searchResults) {
      if (this.state.searchResults.length % this.state.resultsPerPage ==  0) {
        lastPage = this.state.searchResults.length / this.state.resultsPerPage - 1;
      } else {
        lastPage =  Math.floor(this.state.searchResults.length / this.state.resultsPerPage);
      }
    }

    return lastPage;
  }

  // Used to update the enabled buttons on search input and on initial load
  updateEnabledButtons() {
    let leftDisabled = false;
    let rightDisabled = false;
    let lastPage =  this.getLastPageIndex();

    if (this.state.pageIndex == 0) {
      leftDisabled =  true;
    }

    if (this.state.pageIndex == lastPage) {
      rightDisabled =  true;
    }

    this.setState({
      leftButtonsDisabled: leftDisabled,
      rightButtonsDisabled: rightDisabled,
    });
  }

  getPreviousPage() {
    // Disables left buttons if returning to first page
    if (this.state.pageIndex == 1) {
      this.setState({
        leftButtonsDisabled: true,
      });
    }

    // Right buttons will always be enabled if previous button is usable
    this.setState({
      pageIndex: this.state.pageIndex-1,
      rightButtonsDisabled: false,
    });
  }

  getNextPage() {
    // Disables right buttons if proceeding to last page
    let lastPage =  this.getLastPageIndex();
    if (this.state.pageIndex ==  lastPage-1) {
      this.setState({
        rightButtonsDisabled: true,
      });
    }

    // Left buttons will always be enabled if next button is usable
    this.setState({
      pageIndex: this.state.pageIndex+1,
      leftButtonsDisabled: false,
    });
  }

  getFirstPage() {
    // Left buttons will always be disabled
    this.setState({
      pageIndex: 0,
      leftButtonsDisabled: true,
    });

    // Check if there is more than one page of results and disable right buttons accordingly
    if (this.state.searchResults && (this.state.searchResults.length > this.state.resultsPerPage)) {
      this.setState({
        rightButtonsDisabled: false,
      });
    } else {
      this.setState({
        rightButtonsDisabled: true,
      });
    }
  }

  getLastPage() {
    // Calculate the last page number for full and incomplete page cases
    let lastPage =  this.getLastPageIndex();

    //  Left buttons will always be enabled and right buttons will always be disabled
    this.setState({
      pageIndex: lastPage,
      leftButtonsDisabled: false,
      rightButtonsDisabled: true,
    });
  }

  render() {

    return(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '800px'}}>
          <DatasetSearch
            filterList={{
              'author': ['Bob', 'Brian', 'Dalton', 'Ryan'],
              'type': ['csv', 'gridded model', 'timeseries'],
              'tag': ['ocean', 'land', 'sediment', 'something'],
            }}
            searchResults={this.state.searchResults}
            onFiltersChanged={(filterList, partialChip)=>{
              this.filterList = filterList
              //console.log('Filters Changed!');
              // console.log('filterList:');
              // Object.keys(filterList).forEach((key)=>{
              //   console.log('    ' + key + ': ' + filterList[key]);
              // });

              //console.log('Partial Chip: ' + partialChip);
            }}
            onSearchValueChanged={(newValue)=>{
              this.searchValueChanged(newValue);
              this.searchText = newValue;
              //console.log('search value changed: ' + newValue);
            }}
            onDatasetSelected={(datasetId)=>{
              //console.log('dataset seleceted: ' + datasetId);
            }}
            resultsPerPage={this.state.resultsPerPage}
            pageIndex={this.state.pageIndex}
            leftButtonsDisabled={this.state.leftButtonsDisabled}
            rightButtonsDisabled={this.state.rightButtonsDisabled}
            getNextPage={this.getNextPage}
            getPreviousPage={this.getPreviousPage}
            getFirstPage={this.getFirstPage}
            getLastPage={this.getLastPage}
            updateEnabledButtons={this.updateEnabledButtons}
          />
        </div>
      </div>
    );
  }
}

export default SearchController;