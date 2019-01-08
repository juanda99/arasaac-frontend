/* Gist taken from https://gist.github.com/andrewluetgers/7c4a90cbe6341c401d0b7975a8ceeedb */

import React, { Component } from 'react'
import Konva from 'konva'
import { Image } from 'react-konva'

const imgCache = {
  brokenImage: document.createElement('img')
}

const brokenImage = imgCache.brokenImage
brokenImage.src = '/assets/broken-image.png'
brokenImage.onload = () => {
  console.log('preloaded broken image')
  this.brokenImage = true
}

class Img extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      image: null,
      error: false,
      loaded: false
    }
  }

  loadImg(src) {
    if (!src) {
      throw new Error(`Expected image src instead saw ${typeof src}`)
    }

    let img = imgCache[src]

    if (!img) {
      console.log('cacheImg...')
      img = imgCache[src] = document.createElement('img')
      img.loadFns = []
      img.errorFns = []
      img.onerror = function () {
        img.error = true
        console.log('image error handlers', img.errorFns)
        img.errorFns.forEach((fn) => fn.call(img))
      }
      img.onload = function () {
        let hasNH = 'naturalHeight' in img,
          w = hasNH ? 'naturalWidth' : 'width',
          h = hasNH ? 'naturalHeight' : 'height',
          invalidImg = img[w] + img[h] == 0

        if (invalidImg) {
          console.log('calling image onerror')
          img.onerror()
        } else {
          img.loaded = true
          console.log('image load handlers', img.loadFns)
          img.loadFns.forEach((fn) => fn.call(img))
        }
      }
    }

    if (!img.loaded && !img.error) {
      console.log('set handlers')
      img.loadFns.push(() => {
        img.loaded = true
        this.setState({ loaded: true, image: img })
        console.log('Image loaded', src)
      })

      img.errorFns.push(() => {
        img.error = true
        this.setState({ error: true, image: brokenImage })
        console.log('Error loading image', src, this.state)
      })
    } else if (img.error) {
      this.setState({ error: true, image: brokenImage })
      console.log('Error previously loading image', src)
    } else {
      this.setState({ loaded: true, image: img })
      console.log('Image pre-loaded', src)
    }

    if (!img.src) {
      console.log('set img src to', src)
      img.src = src
    }
  }

  fillRect = (p, c) =>
    c.width / c.height < p.width / p.height
      ? { width: p.width, height: c.height * (p.width / c.width) }
      : { height: p.height, width: c.width * (p.height / c.height) }

  fitRect = (p, c) =>
    c.width / c.height > p.width / p.height
      ? { width: p.width, height: c.height * (p.width / c.width) }
      : { height: p.height, width: c.width * (p.height / c.height) }

  getDims = (space, parent, child) => {
    switch (space) {
      case 'fill':
        return this.fillRect(parent, child)
      case 'fit':
      default:
        return this.fitRect(parent, child)
    }
  }

  componentWillMount = () => {
    this.loadImg(this.props.src)
  }
  componentDidUpdate = (prevProps) => {
    const { src } = this.props
    if (src !== prevProps.src) this.loadImg(src)
  }

  render() {
    console.log('render', this.props)
    const selfDims = { width: this.props.width, height: this.props.height }
    const image = this.state.image
    const imageDims = image
        ? { width: image.width, height: image.height }
        : selfDims,
      dims = this.getDims(this.props.space, selfDims, imageDims),
      pos = { x: this.props.x || 0, y: this.props.y || 0 }

    return (
      <Image
        image={this.state.image}
        x={pos.x}
        y={pos.y}
        width={dims.width}
        height={dims.height}
        filters={[Konva.Filters.Grayscale]}
      />
    )
  }
}

export default Img
