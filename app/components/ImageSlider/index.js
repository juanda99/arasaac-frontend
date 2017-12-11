import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactSlidy from 'react-slidy'
import '!!style-loader!css-loader!./index.css'

class ImageSlider extends Component {
  render() {
    const { id, images, style } = this.props
    return (
      <div style={style}>
        <ReactSlidy dynamicContent infinite={false}>
          {
            images.length ?
              images.map((image, key) => (
                <img key={key} src={`//static.arasaac.org/${id}/screenshots/${image}`} alt='Screenshot' />
              ))
            : <img src={'//static.arasaac.org/noimage.png'} alt='Screenshot not available' />
          }
        </ReactSlidy>
      </div>
    )
  }
}

ImageSlider.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number.isRequired
}

export default ImageSlider
