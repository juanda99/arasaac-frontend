import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H3 from 'components/H3'
import ShowSoundPlayer from 'components/SoundPlayer/ShowSoundPlayer'
import Divider from 'material-ui/Divider'
import LanguageSelector from 'components/LanguageSelector'
import { FormattedMessage } from 'react-intl'
import api from 'services'
import P from 'components/P'
import messages from './messages'

export default class RelatedWords extends Component {
  static propTypes = {
    language: PropTypes.string,
    idPictogram: PropTypes.number.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  state = {
    keywords: []
  };

  componentDidMount = () => {
    const { idPictogram, language } = this.props
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((data) => {
      this.setState({ keywords: data.keywords })
    })
  };

  handleLanguageChange = (language) => {
    const { idPictogram, onLanguageChange } = this.props
    onLanguageChange(language)
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((data) => {
      this.setState({ keywords: data.keywords })
    })
  };

  render() {
    const { keywords } = this.state
    const { language, style } = this.props
    return (
      <div style={style}>
        <H3 primary>{<FormattedMessage {...messages.description} />}</H3>
        <Divider />
        <P>{<FormattedMessage {...messages.changePictoLanguage} />}</P>
        <LanguageSelector
          value={language}
          onChange={this.handleLanguageChange}
          shortOption={true}
          showToolTip={false}
        />
        {keywords &&
          keywords.map((keyword, index) => {
            return (

              <div key={`${keyword.keyword}-${index}`}>
                <div style={{ display: 'flex' }}>
                    <ShowSoundPlayer hasLocution={keyword.hasLocution} locale={language} keyword={keyword.keyword} download={false} />
                    <ShowSoundPlayer hasLocution={keyword.hasLocution} locale={language} keyword={keyword.keyword} download={true} />
                  <P important={true} marginRight={'10px'}>
                    {keyword.keyword}
                  </P>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}
