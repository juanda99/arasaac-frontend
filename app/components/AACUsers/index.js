import React from 'react'
import { FormattedMessage } from 'react-intl'
import H2 from 'components/H2'
import P from 'components/P'
import {IMAGES_URL} from 'services/config'
import Item from 'components/AACUsage/Item'
import Img from 'components/AACUsage/Img'
import messages from './messages'
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


const AACUsers = () => {
  const masonryOptions = {
    transitionDuration: '1s',
    // isOriginLeft: !rtl
  }

  return (
    <div>
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
          <P><FormattedMessage {...messages.p1}/></P>
          <Img src={`${IMAGES_URL}/aac-users/autism.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title2}/></H2>
          <P><FormattedMessage {...messages.p2}/></P>
          <Img src={`${IMAGES_URL}/aac-users/cerebral-palsy.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title3}/></H2>
          <P><FormattedMessage {...messages.p3}/></P>
          <Img src={`${IMAGES_URL}/aac-users/elderly-aac.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title4}/></H2>
          <P><FormattedMessage {...messages.p4}/></P>
          <Img src={`${IMAGES_URL}/aac-users/sanitary-aac.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title5}/></H2>
          <P><FormattedMessage {...messages.p5}/></P>
          <Img src={`${IMAGES_URL}/aac-users/first-reader.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title6}/></H2>
          <P><FormattedMessage {...messages.p6}/></P>
          <Img src={`${IMAGES_URL}/aac-users/speaker.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title7}/></H2>
          <P><FormattedMessage {...messages.p7}/></P>
          <Img src={`${IMAGES_URL}/aac-users/tourists-info.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.title8}/></H2>
          <P><FormattedMessage {...messages.p8}/></P>
          <Img src={`${IMAGES_URL}/aac-users/restaurant-aac.jpg`} />
        </Item>

      </Masonry>
    </div>
  )
}

export default AACUsers


