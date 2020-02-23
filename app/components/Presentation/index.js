/**
*
* Welcome
*
*/


import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { lightGreen500 } from 'material-ui/styles/colors'
import FullWidthSection from './FullWidthSection'
import Slider from 'react-slick'
import RaisedButton from 'material-ui/RaisedButton'
import { IMAGES_URL } from 'services/config'
import H1 from './H1'
import H2 from './H2'
import Logo from 'components/Logo'
import messages from './messages'


const Presentation = ({ run, onStart, muiTheme }) => {
  // const aragones = <Strong><FormattedMessage {...messages.aragonese} /> </Strong>
  const aragones = <FormattedMessage {...messages.aragonese} />
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    fade: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  const imgStyle = { width: '100%', height: 'auto', filter: 'brightness(50%)' }
  return (
    <FullWidthSection style={{ position: 'relative', textAlign: 'left' }} color={muiTheme.palette.welcomeColor}>
      <Logo circle={true} />
      <H1>ARASAAC</H1>
      <H2><FormattedMessage {...messages.header} values={{ aragones }} /></H2>
      <RaisedButton
        label='Descubre ARASAAC'
        primary={true}
        onClick={onStart}
        style={{ marginTop: '20px', position: 'absolute', zIndex: 10, left: '50%', bottom: '180px', marginRight: '-50%', transform: 'translate(-50%, 0)' }}
        disabled={run === true}
      />
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Slider {...settings} >
          <div>
            <img src={`${IMAGES_URL}/background/banner_1.jpg`} style={imgStyle} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/background/banner_2.jpg`} style={imgStyle} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/background/banner_3.jpg`} style={imgStyle} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/background/banner_4.jpg`} style={imgStyle} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/background/banner_5.jpg`} style={imgStyle} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/background/banner_6.jpg`} style={imgStyle} />
          </div>
          <div>
            <img src={`${IMAGES_URL}/background/banner_7.jpg`} style={imgStyle} />
          </div>
        </Slider>
      </div>
    </FullWidthSection >
  )
}

Presentation.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  run: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
}

export default muiThemeable()(Presentation)
