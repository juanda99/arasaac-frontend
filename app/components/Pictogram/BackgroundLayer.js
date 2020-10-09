/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layer, Rect } from "react-konva";

export default class BackgroundLayer extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  };

  state = {
    color: "black",
  };

  render() {
    const { color, size } = this.props;
    return (
      <Layer>
        <Rect fill={color} width={size} height={size} />
      </Layer>
    );
  }
}
