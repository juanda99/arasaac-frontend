import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-konva'

class Caption extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    x: 0,
    y: 0
  }
  handleDragEnd = (e) => {
    this.setState({
      x: e.target.x(),
      y: e.target.y()
    })
  }

  render() {
    const { text } = this.props
    const { x, y } = this.state
    return (
      <Text text={text} x={x} y={y} onDragEnd={this.handleDragEnd} draggable />
    )
  }
}

export default Caption
