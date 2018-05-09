import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import { PICTOGRAMS_URL } from 'services/config'
import { FormattedMessage } from 'react-intl'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import SoundPlayer from 'components/SoundPlayer'
import { keywordSelector } from 'utils'
import P from 'components/P'
import messages from './messages'

const styles = {

  wrapper: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  picto: {
    width: '400px',
    maxWidth: '100%',
    height: 'auto',
    marginRight: '60px',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  radioButton: {
    marginBottom: 16,
    marginTop: 16
  },
  desc: {
    flexGrow: 3,
    width: '300px'
  }
}
class Pictogram extends Component {
  state = {
    language: this.props.locale
  }

  handleChange = (event, value) => { this.setState({ language: value }) }
  render() {
    const { pictogram, searchText } = this.props
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('idPictogram')
    const { keyword } = keywordSelector(searchText, keywords.toJS())
    const authors = pictogram.get('authors')
    // const keywords = pictogram.get('keywords')
    // audio source
    const streamUrl = 'http://www.arasaac.org/repositorio/locuciones/0/2139.mp3'

    return (
      <div>
        <H2 primary ucase>{keyword}</H2>
        <div style={styles.wrapper}>
          <img src={`${PICTOGRAMS_URL}/${idPictogram}_500.png`} alt={'alt'} style={styles.picto} />
          <div style={styles.desc}>
            <H2 primary ucase>{<FormattedMessage {...messages.description} />}</H2>
            {keywords.valueSeq().map((keyword) =>
              <div key={keyword}>
                <H3 primary ucase>{keyword.get('keyword')}</H3>
                <p>{<FormattedMessage {...messages.meaning} />}: {keyword.get('meaning')}</p>
              </div>
            )}
          </div>
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.modifyPicto} />}</H3>
        <Divider />
        <RadioButtonGroup name='shipSpeed' defaultSelected='singular'>
          <RadioButton
            value='singular'
            label={<FormattedMessage {...messages.singular} />}
            style={styles.radioButton}
          />
          <RadioButton
            value='plural'
            label={<FormattedMessage {...messages.plural} />}
            style={styles.radioButton}
          />
        </RadioButtonGroup>

        <SoundPlayer streamUrl={streamUrl} preloadType='metadata' />

        <H3 primary={true}>{<FormattedMessage {...messages.sharePictogram} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={'title'} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
        <Divider />
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <p>{<FormattedMessage {...messages.changePictoLanguage} />}</p>
        <Divider />
        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) =>
          <P>
            <FlatButton
              key={author.get('id')}
              label={author.get('name')}
              labelPosition='after'
              icon={<Person />}
              href={`http://static.arasaac.org/${author}`}
            />
          </P>
        )}
      </div>
    )
  }
}


Pictogram.propTypes = {
  // onClick: PropTypes.func.isRequired,
  pictogram: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired
}

export default Pictogram
