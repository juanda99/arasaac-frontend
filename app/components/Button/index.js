/**
 *
 * Button: needed for several buttons which similar behaviour together,
 * see: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
 * see: theme buttons here in code
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

class Button extends Component {
  handleClick = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    const { value, label, style, curval } = this.props;
    return (
      <RaisedButton
        key={value}
        type="submit"
        label={label}
        style={style}
        onClick={this.handleClick}
        primary={curval === value}
        {...this.props.extra}
      />
    );
  }
}

Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  curval: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  label: PropTypes.string.isRequired,
  extra: PropTypes.array,
};

export default Button;
