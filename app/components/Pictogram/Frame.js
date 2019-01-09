import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'
import Konva from 'konva'

import { PICTO_SIZE } from './constants'

class Frame extends Component {
  state = {
    color: 'green'
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    })
  }
  render() {
    const { color, enable, width, origin } = this.props
    const size = enable && width ? PICTO_SIZE : 0
    // hack: if no frame we need to change width and height to 0
    // frame can be set on but no width, width can be set but frame disabled
    return (
      <Rect
        width={size}
        height={size}
        x={origin}
        y={origin}
        stroke={color}
        strokeWidth={width}
      />
    )
  }
}

Frame.propTypes = {
  // onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  enable: PropTypes.bool.isRequired,
  origin: PropTypes.number.isRequired
}

export default Frame
