/* Gist taken from https://gist.github.com/andrewluetgers/7c4a90cbe6341c401d0b7975a8ceeedb */

import React, { Component } from 'react'
import Konva from 'konva'
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
    const { src } = this.props
    if (src !== prevProps.src) image.src = src
  }

  render() {
    return (
      <Image
        image={this.state.image}
        filters={[Konva.Filters.Grayscale]}
        ref={(node) => {
          this.myImage = node
        }}
        width={500}
        height={500}
      />
    )
  }
}

export default Img
