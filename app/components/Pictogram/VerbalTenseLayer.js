/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layer, Rect, Line, Group } from "react-konva";
import { ICON_SIZE, PAST, FUTURE } from "./constants";

export default class VerbalTenseLayer extends Component {
  static propTypes = {
    frameWidth: PropTypes.number.isRequired,
    frame: PropTypes.bool.isRequired,
    canvasSize: PropTypes.number.isRequired,
    verbalTense: PropTypes.string,
    color: PropTypes.string.isRequired,
  };

  state = {
    color: "black",
  };

  getPastCode = () => {
    const { frame, frameWidth, color } = this.props;
    const x = frame ? frameWidth / 2 : 0;
    const y = frame ? frameWidth / 2 : 0;
    const strokeWidth = 16;
    return (
      <Group>
        <Line
          stroke={color}
          strokeWidth={strokeWidth}
          points={[
            x + ICON_SIZE / 2,
            y + ICON_SIZE / 2,
            x + ICON_SIZE,
            y + ICON_SIZE / 2,
          ]}
        />
        <Line
          stroke={color}
          strokeWidth={1}
          points={[
            x + ICON_SIZE / 2,
            y,
            x + ICON_SIZE / 2,
            y + ICON_SIZE,
            x,
            y + ICON_SIZE / 2,
          ]}
          closed={true}
          fill={color}
        />
        <Rect x={x} y={y} width={ICON_SIZE} height={ICON_SIZE} />
      </Group>
    );
  };

  getFutureCode = () => {
    const { frame, frameWidth, canvasSize, color } = this.props;
    const x = frame
      ? canvasSize - ICON_SIZE - frameWidth / 2
      : canvasSize - ICON_SIZE;
    const y = frame ? frameWidth / 2 : 0;
    const strokeWidth = 16;
    return (
      <Group>
        <Line
          stroke={color}
          strokeWidth={strokeWidth}
          points={[x, y + ICON_SIZE / 2, x + ICON_SIZE / 2, y + ICON_SIZE / 2]}
        />
        <Line
          stroke={color}
          strokeWidth={1}
          points={[
            x + ICON_SIZE / 2,
            y,
            x + ICON_SIZE / 2,
            y + ICON_SIZE,
            x + ICON_SIZE,
            y + ICON_SIZE / 2,
          ]}
          closed={true}
          fill={color}
        />
        <Rect x={x} y={y} width={ICON_SIZE} height={ICON_SIZE} />
      </Group>
    );
  };

  render() {
    const { verbalTense } = this.props;
    return (
      <Layer>
        {verbalTense === FUTURE && this.getFutureCode()}
        {verbalTense === PAST && this.getPastCode()}
      </Layer>
    );
  }
}

/*
const futureSVGCode =
  '\n<rect x="390" y="147" style="fill:#FFFFFF;" width="55" height="55"/>\n<line style="fill:none;stroke:#000000;stroke-width:12;" x1="393.1" y1="174.7" x2="423.5" y2="174.7"/>\n<polygon points="413,156.9 413,192.1 443,174.5"/>'
const pastSVGCode =
  '\n<rect x="-55" y="147" style="fill:#FFFFFF;" width="55" height="55"/>\n<line style="fill:none;stroke:#000000;stroke-width:12;" x1="-33.5" y1="174.7" x2="-3.1" y2="174.7"/>\n<polygon points="-53,174.5 -23,192.1 -23,156.9"/>'
*/
