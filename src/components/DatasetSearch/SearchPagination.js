import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import FirstPage from 'material-ui/svg-icons/navigation/first-page';
import LastPage from 'material-ui/svg-icons/navigation/last-page';

class SearchPagination extends Component {
  render() {
  	let pageNum = this.props.pageIndex+1;

		return(
			<div className = "searchPagination">
				<div className="leftSearchButtons">
					<RaisedButton
						label="First"
						labelPosition="after"
						onClick={this.props.getFirstPage}
						icon={<FirstPage/>}
						disabled={this.props.leftButtonsDisabled}
					/>
					<RaisedButton
						label="Previous"
						labelPosition="after"
						onClick={this.props.getPreviousPage}
						icon={<ChevronLeft/>}
						disabled={this.props.leftButtonsDisabled}
						className="previousButton"
					/>
				</div>
				<h3>{"Page "  +  pageNum}</h3>
				<div className="rightSearchButtons">
					<RaisedButton
						label="Next"
						labelPosition="before"
						onClick={this.props.getNextPage}
						icon={<ChevronRight/>}
						disabled={this.props.rightButtonsDisabled}
						className="nextButton"
					/>
					<RaisedButton
						label="Last"
						labelPosition="before"
						onClick={this.props.getLastPage}
						icon={<LastPage/>}
						disabled={this.props.rightButtonsDisabled}
					/>
				</div>
			</div>
		);
  }
}

SearchPagination.propTypes = {
	pageIndex: PropTypes.number,
  getPreviousPage: PropTypes.func,
  getNextPage: PropTypes.func,
  getFirstPage: PropTypes.func,
  getLastPage: PropTypes.func,
  resultCount: PropTypes.number,
  resultsPerPage: PropTypes.number,
  leftButtonsDisabled: PropTypes.bool,
  rightButtonsDisabled: PropTypes.bool,
};

export default SearchPagination;