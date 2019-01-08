import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'
import Konva from 'konva'

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
    const { color, enable, width } = this.props
    const size = enable && width ? 500 : 0
    // hack: if no frame we need to change width and height to 0
    // frame can be set on but no width, width can be set but frame disabled
    return (
      <Rect width={size} height={size} stroke={color} strokeWidth={width} />
    )
  }
}

Frame.propTypes = {
  // onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  enable: PropTypes.bool.isRequired
}

export default Frame
