import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-konva'

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
    const { frameWidth } = this.props
    // eslint-disable-next-line no-mixed-operators
    const width = 500 - parseInt(frameWidth, 0)
    return (
      <Image
        image={this.state.image}
        ref={(node) => {
          this.myImage = node
        }}
        width={width}
        height={width}
        x={frameWidth / 2}
        y={frameWidth / 2}
      />
    )
  }
}

Img.propTypes = {
  // onClick: PropTypes.func.isRequired,
  frameWidth: PropTypes.number,
  src: PropTypes.string.isRequired
}

export default Img
