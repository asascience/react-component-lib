import React from 'react';
import PropTypes from 'prop-types';

/**
 * Submit button component with check mark display if pressed
 *
 * @param {object} props - the props passed to the component.
 * @param {boolean} props.submitted - whether the button has been pressed and the check should be shown
 * @return {object} - component
 */
function CheckedSubmit(props) {
  if (props.submitted) {
    return (
      <div>
        <i className='fa fa-check' aria-hidden='true' style={props.style}></i>&nbsp;Submit
      </div>
    );
  }
  return <div>Submit</div>;
}

CheckedSubmit.defaultProps = {
  style: {color: 'green'},
};

CheckedSubmit.propTypes = {
  submitted: PropTypes.bool,
};

export default CheckedSubmit;
