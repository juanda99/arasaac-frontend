import React from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import ShareBar from 'components/ShareBar'
// import { toJS } from 'immutable'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import messages from './messages'

const Material = ({ material, locale }) =>
  <View left={true} right={true}>
    <H2 primary={true}>{material.get('title')}</H2>
    <p>{material.get('desc')}</p>
    <p>{locale} </p>
    <p>{<FormattedMessage {...messages.downloads} />} {material.get('downloads')}</p>
    <ShareBar shareUrl={window.location.href} title={material.get('title')} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
  </View>


// needed for tests: seee https://github.com/facebook/jest/issues/1824
Material.displayName = 'Material'

Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default Material
