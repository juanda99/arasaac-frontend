import React from 'react'
import PropTypes from 'prop-types'
import View from 'components/View'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import PrivacyPolicyEn from './PrivacyPolicyEn'
import PrivacyPolicyEs from './PrivacyPolicyEs'

export class PrivacyPolicyView extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale } = this.props
    let privacyPolicyText
    if (
      locale === 'es' ||
      locale === 'ca' ||
      locale === 'eu' ||
      locale === 'gl' ||
      locale === 'val' ||
      locale == 'an'
    ) {
      privacyPolicyText = <PrivacyPolicyEs />
    } else {
      privacyPolicyText = <PrivacyPolicyEn />
    }
    return (
      <View left={true} right={true} top={1} dir="ltr">
        <Helmet
          title="Política de Privacidad"
          meta={[
            {
              name: 'description',
              content: 'Política de Privacidad de datos de ARASAAC',
            },
          ]}
        />
        {privacyPolicyText}
      </View>
    )
  }
}

PrivacyPolicyView.propTypes = {
  locale: PropTypes.string,
}

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}))

export default connect(mapStateToProps)(PrivacyPolicyView)
