/**
*
* Showcase
*
*/

import React from 'react'
import { FormattedMessage } from 'react-intl'
import FullWidthSection from 'components/FullWidthSection'
import { IMAGES_URL } from 'services/config'
import messages from './messages'
import Item from './Item'

const Showcase = () => (


  <FullWidthSection style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: 'white' }}>

    <Item
      title={<FormattedMessage {...messages.pictograms} />}
      route='/pictograms/search'
      image={`${IMAGES_URL}/pictograms.jpg`}
    />

    <Item
      title={<FormattedMessage {...messages.materials} />}
      route='/materials/search'
      image={`${IMAGES_URL}/materiales.jpg`}
    />

    <Item
      title='Aula Abierta'
      route='http://aulaabierta.arasaac.org/'
      image={`${IMAGES_URL}/aula-abierta.jpg`}
    />

  </FullWidthSection>
)

export default Showcase

