/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { IntlProvider } from 'react-intl'
import { makeSelectLocale } from './selectors'

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    // if error with a locale in React-intl....
    let locale = this.props.paramLocale || this.props.locale
    if (this.props.locale === 'br') {
      locale = 'pt'
    } else if (this.props.locale === 'val') {
      locale = 'ca'
    } else if (this.props.locale === 'an') {
      locale = 'es'
    }
    return (
      <IntlProvider
        locale={locale}
        key={this.props.locale}
        messages={
          this.props.messages[this.props.paramLocale || this.props.locale]
        }
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  /* set locale by url for aac learning menu */
  paramLocale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
}

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}))

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider)
