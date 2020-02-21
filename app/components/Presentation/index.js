/**
*
* Welcome
*
*/


import React from 'react'
import { FormattedMessage } from 'react-intl'
import { lightGreen500 } from 'material-ui/styles/colors'
import FullWidthSection from './FullWidthSection'
import Slider from 'react-slick'
import { IMAGES_URL } from 'services/config'
import H1 from './H1'
import H2 from './H2'
import ArasaacLogo from 'components/Logo/arasaac-logo-blanco.svg'
import messages from './messages'
import Strong from './Strong'


const style = {
  width: 270,
  display: 'flex',
  margin: '0 auto',
  padding: 20,
  // backgroundColor: 'white'
}
const styleRounded = {
  width: 270,
  display: 'flex',
  margin: '0 auto',
  padding: 20,
  borderRadius: '50%',
  borderWidth: '7px',
  borderStyle: 'inset',
  borderColor: 'chartreuse',
  backgroundColor: 'white'
}

const Presentation = () => {
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

  const imgStyle = { width: '100%', height: 'auto', filter: 'brightness(70%)' }
  return (
    <FullWidthSection style={{ position: 'relative', textAlign: 'left' }} color={lightGreen500}>
      <div style={{ position: 'absolute', top: 'calc(100% - 135px)', left: 'calc(50% - 135px)', zIndex: 10 }}>
        <img alt='Arasaac logo' style={styleRounded} src={ArasaacLogo} />

      </div>
      <div style={{ position: 'absolute', bottom: '200px', left: '280px', width: '500px', zIndex: 10 }}>
        <div>
          <H1 style={{ textAlign: 'left', display: 'inline' }}>ARASAAC</H1>
        </div>

        <div>
          <H2>
            <FormattedMessage {...messages.header} values={{ aragones }} />
          </H2>
        </div>
      </div>
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

export default Presentation
