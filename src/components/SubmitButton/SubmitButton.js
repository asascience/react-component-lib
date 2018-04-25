import React from 'react';

/**
 * Submit button component with check mark display if pressed
 *
 * @param {boolean} props.submitted - whether the button has been pressed and the check should be shown
 */
function CheckedSubmit(props) {
  if (props.submitted) {
    return (
      <div>
        <i className='fa fa-check' aria-hidden='true' style={{color: 'green'}}></i>&nbsp;Submit
      </div>
    );
  }
  return <div>Submit</div>;
}

export default CheckedSubmit;
