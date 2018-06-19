import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeStep} from 'redux/actions/Actions.js';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import SummaryIcon from 'material-ui/svg-icons/action/assignment';
import WarningIcon from 'material-ui/svg-icons/alert/warning';


/*
  PaginationController - meant to be a really dumb controller. Takes step prop.
  This prop is an array each corresponding to a form step. Each array index is an
  object with a title, validated, and content key. This controller uses that data
  to generate a stepper component that displays warning based on validation and
  displays the correct content for each step.
*/
class PaginationController extends Component {

  /**
  * @param {object} props - the props passed to the component.
  * @param {number} props.step - the step that the controller is currently on.
  * @param {object} props.steps - data about the page being shown (described above).
  * @return {object} - component
  */
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: this.props.step || 0,
      totalSteps: this.props.steps.length,
    };

    this.changeStep = this.changeStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // this.props and this.state may be updated asynchronously (so use a function like below)
    this.setState((prevState, props) => ({
        totalSteps: props.steps.length,
        stepIndex: props.stepIndex,
    }));
  }

  changeStep(index) {
    this.props.changeStep(index);
  }

  render() {
    // get the step
    let presentStep = this.props.step !== undefined ? this.props.step : this.state.stepIndex;

    // Generate the step icons based on the steps prop.
    let stepIcons = this.props.steps.map((stepObject, index)=>{
      let iconColor = (!stepObject.validated && presentStep === index) ? '#FF9800' : '#9e9e9e';
      let icon = stepObject.validated ? (index + 1) : (<WarningIcon color={iconColor} />);

      // If it is the last icon, make it a square.
      if (index === this.state.totalSteps - 1) {
        icon = (<SummaryIcon color={presentStep === index ? '#003087' : '#9e9e9e'}/>);
      }

      return (
        <Step key={index}>
          <StepButton
            onClick={this.changeStep.bind(this, index)}
            icon={icon}
            style={{color: iconColor, cursor: 'pointer'}}
          >
            {stepObject.title}
          </StepButton>
        </Step>
      );
    });
    return (
      <div className="stepper-header">
        <Stepper
          linear={false}
          activeStep={presentStep}
        >
          {stepIcons}
        </Stepper>
        <div style={{paddingBottom: 10}}>
          {this.props.steps[presentStep].content}
          {this.props.steps[presentStep].footer}
        </div>
      </div>
    );
  }
}

PaginationController.propTypes = {
  step: PropTypes.number,
  steps: PropTypes.array,
}

/**
 * Redux connector to import props from the shared store in the data-upload-connector
 *
 * @return {string} props.step - the progress step
 */
const mapStateToProps = (state, ownProps)=>{
  return {
    step: state.flowData.step,
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    changeStep: (step) => {
      dispatch(changeStep(step));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationController);