import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import View from 'components/View'
import RaisedButton from 'material-ui/RaisedButton'
import P from 'components/P'
import {Helmet} from 'react-helmet'
import { Link } from 'react-router'
import AAC from 'components/AAC'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import messages from './messages'
class IntroAAC extends Component {


  render() {
    const { locale, intl } = this.props
    const { formatMessage } = intl
    let renderInfo
    if (locale === 'es' || locale === 'gl' || locale === 'eu' || locale === 'ca' || locale === 'val') {
      renderInfo = (
        <P>{<FormattedMessage {...messages.infoSpanish} />}
          <Link to='/saac'>
            <RaisedButton label={formatMessage(messages.inSpanish)} style={{ marginLeft: 10 }} />
          </Link>
        </P>
      )
    }
    else if (locale === 'en') renderInfo = null
    else {
      renderInfo = (
        <P>{<FormattedMessage {...messages.justSpanish} />}
          <Link to='/saac'>
            <RaisedButton label={formatMessage(messages.inSpanish)} style={{ marginLeft: 10 }} />
          </Link>
        </P>
      )
    }
    return (
      <View left={true} right={true}>
        <Helmet>
          <title>What is AAC? - ARASAAC</title>
          <meta name="description" content="The Augmentative and Alternative Systems of Communication (AAC) aim at increasing or compensate the difficulties of communication of people with disabilities." />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}

        </Helmet>
        <ReadMargin>
          {renderInfo}
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
)(injectIntl(IntroAAC))

IntroAAC.propTypes = {
  locale: PropTypes.string.isRequired,
}
