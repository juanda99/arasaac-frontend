/**
*
* Showcase
*
*/

import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import FullWidthSection from './FullWidthSection'
import Item from './Item'
import SoftwareImage from './software.png'
import NewsImage from './news.png'
import PictogramsImage from './pictograms.png'
import { Grid, Row, Col } from 'react-flexbox-grid'

const Showcase = () => (
  <FullWidthSection>
    <Grid>
      <Row>
        <Col xs={12} md={4}>
          <Item
            title={<FormattedMessage {...messages.saac} />}
            route='/get-started'
            image={PictogramsImage}
          />
        </Col>
        <Col xs={12} md={4}>
          <Item
            title={<FormattedMessage {...messages.software} />}
            route='/get-started'
            image={SoftwareImage}
          />
        </Col>
        <Col xs={12} md={4}>
          <Item
            title={<FormattedMessage {...messages.news} />}
            route='/get-started'
            image={NewsImage}
          />
        </Col>
      </Row>
    </Grid>
  </FullWidthSection>
)

export default Showcase

