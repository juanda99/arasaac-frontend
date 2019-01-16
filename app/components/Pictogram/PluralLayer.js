/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layer, Rect, Line } from 'react-konva'
import { ICON_SIZE } from './constants'

export default class PluralLayer extends Component {
  static propTypes = {
    frameWidth: PropTypes.number.isRequired,
    frame: PropTypes.bool.isRequired,
    canvasSize: PropTypes.number.isRequired
  }

  state = {
    color: 'black'
  }

  render() {
    const strokeWidth = 16
    const { frameWidth, frame, canvasSize } = this.props
    const y = frame ? frameWidth / 2 : 0
    const x = frame
      ? canvasSize - ICON_SIZE - frameWidth / 2
      : canvasSize - ICON_SIZE
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
