/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { CirclePicker, ChromePicker } from "react-color";
import RaisedButton from "material-ui/RaisedButton";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

class ColorPicker extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChooseColor: PropTypes.func.isRequired,
    onShowMoreColors: PropTypes.func,
    showMoreColors: PropTypes.bool,
    enableMoreColors: PropTypes.bool,
    width: PropTypes.number,
  };

  handleColorChange = ({ hex }) => this.props.onChooseColor(hex);

  handleClick = () => this.props.onShowMoreColors();

  render() {
    const {
      color,
      colors,
      showMoreColors,
      enableMoreColors,
      width,
    } = this.props;
    return (
      <div>
        {showMoreColors ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ChromePicker
                color={color}
                onChangeComplete={this.handleColorChange}
              />
            </div>
            <RaisedButton
              label={<FormattedMessage {...messages.showLessColors} />}
              primary={true}
              onClick={this.handleClick}
              style={{ marginTop: "20", width: "100%" }}
            />
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CirclePicker
                color={color}
                colors={colors}
                onChangeComplete={this.handleColorChange}
                width={width || ""}
              />
            </div>
            {enableMoreColors && (
              <RaisedButton
                label={<FormattedMessage {...messages.showMoreColors} />}
                primary={true}
                onClick={this.handleClick}
                style={{ marginTop: "20", width: "100%" }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

ColorPicker.defaultProps = {
  enableMoreColors: true,
  showMoreColors: false,
};

export default ColorPicker;
