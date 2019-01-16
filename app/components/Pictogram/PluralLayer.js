/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layer, Rect, Line, Group } from 'react-konva'
import { ICON_SIZE } from './constants'

export default class PluralLayer extends Component {
  static propTypes = {
    frameWidth: PropTypes.number.isRequired,
    frame: PropTypes.bool.isRequired,
    canvasSize: PropTypes.number.isRequired
  }

  state = {
    color: 'black',
    x: this.props.frame
      ? this.props.canvasSize - ICON_SIZE - this.props.frameWidth / 2
      : this.props.canvasSize - ICON_SIZE,
    y: this.props.frame ? this.props.frameWidth / 2 : 0
  }

  componentWillUpdate = (nextProps) => {
    const { frame, canvasSize, frameWidth } = this.props
    if (
      nextProps.frame !== frame ||
      nextProps.canvasSize !== canvasSize ||
      nextProps.frameWidth !== frameWidth
    ) {
      console.log('he entrado....')
      this.setState({
        x: nextProps.frame
          ? nextProps.canvasSize - ICON_SIZE - nextProps.frameWidth / 2
          : nextProps.canvasSize - ICON_SIZE,
        y: nextProps.frame ? nextProps.frameWidth / 2 : 0
      })
    }
  }

  handleDragEnd = (e) => {
    console.log(e)
    console.log(e.target.x())
    console.log(e.target.y())
    this.setState(
      {
        x: this.state.x + e.target.x(),
        y: this.state.y + e.target.y()
      },
      () => {
        console.log(`stado: ${this.state.x} ${this.state.y}`)
        this.pluralSign.cache()
        this.pluralSign.getLayer().draw()
      }
    )
  }

  render() {
    const strokeWidth = 16
    const { x, y } = this.state
    console.log(x, y)
    return (
      <Layer>
        <Group
          onDragEnd={this.handleDragEnd}
          draggable={false}
          ref={(node) => {
            this.pluralSign = node
          }}
        >
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
        </Group>
      </Layer>
    )
  }
}
