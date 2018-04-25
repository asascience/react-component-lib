import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './BreadCrumbs.css';

class BreadCrumbs extends Component {
  render() {
    let breadCrumbsLinks = this.props.pagesVisited.map((pageVisited, i) => {
      // Adds > after every breadcrumb but the last one
      let breadCrumbSeparator = '>';
      if (i === this.props.pagesVisited.length - 1) {
        breadCrumbSeparator = '';
      }
      return <li key={i} className='breadCrumbsLink'><Link to={pageVisited.pageUrl}>{pageVisited.pageTitle}</Link>{breadCrumbSeparator}</li>;
    });

    return <ul className='breadCrumbsWrapper'>{breadCrumbsLinks}</ul>;
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        pagesVisited: state.navigationHistory.pagesVisited,
    };
};

export default connect(mapStateToProps, null)(BreadCrumbs);
