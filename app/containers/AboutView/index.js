import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import P from 'components/P'
import H2 from 'components/H2'
import View from 'components/View'
import {
  IMAGES_URL
} from 'services/config'
import AuthorSnippet from 'components/AuthorSnippet'
import GitHubIcon from './GibhubIcon'
import FacebookIcon from './FacebookIcon'
import messages from './messages'
const Masonry = require('react-masonry-component')
const masonryOptions = {
  transitionDuration: '1s'
}
// import PropTypes from 'prop-types'

const authors = [
  {
    name: 'José Manuel Marcos Rodrigo',
    imageSource: `${IMAGES_URL}/team/jose-manuel-marco.png`,
    desc: ''
  },
  {
    name: 'David Romero Corral',
    imageSource: `${IMAGES_URL}/team/david-romero.png`,
    desc: ''
  },
  {
    name: 'Juan Daniel Burró Aláez',
    imageSource: `${IMAGES_URL}/team/juanda.png`,
    desc: ''
  },
  {
    name: 'Luis Miguel Morillas',
    imageSource: `${IMAGES_URL}/team/jose-manuel-marco.png`,
    desc: ''
  }
]

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around'
  }
}
class AboutView extends Component {


  render() {
    return (
      <View left={true} right={true}>
        <H2 primary={true}>{<FormattedMessage {...messages.whatIsArasaac} />}</H2>
        <P>{<FormattedMessage {...messages.whatArasaacOffers} />}</P>
        <P>{<FormattedMessage {...messages.fundedBy} />}</P>
        <H2 primary={true}>{<FormattedMessage {...messages.arasaacTeam} />}</H2>
        <Masonry
          className={'my-gallery-class'} // default ''
          elementType={'ul'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          style={styles.masonry}
        >
          {authors.map((author) => <AuthorSnippet key={author.name} name={author.name} imageSource={author.imageSource} />)}
        </Masonry>
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: 10, display: 'flex' }}>
            <img src={`${IMAGES_URL}/team/jose-manuel-marco.png`} style={{ width: '100px', height: 'auto' }} />
            <a href='https://www.facebook.com/josemanuelmarcosrodrigo'><FacebookIcon />  José Manuel Marcos Rodrigo</a>
          </div>
          <div style={{ margin: 10 }}>
            <img src={`${IMAGES_URL}/team/david-romero.png`} style={{ width: '100px', height: 'auto' }} />
            <a href='https://www.facebook.com/david.romerocorral'><FacebookIcon />  David Romero Corral</a>
          </div>
          <div style={{ margin: 10 }}>
            <img src={`${IMAGES_URL}/team/jose-manuel-marco.png`} style={{ width: '100px', height: 'auto' }} />
            <a href='https://github.com/lmorillas'><GitHubIcon />  Luis Miguel Morillas</a>
          </div>
          <div style={{ margin: 10 }}>
            <img src={`${IMAGES_URL}/team/juanda.png`} style={{ width: '100px', height: 'auto' }} />
            <a href='https://github.com/juanda99'><GitHubIcon />  Juan Daniel Burró Aláez</a>
          </div>
        </div> */}
      </View >
    )
  }
}

export default AboutView
