import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H3 from 'components/H3'
import Divider from 'material-ui/Divider'
import LanguageSelector from 'components/LanguageSelector'
import { FormattedMessage } from 'react-intl'
import api from 'services'
import P from 'components/P'
import SoundPlayer from 'components/SoundPlayer'
import { LOCUTIONS_URL } from 'services/config'
import messages from './messages'

export default class Translations extends Component {
  static propTypes = {
    language: PropTypes.string,
    idPictogram: PropTypes.number.isRequired,
    onLanguageChange: PropTypes.func.isRequired
  }

  state = {
    keywords: []
  }

  componentDidMount = () => {
    const { idPictogram, language } = this.props
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((keywords) => {
      this.setState({ keywords })
    })
  }

  getSoundPlayer = (idLocution, locale) => (
    <SoundPlayer
      crossOrigin='anonymous'
      streamUrl={`${LOCUTIONS_URL}/${locale}/${idLocution}`}
      preloadType='metadata'
      showProgress={false}
      showTimer={false}
    />
  )

  handleLanguageChange = (language) => {
    const { idPictogram, onLanguageChange } = this.props
    onLanguageChange(language)
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((keywords) => {
      this.setState({ keywords })
    })
  }

  render() {
    const { keywords } = this.state
    const { language } = this.props
    return (
      <div>
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <Divider />
        <P>{<FormattedMessage {...messages.changePictoLanguage} />}</P>
        <LanguageSelector
          value={language}
          onChange={this.handleLanguageChange}
          shortOption={true}
          showToolTip={false}
        />

        {keywords.map((keyword, index) => (
          <div key={`${keyword.keyword}-${index}`} style={{ display: 'flex' }}>
            {keyword.idLocution &&
              this.getSoundPlayer(keyword.idLocution, language)}
            <P important={true} marginRight={'10px'}>
              {keyword.keyword}
            </P>
            <P>{keyword.meaning}</P>
          </div>
        ))}
      </div>
    )
  }
}
