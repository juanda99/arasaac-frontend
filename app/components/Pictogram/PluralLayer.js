/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CANVAS_SIZE, ICON_SIZE } from './constants'

import { Layer, Rect, Line } from 'react-konva'

export default class PluralLayer extends Component {
  static propTypes = {
    frameWidth: PropTypes.number.isRequired,
    frame: PropTypes.bool.isRequired
  }

  state = {
    color: 'black'
  }

  render() {
    const strokeWidth = 16
    const { frameWidth, frame } = this.props
    const y = frame ? frameWidth / 2 : 0
    const x = frame
      ? CANVAS_SIZE - ICON_SIZE - frameWidth / 2
      : CANVAS_SIZE - ICON_SIZE
    return (
      <Layer>
        <Line
          stroke='black'
          strokeWidth={strokeWidth}
          points={[x, y + ICON_SIZE / 2, x + ICON_SIZE, y + ICON_SIZE / 2]}
        />
        <Line
          stroke='black'
          strokeWidth={strokeWidth}
          points={[x + ICON_SIZE / 2, y, x + ICON_SIZE / 2, y + ICON_SIZE]}
        />
        <Rect x={x} y={y} width={ICON_SIZE} height={ICON_SIZE} />
      </Layer>
    )
  }
}

/*
const futureSVGCode =
  '\n<rect x="390" y="147" style="fill:#FFFFFF;" width="55" height="55"/>\n<line style="fill:none;stroke:#000000;stroke-width:12;" x1="393.1" y1="174.7" x2="423.5" y2="174.7"/>\n<polygon points="413,156.9 413,192.1 443,174.5"/>'
const pastSVGCode =
  '\n<rect x="-55" y="147" style="fill:#FFFFFF;" width="55" height="55"/>\n<line style="fill:none;stroke:#000000;stroke-width:12;" x1="-33.5" y1="174.7" x2="-3.1" y2="174.7"/>\n<polygon points="-53,174.5 -23,192.1 -23,156.9"/>'
*/
