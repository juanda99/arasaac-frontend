import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Layer } from "react-konva";

class TextLayer extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    font: PropTypes.string,
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,
    dragAndDrop: PropTypes.bool.isRequired,
    canvasSize: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  state = {
    x: this.props.canvasSize / 2,
    y: this.props.y,
    width: 0,
    height: 0,
    move: false,
  };

  componentDidMount = () => {
    // first time is needed, if text exits by default
    this.centerText();
  };

  componentDidUpdate = () => {
    this.centerText();
  };

  centerText = () => {
    const currentWidth = this.myText ? this.myText.textWidth : 0;
    const currentHeight = this.myText ? this.myText.textHeight : 0;
    if (this.state.height !== currentHeight) {
      this.setState({ height: currentHeight });
    }
    if (this.state.width !== currentWidth) {
      this.setState({ width: currentWidth });
    }
  };

  handleDragEnd = (e) => {
    this.setState({
      x: e.target.x(),
      y: e.target.y(),
      move: true,
    });
  };

  render() {
    const {
      text,
      font,
      fontSize,
      fontColor,
      dragAndDrop,
      canvasSize,
    } = this.props;
    const { x, width, move } = this.state;
    const y = move ? this.state.y : this.props.y;
    return (
      <Layer>
        <Text
          fontFamily={font || "Roboto"}
          fontSize={fontSize}
          fill={fontColor}
          text={text}
          x={x}
          y={y}
          offsetX={width / 2}
          onDragEnd={this.handleDragEnd}
          draggable={dragAndDrop}
          ref={(node) => {
            this.myText = node;
          }}
          wrap="word"
          width={canvasSize}
        />
      </Layer>
    );
  }
}

export default TextLayer;
