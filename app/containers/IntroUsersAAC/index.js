import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import View from 'components/View'
import {Helmet} from 'react-helmet'
import AAC from 'components/AAC'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import messages from './messages'
class IntroUsersAAC extends Component {


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
          <AAC />
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
)(injectIntl(IntroUsersAAC))

IntroUsersAAC.propTypes = {
  locale: PropTypes.string.isRequired,
}
