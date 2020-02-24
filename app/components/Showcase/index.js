/**
*
* Showcase
*
*/

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Grid, Row, Col } from 'react-flexbox-grid'
import FullWidthSection from 'components/FullWidthSection'
import { IMAGES_URL } from 'services/config'
import messages from './messages'
import Item from './Item'

const Showcase = () => (


  <FullWidthSection>
    <Grid>
      <Row>
        <Col xs={12} md={4}>
          <Item
            title={<FormattedMessage {...messages.saac} />}
            route='/pictograms/search'
            image={`${IMAGES_URL}/pictograms.jpg`}
          />
        </Col>
        <Col xs={12} md={4}>
          <Item
            title={<FormattedMessage {...messages.software} />}
            route='/materials/search'
            image={`${IMAGES_URL}/materiales.jpg`}
          />
        </Col>
        <Col xs={12} md={4}>
          <Item
            title={<FormattedMessage {...messages.news} />}
            route='http://aulaabierta.arasaac.org/'
            image={`${IMAGES_URL}/aula-abierta.jpg`}
          />
        </Col>
      </Row>
    </Grid>
  </FullWidthSection>
)

export default Showcase

