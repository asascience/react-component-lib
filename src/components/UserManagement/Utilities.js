import {Component} from 'react';
import {connect} from 'react-redux';
import {tokenUpdated} from 'data-upload-connector';


/**
* Function to parse the CSRF token from a response and store it in redux
* @function
* @param {Object} jqXHR - jQuery XMLHttpRequest
* @return {string} this is either the csrfToken or null/undefined
*/
export function parseCSRF(jqXHR) {
  const token = jqXHR.getResponseHeader('X-Csrf-Token');
  if (token) {
    sessionStorage.token = token;
  }
  return token;
}

/**
* Function to get the latest CSRF token
* @function
* @return {string} this is either the JWT itself or 'logged-out'
*/
export function getCSRF(jqXHR) {
  const token = jqXHR.getResponseHeader('X-Csrf-Token');
  if (token) {
    this.props.tokenUpdated(token);
    sessionStorage.token = token;
  }
  return token;
};

/**
 * @typedef {function} tokenUpdated
 * @global
 * @description Handles the updating of the CSRF token returned upon authentication
 * @param {string} jwt - the new jwt token returned from the server
 */

/**
 * Redux connector to import action functions from the shared store in the data-upload-connector
 *
 * @param {object} dispatch
 * @return {tokenUpdated}
 */
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     tokenUpdated: (token) => {
//       dispatch(tokenUpdated(token));
//     },
//   };
// };

// export default connect(null, mapDispatchToProps)(CSRFUtils);
