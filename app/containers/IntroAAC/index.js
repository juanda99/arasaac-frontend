import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import View from 'components/View'
import {Helmet} from 'react-helmet'
import AAC from 'components/AAC'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import messages from './messages'
class IntroAAC extends Component {

  componentDidMount() {
    /* hack to open learning aac menu when visiting from homepage */
    const isOpen = window.document.getElementById("whatIsAAC")
    if (!isOpen) document.getElementById('lstlearning').click()
  }
  


  render() {
    const { intl } = this.props
    const { formatMessage } = intl
    const title = formatMessage(messages.title)
    const description = formatMessage(messages.desc)

    return (
      <View left={true} right={true}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}

        </Helmet>
        <ReadMargin>
          <AAC />
        </ReadMargin>
      </View >
    )
  }
}

export default injectIntl(IntroAAC)
