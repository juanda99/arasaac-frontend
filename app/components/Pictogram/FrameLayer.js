import React, { Component } from "react";
import PropTypes from "prop-types";
import { Line, Layer, Group } from "react-konva";
import Konva from "konva";

class FrameLayer extends Component {
  state = {
    color: "green",
    size: PropTypes.number.isRequired,
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  };
  render() {
    const { color, size, frameWidth } = this.props;
    const width = frameWidth ? size : 0;
    return (
      <Layer>
        {frameWidth ? (
          <Group>
            <Line
              stroke={color}
              strokeWidth={frameWidth}
              points={[0, 0, size, 0]}
            />
            <Line
              stroke={color}
              strokeWidth={frameWidth}
              points={[size, 0, size, size]}
            />
            <Line
              stroke={color}
              strokeWidth={frameWidth}
              points={[size, size, 0, size]}
            />
            <Line
              stroke={color}
              strokeWidth={frameWidth}
              points={[0, size, 0, 0]}
            />
          </Group>
        ) : (
          ""
        )}
      </Layer>
    );
  }
}

/*
      <Layer>
        <Line
          stroke={color}
          strokeWidth={frameWidth}
          points={[0, 0, size, 0]}
        />
        <Line
          stroke={color}
          strokeWidth={frameWidth}
          points={[size, 0, size, size]}
        />
        <Line
          stroke={color}
          strokeWidth={frameWidth}
          points={[size, size, 0, size]}
        />
        <Line
          stroke={color}
          strokeWidth={frameWidth}
          points={[0, size, 0, 0]}
        />
      </Layer>
*/

FrameLayer.propTypes = {
  // onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  frameWidth: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default FrameLayer;
