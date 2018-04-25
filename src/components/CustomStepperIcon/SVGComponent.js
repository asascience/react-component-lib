import React from 'react';

let svgStyle = {
      display: 'block',
      color: 'rgb(158,158,158)',
      fill: 'rgb(158,158,158)',
      height: '24px',
      width: '24px',
      fontSize: '24px',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    };

function SVGComponent(props) {
	return (
        <svg {...props} style={svgStyle}>{props.children}</svg>
    );
}

export default SVGComponent;
