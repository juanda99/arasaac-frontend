import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

class Material extends Component {
  render() {
    const { material, locale } = this.props
    return (
      <div>
        <H2 primary={true}>{material.get('title')}</H2>
        <p>{material.get('desc')}</p>

        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {material.get('authors').valueSeq().map((author) => <p key={author.get('id')}>{author.get('name')}</p>)}
        <H3 primary={true}>{<FormattedMessage {...messages.files} />}</H3>
        <Divider />
        {material.get('files').map((file) => <p key={file}>{file}</p>)}
        <p>{locale} </p>
        <p>{<FormattedMessage {...messages.downloads} />} {material.get('downloads')}</p>
        <ShareBar shareUrl={window.location.href} title={material.get('title')} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
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
