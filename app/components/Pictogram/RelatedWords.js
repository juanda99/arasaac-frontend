import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Chip from 'material-ui/Chip'
import H3 from 'components/H3'
import ShowSoundPlayer from 'components/SoundPlayer/ShowSoundPlayer'
import Divider from 'material-ui/Divider'
import LanguageSelector from 'components/LanguageSelector'
import { FormattedMessage } from 'react-intl'
import { lightGreen400} from 'material-ui/styles/colors'
import api from 'services'
import P from 'components/P'
import messages from './messages'

const styles = {
  chip: {
    margin: '4px'
  }
}
export default class RelatedWords extends Component {
  static propTypes = {
    language: PropTypes.string,
    idPictogram: PropTypes.number.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    style: PropTypes.object,
    tags: ImmutablePropTypes.list.isRequired,
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
    const { language, style, tags } = this.props
    return (
      <div style={style}>
        <H3 primary>{<FormattedMessage {...messages.description} />}</H3>
        <Divider />
        { tags && 
          <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '10px'}}>
            {tags.map(tag =>
              <Chip backgroundColor={lightGreen400} key={tag} style={styles.chip}>
                {tag}
              {/* {<FormattedMessage {...messages[tag]} />} */}
              </Chip>
            )}
          </div>
        }
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
