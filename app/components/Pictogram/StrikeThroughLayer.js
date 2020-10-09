/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layer, Line } from "react-konva";
import { red } from "utils/colors";

export default class STrikeThroughLayer extends Component {
  static propTypes = {
    canvasSize: PropTypes.number.isRequired,
  };

  state = {
    color: red,
    x: 0,
    y: 0,
  };

  render() {
    const strokeWidth = 28;
    const { canvasSize } = this.props;
    const { x, y, color } = this.state;
    return (
      <Layer>
        <Line
          stroke={color}
          strokeWidth={strokeWidth}
          points={[x, y, x + canvasSize, y + canvasSize]}
          opacity="0.8"
        />
        <Line
          stroke={color}
          strokeWidth={strokeWidth}
          points={[x + canvasSize, y, x, y + canvasSize]}
          opacity="0.8"
        />
      </Layer>
    );
  }
}
