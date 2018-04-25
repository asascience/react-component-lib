import React from 'react';

function StepperSquare(props) {
	return (
        <rect {...props} style={{fill: props.fill}}></rect>
    );
}

export default StepperSquare;
