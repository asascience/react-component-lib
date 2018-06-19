import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

/**
 * A component that shows a filled colored circle with some text centered inside of it
 */
class AvatarNumericBadge extends Component {
  /**
  * @param {object} props - the props passed to the component.
  * @param {string} props.iconSize - the size of the icon in px (i.e. '14px' or as an integer)
  * @param {string} props.text - the text to go inside the filled circle
  * @param {string} props.textColor - the text color
  * @param {string} props.tooltipPosition  - the position of the tooltip
  * @param {object} props.tooltipStyle - the style of the tooltip
  * @return {object} - component
  */

  render() {
    let backgroundColor;
    let dimensionArr = this.props.dimArray.map((dim) => dim.toLowerCase());

    if (dimensionArr.length === 1) {
      backgroundColor = '#003087'; // dark blue
    } else if (dimensionArr.length === 2) {
      backgroundColor = '#808080'; // dark grey
    } else if (dimensionArr.length === 3) {
      backgroundColor = '#996633'; // brown
    } else if (dimensionArr.length === 4) {
      backgroundColor = '#ff0000'; // red
    } else if (dimensionArr.length === 5) {
      backgroundColor = '#9933ff'; // purple
    } else {
      backgroundColor = '#666633'; // dark green
    }
    return (
      <IconButton tooltip={this.props.dimArray.join(', ')}
                  tooltipPosition={this.props.tooltipPosition}
                  tooltipStyles={this.props.tooltipStyle}
      >
        <Avatar size={this.props.iconSize} color={this.props.textColor} backgroundColor={backgroundColor}>
          {this.props.text}
        </Avatar>
      </IconButton>
      );
  }
}

AvatarNumericBadge.propTypes = {
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  textColor: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipStyle: PropTypes.object,
};

AvatarNumericBadge.defaultProps = {
  iconSize: 32,
  text: 'n/a',
  textColor: 'white',
  tooltipPosition: 'bottom-right',
  tooltipStyle: {fontSize: 14},
};

export default AvatarNumericBadge;
