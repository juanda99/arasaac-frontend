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

const Showcase = () => (
  <FullWidthSection>
    <Item
      title={<FormattedMessage {...messages.saac} />}
      ruote='/get-started'
      img={PictogramsImage}
    />
    <Item
      title={<FormattedMessage {...messages.software} />}
      ruote='/get-started'
      img={SoftwareImage}
    />
    <Item
      title={<FormattedMessage {...messages.news} />}
      ruote='/get-started'
      img={NewsImage}
    />
  </FullWidthSection>
)

export default Showcase
