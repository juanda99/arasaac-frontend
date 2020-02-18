
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FullWidthSection from 'components/FullWidthSection'
import { grey200 } from 'material-ui/styles/colors'
import Slider from 'react-slick'
import { IMAGES_URL } from 'services/config'
// TODO: loading style css from index.html, put it here with our custom style


class Presentation extends Component {


  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <FullWidthSection color={grey200}>
        <Slider {...settings}>
          <div>
            <img src={`${IMAGES_URL}/slides/comunication.jpeg`} style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/slides/tablero.jpeg`} style={{ width: '100%', maxWidth: '600px' }} />
          </div>

        </Slider>



      </FullWidthSection>
    )
  }
}

Presentation.propTypes = {

}

export default Presentation
