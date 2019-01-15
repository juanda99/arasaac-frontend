/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Layer } from 'react-konva'
import { CANVAS_SIZE } from './constants'

const image = new window.Image()

class Img extends Component {
  state = {
    image: null,
    x: 0,
    y: 0
  }

  componentDidMount() {
    // const image = new window.Image()
    image.src = this.props.src
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState(
        {
          image
        },
        () => {
          this.myImage.cache()
          this.myImage.getLayer().draw()
        }
      )
    }
    image.crossOrigin = 'Anonymous'
  }

  componentDidUpdate = (prevProps) => {
    const { src, frameWidth, zoomLevel } = this.props
    if (src !== prevProps.src) image.src = src
    else if (frameWidth !== prevProps.frameWidth) {
      this.myImage.cache()
      this.myImage.getLayer().draw()
    } else if (zoomLevel !== prevProps.zoomLevel) {
      this.myImage.cache()
      this.myImage.getLayer().draw()
    }
  }

  handleDragEnd = (e) => {
    this.setState({
      x: e.target.x(),
      y: e.target.y()
    })
  }

  render() {
    const { frameWidth, enableFrame, zoomLevel } = this.props
    const { x, y } = this.state
    const width = enableFrame
      ? CANVAS_SIZE - parseInt(frameWidth, 0)
      : CANVAS_SIZE
    return (
      <Layer>
        <Image
          name='pictoImage'
          image={this.state.image}
          ref={(node) => {
            this.myImage = node
          }}
          width={width + zoomLevel}
          height={width + zoomLevel}
          x={x}
          y={y}
          onDragEnd={this.handleDragEnd}
          draggable
        />
      </Layer>
    )
  }
}

Img.propTypes = {
  // onClick: PropTypes.func.isRequired,
  frameWidth: PropTypes.number,
  src: PropTypes.string.isRequired,
  enableFrame: PropTypes.bool.isRequired,
  origin: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
}

export default Img
