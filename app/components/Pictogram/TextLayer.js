import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Layer } from 'react-konva'

class TextLayer extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    font: PropTypes.string,
    fontSize: PropTypes.number,
    fontColor: PropTypes.string
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
    const { text, font, fontSize, fontColor } = this.props
    const { x, y } = this.state
    return (
      <Layer>
        <Text
          fontFamily={font || 'Roboto'}
          fontSize={fontSize}
          fill={fontColor}
          text={text}
          x={x}
          y={y}
          onDragEnd={this.handleDragEnd}
          draggable
        />
      </Layer>
    )
  }
}

export default TextLayer
