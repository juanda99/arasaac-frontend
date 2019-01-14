import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rect, Layer } from 'react-konva'
import Konva from 'konva'

import { CANVAS_SIZE } from './constants'

class FrameLayer extends Component {
  state = {
    color: 'green'
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    })
  }
  render() {
    const { color, width } = this.props
    const size = width ? CANVAS_SIZE : 0
    return (
      <Layer>
        <Rect width={size} height={size} stroke={color} strokeWidth={width} />
      </Layer>
    )
  }
}

FrameLayer.propTypes = {
  // onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

export default FrameLayer
