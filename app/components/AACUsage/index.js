import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import H2 from 'components/H2'
import P from 'components/P'
import {IMAGES_URL} from 'services/config'
import Item from './Item'
import Img from './Img'
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


const getUrl = (id) => `materials/search/${id}?searchType=activity`


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
          <Link to={getUrl(5)}>
            <H2 primary={true}><FormattedMessage {...messages.communicationBoards}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p1}/></P>
          <Img style={{width: '100%', height:  'auto'}} src={`${IMAGES_URL}/aac-usage/communication-board-1.jpg`} />
          <P justify><FormattedMessage {...messages.p2}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/communication-board-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(5)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(24)}>
            <H2 primary={true}><FormattedMessage {...messages.visualSchedules}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p3}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/bathroom-routine-aac.jpg`} />
          <P justify><FormattedMessage {...messages.p4}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/aac-routines.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(24)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(26)}>
            <H2 primary={true}><FormattedMessage {...messages.visualTimetables}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p5}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/visual-timetable-aac-1.jpg`} />
          <P justify><FormattedMessage {...messages.p6}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/visual-timetable-aac-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(26)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(30)}>
            <H2 primary={true}><FormattedMessage {...messages.socialStories}/></H2>
          </Link>      
          <P justify><FormattedMessage {...messages.p7}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/social-stories-aac.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(30)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(24)}>
            <H2 primary={true}><FormattedMessage {...messages.behavioralStrategies}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p8}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/behavioral-strategies-aac.jpg`} />
          <P justify><FormattedMessage {...messages.p9}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/behavioral-strategies-aac-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(24)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(36)}>
            <H2 primary={true}><FormattedMessage {...messages.teacch}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p10}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/teacch.jpg`} />
          <P justify><FormattedMessage {...messages.p11}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/teacch-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(36)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(24)}>
            <H2 primary={true}><FormattedMessage {...messages.lifeSkills}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p12}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/life-skills.jpg`} />
          <P justify><FormattedMessage {...messages.p13}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/life-skills-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(24)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(24)}>
            <H2 primary={true}><FormattedMessage {...messages.learning}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p14}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/learning-1.jpg`} />
          <P justify><FormattedMessage {...messages.p15}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/learning-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(24)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(25)}>
            <H2 primary={true}><FormattedMessage {...messages.signposting}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p16}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/signage-1.jpg`} />
          <P justify><FormattedMessage {...messages.p17}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/signage-2.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(25)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
        <Item>
          <Link to={getUrl(24)}>
            <H2 primary={true}><FormattedMessage {...messages.otherContexts}/></H2>
          </Link>
          <P justify><FormattedMessage {...messages.p18}/></P>
          <Img src={`${IMAGES_URL}/aac-usage/16.jpg`} />
          <Link style={{margin: '0  auto'}} to={getUrl(24)}>
            <RaisedButton label={<FormattedMessage {...messages.showResources}/>} style={{maxWidth: '200px'}} secondary={true}/>  
          </Link>
        </Item>
      </Masonry>
    </div>
  )
}

export default injectIntl(AACUsage)


