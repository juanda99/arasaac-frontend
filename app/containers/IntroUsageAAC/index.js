import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import View from 'components/View'
import {Helmet} from 'react-helmet'
import AACUsage from 'components/AACUsage'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import messages from './messages'
class IntroUsageAAC extends Component {


  render() {
    const { locale, intl } = this.props
    const { formatMessage } = intl
    return (
      <View left={true} right={true}>
        <Helmet>
          <title>{formatMessage(messages.title)}</title>
          <meta name="description" content={formatMessage(messages.desc)} />
        </Helmet>
        <ReadMargin>
          <AACUsage />
        </ReadMargin>
      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state)
})

export default connect(
  mapStateToProps
)(injectIntl(IntroUsageAAC))

IntroUsageAAC.propTypes = {
  locale: PropTypes.string.isRequired,
}
