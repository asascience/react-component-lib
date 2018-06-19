import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

/**
 * Breadcrumb component used for showing location in app
 */
class BreadCrumbs extends Component {
  /**
   * @param {object} props - the props passed to the component
   * @param {string} props.path - url fragment used for routing
   * @param {object} props.breadCrumbsWrapperStyle - style for breadcrumbs outer container
   * @param {object} props.breadCrumbsLinkStyle - style for breadcrumbs links
   * @return {object} - component
   */

  render() {
    let projectName = (this.props.path !== '/') ? this.props.projectName : 'None';

    return (
      <div style={this.props.breadCrumbsWrapperStyle}>
        <Link to={'/'} style={this.props.breadCrumbsLinkStyle}>{'Home'}</Link>
        {projectName !== 'None' &&
          <div style={{display: 'inline'}}>
            <span>></span>
            <Link to={this.props.path} style={this.props.breadCrumbsLinkStyle}>{projectName}</Link>
          </div>
        }
      </div>
    );
  }
}


BreadCrumbs.defaultProps = {
  breadCrumbsWrapperStyle: {
    textAlign: 'left',
    margin: '20px 0px',
  },
  breadCrumbsLinkStyle: {
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#337AB7',
    textDecoration: 'none',
    color: 'white',
    padding: '3px 6px 3px 6px',
    borderRadius: 4,
    fontWeight: 'bold',
    boxShadow: 'black 2px 2px 5px',
  },
};

BreadCrumbs.propTypes = {
  path: PropTypes.string,
  breadCrumbsWrapperStyle: PropTypes.object,
  breadCrumbsLinkStyle: PropTypes.object,
};

export default BreadCrumbs;

