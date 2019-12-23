import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
// import PropTypes from 'prop-types'
import View from 'components/View'
import { IMAGES_URL } from 'services/config'
import messages from './messages'
import P from 'components/P'

class TranslateView extends Component {


  render() {
    return (
      <View left={true} right={true}>
        <div style={{ display: 'flex' }}>
          <FormattedMessage {...messages.crowdinService} />
          <img style={{ maxWidth: '500px', border: '1px solid black' }} src={`${IMAGES_URL}/translators/1-crowdin-email.png`} alt='Crowdin' />
        </div>
      </View >
    )
  }
}

export default TranslateView
