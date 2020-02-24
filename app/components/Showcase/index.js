/**
*
* Showcase
*
*/

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Grid, Row, Col } from 'react-flexbox-grid'
import FullWidthSection from 'components/FullWidthSection'
import messages from './messages'
import Item from './Item'
import SoftwareImage from './software.png'
import NewsImage from './news.png'
import PictogramsImage from './pictograms.png'


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

