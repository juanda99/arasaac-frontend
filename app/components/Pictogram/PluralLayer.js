/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Line, Group } from "react-konva";
import { ICON_SIZE } from "./constants";

export default class PluralLayer extends Component {
  static propTypes = {
    frameWidth: PropTypes.number.isRequired,
    frame: PropTypes.bool.isRequired,
    canvasSize: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  };

  state = {
    x: this.props.frame
      ? this.props.canvasSize - ICON_SIZE - this.props.frameWidth / 2
      : this.props.canvasSize - ICON_SIZE,
    y: this.props.frame ? this.props.frameWidth / 2 : 0,
  };

  componentWillUpdate = (nextProps) => {
    const { frame, canvasSize, frameWidth } = this.props;
    if (
      nextProps.frame !== frame ||
      nextProps.canvasSize !== canvasSize ||
      nextProps.frameWidth !== frameWidth
    ) {
      this.setState({
        x: nextProps.frame
          ? nextProps.canvasSize - ICON_SIZE - nextProps.frameWidth / 2
          : nextProps.canvasSize - ICON_SIZE,
        y: nextProps.frame ? nextProps.frameWidth / 2 : 0,
      });
    }
  };

  handleDragEnd = (e) => {
    this.setState(
      {
        x: this.state.x + e.target.x(),
        y: this.state.y + e.target.y(),
      },
      () => {
        this.pluralSign.cache();
        this.pluralSign.getLayer().draw();
      }
    );
  };

  render() {
    const strokeWidth = 16;
    const { color } = this.props;
    const { x, y } = this.state;
    return (
      <Layer>
        <Group
          onDragEnd={this.handleDragEnd}
          draggable={false}
          ref={(node) => {
            this.pluralSign = node;
          }}
        >
          <Line
            stroke={color}
            strokeWidth={strokeWidth}
            points={[x, y + ICON_SIZE / 2, x + ICON_SIZE, y + ICON_SIZE / 2]}
          />
          <Line
            stroke={color}
            strokeWidth={strokeWidth}
            points={[x + ICON_SIZE / 2, y, x + ICON_SIZE / 2, y + ICON_SIZE]}
          />
          <Rect x={x} y={y} width={ICON_SIZE} height={ICON_SIZE} />
        </Group>
      </Layer>
    );
  }
}
