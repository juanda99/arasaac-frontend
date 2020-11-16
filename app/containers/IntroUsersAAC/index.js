import React, { Component } from 'react'
import LanguageProvider from 'containers/LanguageProvider'
// Import i18n messages
import { translationMessages } from '../../i18n'
import View from 'components/View'
import AACUsers from 'components/AACUsers'
import ReadMargin from 'components/ReadMargin'
class IntroUsersAAC extends Component {


  render() {
    const { params: { language } } = this.props
    return (
      <LanguageProvider messages={translationMessages} paramLocale={language}>
        <View left={true} right={true}>
          <ReadMargin>
            <AACUsers />
          </ReadMargin>
        </View >
      </LanguageProvider>
    )
  }
}


export default IntroUsersAAC

