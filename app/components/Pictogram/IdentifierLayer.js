/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Layer } from "react-konva";

const image = new window.Image();

class IdentifierLayer extends Component {
  state = {
    image: null,
    x: 0,
    y: 0,
    moved: false,
  };

  componentDidMount() {
    // const image = new window.Image()
    image.src = this.props.src;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState(
        {
          image,
        },
        () => {
          this.myImage.cache();
          this.myImage.getLayer().draw();
        }
      );
    };
    image.crossOrigin = "Anonymous";
  }

  componentDidUpdate = (prevProps) => {
    const { src, frameWidth, enableFrame, canvasSize } = this.props;
    if (src !== prevProps.src) image.src = src;
    else if (
      frameWidth !== prevProps.frameWidth ||
      enableFrame !== prevProps.enableFrame
    ) {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    } else if (canvasSize !== prevProps.canvasSize) {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    }
  };

  handleDragEnd = (e) => {
    this.setState({
      x: e.target.x(),
      y: e.target.y(),
      moved: true,
    });
  };

  render() {
    const {
      canvasSize,
      enableFrame,
      frameWidth,
      dragAndDrop,
      position,
    } = this.props;
    let { x, y } = this.state;
    if (!this.state.moved) {
      y = enableFrame ? y + frameWidth / 2 : y;
      if (position === "left") {
        x = enableFrame ? x + frameWidth / 2 : x;
      } else {
        x = enableFrame ? canvasSize - 55 - frameWidth / 2 : canvasSize - 55;
      }
    }
    return (
      <Layer>
        <Image
          name="pictoIdentifier"
          image={this.state.image}
          ref={(node) => {
            this.myImage = node;
          }}
          width={55}
          height={55}
          x={x}
          y={y}
          onDragEnd={this.handleDragEnd}
          draggable={dragAndDrop}
          scale={canvasSize / 500}
        />
      </Layer>
    );
  }
}

IdentifierLayer.propTypes = {
  // onClick: PropTypes.func.isRequired,
  frameWidth: PropTypes.number,
  src: PropTypes.string.isRequired,
  enableFrame: PropTypes.bool.isRequired,
  canvasSize: PropTypes.number.isRequired,
  dragAndDrop: PropTypes.bool.isRequired,
  position: PropTypes.string,
};

export default IdentifierLayer;
