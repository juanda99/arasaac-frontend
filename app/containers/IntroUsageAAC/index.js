import React, { Component } from 'react'
import LanguageProvider from 'containers/LanguageProvider'
// Import i18n messages
import { translationMessages } from '../../i18n'
import View from 'components/View'
import AACUsage from 'components/AACUsage'
import ReadMargin from 'components/ReadMargin'
class IntroUsageAAC extends Component {


  render() {
    const { params: { language } } = this.props
    return (
      <LanguageProvider messages={translationMessages} paramLocale={language}>
        <View left={true} right={true}>
          <ReadMargin>
            <AACUsage />
          </ReadMargin>
        </View >
      </LanguageProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state)
})

export default IntroUsageAAC


