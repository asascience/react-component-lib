import React from 'react';

const NotFound = ({location}) => (
  <div>
    <h3>
        We're sorry, but the page&nbsp;
        <code>{location.pathname}</code> can't be found!
    </h3>
  </div>
);

export default NotFound;