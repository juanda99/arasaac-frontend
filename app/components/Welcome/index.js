/**
*
* Welcome
*
*/


import React from 'react'
import { FormattedMessage } from 'react-intl'
import { lightGreen500, grey400 } from 'material-ui/styles/colors'
import FullWidthSection from './FullWidthSection'
import Slider from 'react-slick'
import { IMAGES_URL } from 'services/config'
import H1 from 'components/H1'
import H2 from 'components/H2'
// import ShowArea from 'components/ShowArea'
import LocaleToggle from 'containers/LocaleToggle'
import Logo from 'components/Logo'
import messages from './messages'

import Strong from './Strong'

const Welcome = () => {
  const aragones = <Strong><FormattedMessage {...messages.aragonese} /> </Strong>
  const settings = {
    dots: true,
    infinite: true,
    speed: 10,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <FullWidthSection noPadding={true}>
      <Slider {...settings}>
        <div>
          <div style={{ padding: '30px', backgroundImage: `url(${IMAGES_URL}/background/fondo_1.jpg)`, display: 'flex', alignItems: 'center' }}>
            <div style={{ flexBasis: '50%' }}>
              <Logo />
              <H1 center={true}>ARASAAC</H1>
              <H2 center={true}>
                <FormattedMessage {...messages.header} values={{ aragones }} />
              </H2>
            </div>
          </div>
        </div>
        <div>
          <div style={{ padding: '30px', backgroundImage: `url(${IMAGES_URL}/background/fondo_2.jpg)`, display: 'flex', alignItems: 'center' }}>
            <div style={{ flexBasis: '50%' }}>
              <Logo />
              <H1 center={true}>ARASAAC</H1>
              <H2 center={true}>
                <FormattedMessage {...messages.header} values={{ aragones }} />
              </H2>
            </div>
          </div>
        </div>
        <div>
          <div style={{ padding: '30px', backgroundImage: `url(${IMAGES_URL}/background/fondo_3.jpg)`, display: 'flex', alignItems: 'center' }}>
            <div style={{ flexBasis: '50%' }}>
              <Logo circle={true} />
              <H1 center={true}>ARASAAC</H1>
              <H2 center={true}>
                <FormattedMessage {...messages.header} values={{ aragones }} />
              </H2>
            </div>
          </div>
        </div>
      </Slider>
    </FullWidthSection>
  )
}

export default Welcome
