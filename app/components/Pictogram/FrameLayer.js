import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rect, Layer } from 'react-konva'
import Konva from 'konva'

class FrameLayer extends Component {
  state = {
    color: 'green',
    size: PropTypes.number.isRequired
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    })
  }
  render() {
    const { color, size, frameWidth } = this.props
    const width = frameWidth ? size : 0
    return (
      <Layer>
        <Rect
          width={width}
          height={width}
          stroke={color}
          strokeWidth={frameWidth}
        />
      </Layer>
    )
  }
}

FrameLayer.propTypes = {
  // onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  frameWidth: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
}

export default FrameLayer
