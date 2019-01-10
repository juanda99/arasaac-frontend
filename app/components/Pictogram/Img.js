/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Layer } from 'react-konva'
import { CANVAS_SIZE } from './constants'

const image = new window.Image()

class Img extends Component {
  state = {
    image: null
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
    const { src, frameWidth } = this.props
    if (src !== prevProps.src) image.src = src
    else if (frameWidth !== prevProps.frameWidth) {
      this.myImage.cache()
      this.myImage.getLayer().draw()
    }
  }

  render() {
    const { frameWidth, enableFrame, origin } = this.props
    const width = enableFrame
      ? CANVAS_SIZE - parseInt(frameWidth, 0)
      : CANVAS_SIZE
    return (
      <Layer>
        <Image
          image={this.state.image}
          ref={(node) => {
            this.myImage = node
          }}
          width={width}
          height={width}
          x={frameWidth / 2 + origin}
          y={frameWidth / 2 + origin}
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
  origin: PropTypes.number.isRequired
}

export default Img
