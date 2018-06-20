import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import SearchPagination  from './SearchPagination';
import './SearchResults.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.formatHighlightString =  this.formatHighlightString.bind(this);
  }

  // Given a string, generate a JSX string that highlights occurences of the search string.
  // This is accomplished by wrapping the search string in <span className="highlight"></span>
  formatHighlightString(text, searchString) {
    let searchIndex = text.indexOf(searchString);
    let stringDOM;
    if(searchIndex !== -1 && searchString !== '') {
      let splitTitle = text.split(searchString);
      stringDOM = splitTitle.reduce((a, object, index)=>{
        a.push(object);
        if(index !== splitTitle.length-1) {
          a.push((<span className="searchHighlight">{searchString}</span>));
        }
        return a;
      }, []);
    } else {
      stringDOM = text;
    }
    return stringDOM;
  }

  render() {
    let searchResults = [];
    let startingIndex = this.props.pageIndex * this.props.resultsPerPage;
    let endingIndex = startingIndex + this.props.resultsPerPage - 1;

    let resultCount = 0;

    if(this.props.searchResults && this.props.searchResults.length > startingIndex){
      resultCount =  this.props.searchResults.length;

      if (this.props.searchResults.length < endingIndex) {
        endingIndex =  this.props.searchResults.length - 1;
      }

      for (let i = startingIndex; i <= endingIndex; i++) {
        let result = this.props.searchResults[i];
        let titleDOM = this.formatHighlightString(result.title, this.props.searchText);
        let abstractDOM = this.formatHighlightString(result.description, this.props.searchText);

        let emailLink = "";
        if (result.contactPoint && result.contactPoint.hasEmail != "no email") {
          emailLink = result.contactPoint.hasEmail;
        }

        searchResults.push(
          <div className={'searchResult' + ((i % 2 === 1) ? ' oddResult' : '')}>
            <div>
              <div
                className="searchTitle"
                onClick={()=>{
                  this.props.onDatasetSelected(result.id);
                }}
              >
              {titleDOM}
              </div>
              <div className="searchAuthor">
                <a href={emailLink}>{'Author: ' + result.contactPoint.fn}</a>
              </div>
            </div>
            <p>{abstractDOM}</p>
          </div>
        );
      }
    }

    let pageController = (
      <SearchPagination
        pageIndex={this.props.pageIndex}
        getNextPage={this.props.getNextPage}
        getPreviousPage={this.props.getPreviousPage}
        getFirstPage={this.props.getFirstPage}
        getLastPage={this.props.getLastPage}
        resultCount={resultCount}
        resultsPerPage={this.props.resultsPerPage}
        leftButtonsDisabled={this.props.leftButtonsDisabled}
        rightButtonsDisabled={this.props.rightButtonsDisabled}
      />
    );

    return(
      <div>
        {searchResults}
        {pageController}
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchText: PropTypes.string,
  searchResults: PropTypes.array,
  onDatasetSelected: PropTypes.func,
  resultsPerPage: PropTypes.number,
  pageIndex: PropTypes.number,
  leftButtonsDisabled: PropTypes.bool,
  rightButtonsDisabled: PropTypes.bool,
  getPreviousPage: PropTypes.func,
  getNextPage: PropTypes.func,
  getFirstPage: PropTypes.func,
  getLastPage: PropTypes.func,
};

export default SearchResults;