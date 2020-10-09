/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Layer } from "react-konva";

const image = new window.Image();

class Img extends Component {
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
    const {
      src,
      frameWidth,
      zoomLevel,
      enableFrame,
      canvasSize,
      topMargin,
      bottomMargin,
    } = this.props;
    if (src !== prevProps.src) image.src = src;
    else if (
      frameWidth !== prevProps.frameWidth ||
      enableFrame !== prevProps.enableFrame
    ) {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    } else if (zoomLevel !== prevProps.zoomLevel) {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    } else if (canvasSize !== prevProps.canvasSize) {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    } else if (topMargin !== prevProps.topMargin) {
      this.myImage.cache();
      this.myImage.getLayer().draw();
    } else if (bottomMargin !== prevProps.bottomMargin) {
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
      zoomLevel,
      canvasSize,
      enableFrame,
      frameWidth,
      dragAndDrop,
      topMargin,
      bottomMargin,
    } = this.props;
    let { x, y } = this.state;
    const size = enableFrame
      ? canvasSize - parseInt(frameWidth, 0) - topMargin - bottomMargin
      : canvasSize - topMargin - bottomMargin;
    if (!this.state.moved) {
      x = enableFrame
        ? x + frameWidth / 2 - zoomLevel / 2 + topMargin / 2 + bottomMargin / 2
        : x - zoomLevel / 2 + topMargin / 2 + bottomMargin / 2;
      y = enableFrame
        ? y + frameWidth / 2 - zoomLevel / 2 + topMargin
        : y - zoomLevel / 2 + topMargin;
    }
    return (
      <Layer>
        <Image
          name="pictoImage"
          image={this.state.image}
          ref={(node) => {
            this.myImage = node;
          }}
          width={size + zoomLevel}
          height={size + zoomLevel}
          x={x}
          y={y}
          onDragEnd={this.handleDragEnd}
          draggable={dragAndDrop}
          scale={canvasSize / 500}
          preventDefault={false}
        />
      </Layer>
    );
  }
}

Img.propTypes = {
  // onClick: PropTypes.func.isRequired,
  frameWidth: PropTypes.number,
  src: PropTypes.string.isRequired,
  enableFrame: PropTypes.bool.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  canvasSize: PropTypes.number.isRequired,
  dragAndDrop: PropTypes.bool.isRequired,
  topMargin: PropTypes.number.isRequired,
  bottomMargin: PropTypes.number.isRequired,
};

export default Img;
