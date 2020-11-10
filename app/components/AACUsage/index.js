import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import H2 from 'components/H2'
import P from 'components/P'
import A from 'components/A'
import {IMAGES_URL} from 'services/config'
import Div from './Div'
import Item from './Item'
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


const AACUsage = ({intl}) => {
  const masonryOptions = {
    transitionDuration: '1s',
    // isOriginLeft: !rtl
  }
  const numberPictograms = intl.formatNumber(11000)

  return (
    <div>
      <P><FormattedMessage {...messages.intro}  values={{numberPictograms}} /></P>
      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        style={styles.masonry}
      >
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.communicationBoards}/></H2>
          <P><FormattedMessage {...messages.p1}/></P>
          <img src={`${IMAGES_URL}/aac-usage/communication-board-1.jpg`} />
          <P><FormattedMessage {...messages.p2}/></P>
          <img src={`${IMAGES_URL}/aac-usage/communication-board-2.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.visualSchedules}/></H2>
          <P><FormattedMessage {...messages.p3}/></P>
          <img src={`${IMAGES_URL}/aac-usage/bathroom-routine-aac.jpg`} />
          <P><FormattedMessage {...messages.p4}/></P>
          <img src={`${IMAGES_URL}/aac-usage/aac-routines.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.visualTimetables}/></H2>
          <P><FormattedMessage {...messages.p5}/></P>
          <img src={`${IMAGES_URL}/aac-usage/visual-timetable-aac-1.jpg`} />
          <P><FormattedMessage {...messages.p6}/></P>
          <img src={`${IMAGES_URL}/aac-usage/visual-timetable-aac-2.jpg`} />
        </Item>
        <Item>      
          <H2 primary={true}><FormattedMessage {...messages.socialStories}/></H2>
          <P><FormattedMessage {...messages.p7}/></P>
          <img src={`${IMAGES_URL}/aac-usage/social-stories-aac.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.behavioralStrategies}/></H2>
          <P><FormattedMessage {...messages.p8}/></P>
          <img src={`${IMAGES_URL}/aac-usage/behavioral-strategies-aac.jpg`} />
          <P><FormattedMessage {...messages.p9}/></P>
          <img src={`${IMAGES_URL}/aac-usage/behavioral-strategies-aac-2.jpg`} />
          
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.teacch}/></H2>
          <P><FormattedMessage {...messages.p10}/></P>
          <img src={`${IMAGES_URL}/aac-usage/teacch.jpg`} />
          <P><FormattedMessage {...messages.p11}/></P>
          <img src={`${IMAGES_URL}/aac-usage/teacch-2.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.lifeSkills}/></H2>
          <P><FormattedMessage {...messages.p12}/></P>
          <img src={`${IMAGES_URL}/aac-usage/life-skills.jpg`} />
          <P><FormattedMessage {...messages.p13}/></P>
          <img src={`${IMAGES_URL}/aac-usage/life-skills-2.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.learning}/></H2>
          <P><FormattedMessage {...messages.p14}/></P>
          <img src={`${IMAGES_URL}/aac-usage/learning-1.jpg`} />
          <P><FormattedMessage {...messages.p15}/></P>
          <img src={`${IMAGES_URL}/aac-usage/learning-2.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.signposting}/></H2>
          <P><FormattedMessage {...messages.p16}/></P>
          <img src={`${IMAGES_URL}/aac-usage/signage-1.jpg`} />
          <P><FormattedMessage {...messages.p17}/></P>
          <img src={`${IMAGES_URL}/aac-usage/signage-2.jpg`} />
        </Item>
        <Item>
          <H2 primary={true}><FormattedMessage {...messages.otherContexts}/></H2>
          <P><FormattedMessage {...messages.p18}/></P>
          <img src={`${IMAGES_URL}/aac-usage/16.jpg`} />
          <img src={`${IMAGES_URL}/aac-usage/17.jpg`} />
          <img src={`${IMAGES_URL}/aac-usage/18.jpg`} />
        </Item>
      </Masonry>
    </div>
  )
}

export default injectIntl(AACUsage)


