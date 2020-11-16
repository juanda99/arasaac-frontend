import React from 'react'
import {Helmet} from 'react-helmet'
import { FormattedMessage, injectIntl } from 'react-intl'
import H2 from 'components/H2'
import P from 'components/P'
import {IMAGES_URL} from 'services/config'
import Item from 'components/AACUsage/Item'
import Img from 'components/AACUsage/Img'
import messages from './messages'
import metaMessages from 'containers/IntroUsersAAC/messages'
const Masonry = require('react-masonry-component')


const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around'
  }
}


const AACUsers = ({intl}) => {
  const masonryOptions = {
    transitionDuration: '1s',
    // isOriginLeft: !rtl
  }

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage(metaMessages.title)}</title>
        <meta name="description" content={intl.formatMessage(metaMessages.desc)} />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <P><FormattedMessage {...messages.intro} /></P>
      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        style={styles.masonry}
      >
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title1}/></H2>
          <P justify><FormattedMessage {...messages.p1}/></P>
          <Img src={`${IMAGES_URL}/aac-users/autism.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title2}/></H2>
          <P justify><FormattedMessage {...messages.p2}/></P>
          <Img src={`${IMAGES_URL}/aac-users/cerebral-palsy.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title3}/></H2>
          <P justify><FormattedMessage {...messages.p3}/></P>
          <Img src={`${IMAGES_URL}/aac-users/elderly-aac.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title4}/></H2>
          <P justify><FormattedMessage {...messages.p4}/></P>
          <Img src={`${IMAGES_URL}/aac-users/sanitary-aac.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title5}/></H2>
          <P justify><FormattedMessage {...messages.p5}/></P>
          <Img src={`${IMAGES_URL}/aac-users/first-reader.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title6}/></H2>
          <P justify><FormattedMessage {...messages.p6}/></P>
          <Img src={`${IMAGES_URL}/aac-users/speaker.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title7}/></H2>
          <P justify><FormattedMessage {...messages.p7}/></P>
          <Img src={`${IMAGES_URL}/aac-users/tourists-info.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title8}/></H2>
          <P justify><FormattedMessage {...messages.p8}/></P>
          <Img src={`${IMAGES_URL}/aac-users/restaurant-aac.jpg`} />
        </Item>

      </Masonry>
    </div>
  )
}

export default injectIntl(AACUsers)


