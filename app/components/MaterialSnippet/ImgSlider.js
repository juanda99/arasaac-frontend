import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactSlidy from 'react-slidy'
import '!!style-loader!css-loader!./index.css'

const styles = {
  snippetImg: {
    flexGrow: 1,
    width: '300px'
  }
}


class ImgSlider extends Component {
  render() {
    const { id, images } = this.props
    return (
      <div style={styles.snippetImg}>
        <div style={{ display: 'block' }}>
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
      </div>
    )
  }
}

ImgSlider.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number.isRequired
}

export default ImgSlider
