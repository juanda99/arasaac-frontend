import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-konva'

class Caption extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number
  }

  state = {
    x: 30,
    y: 30
  }
  handleDragEnd = (e) => {
    this.setState({
      x: e.target.x(),
      y: e.target.y()
    })
  }

  render() {
    const { text, fontFamily, fontSize } = this.props
    const { x, y } = this.state
    return (
      <Text fontFamily={fontFamily} fontSize={fontSize} text={text} x={x} y={y} onDragEnd={this.handleDragEnd} draggable />
    )
  }
}

export default Caption
