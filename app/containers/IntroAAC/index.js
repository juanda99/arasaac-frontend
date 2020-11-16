import React, { Component } from 'react'
import LanguageProvider from 'containers/LanguageProvider'
// Import i18n messages
import { translationMessages } from '../../i18n'
import View from 'components/View'
import AAC from 'components/AAC'
import ReadMargin from 'components/ReadMargin'
class IntroAAC extends Component {

  componentDidMount() {
    /* hack to open learning aac menu when visiting from homepage */
    const isOpen = window.document.getElementById("whatIsAAC")
    if (!isOpen) document.getElementById('lstlearning').click()
  }
  
  render() {

    const { params: { language } } = this.props

    return (
      <LanguageProvider messages={translationMessages} paramLocale={language}>
        <View left={true} right={true}>
          <ReadMargin>
            <AAC />
          </ReadMargin>
        </View >
      </LanguageProvider>
    )
  }
}

export default IntroAAC
