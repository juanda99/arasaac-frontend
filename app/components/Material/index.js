import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import ImageSlider from 'components/ImageSlider'
import messages from './messages'

const styles = {
  desc: {
    flexGrow: 3,
    width: '500px',
    padding: '2rem',
    textAlign: 'justify'
  },
  slides: {
    flexGrow: 1,
    width: '600px'
  },
  snippet: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap-reverse'
  },
  button: {
    margin: '0 auto'
  }
}
class Material extends Component {
  render() {
    const { material, locale } = this.props
    const images = [...material.get('commonScreenshots') || [], ...material.getIn(['screenshots', locale]) || []]
    const files = [...material.get('commonFiles') || [], ...material.getIn(['files', locale]) || []]
    // migration hack: if just one language and not under its language directory, it is compress under xx locale code
    const zipFile = material.getIn(['file', locale]) || material.getIn(['file', 'xx'])
    const authors = material.get('authors')
    const idMaterial = material.get('idMaterial')
    const title = material.get('title')
    return (
      <div>
        <H2 primary ucase>{material.get('title')}</H2>
        <div style={styles.snippet}>
          <ImageSlider images={images} id={idMaterial} style={styles.slides} />
          <div style={styles.desc}>
            <p>{material.get('desc')}</p>
            <p style={{ textAlign: 'center' }}>
              <a href={`http://static.arasaac.org/${idMaterial}/${zipFile}`}>
                <RaisedButton label={<FormattedMessage {...messages.zipFileLabel} />} primary={true} style={styles.button} />
              </a>
            </p>

          </div>
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.shareMaterial} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={title} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) => <p key={author.get('id')}>
          <a href={`http://static.arasaac.org/${idMaterial}/${zipFile}`}>{author.get('name')}</a></p>)}
        <H3 primary={true}>{<FormattedMessage {...messages.files} />}</H3>
        <Divider />
        {files.map((file) => <p key={file}><a href={`http://static.arasaac.org/${idMaterial}/${file}`}>{file}</a></p>)}
      </div>
    )
  }
}


Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default Material
