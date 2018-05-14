import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL } from 'services/config'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import SoundPlayer from 'components/SoundPlayer'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import { keywordSelector } from 'utils'
import { TwitterPicker } from 'react-color'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'

import P from 'components/P'
import ToggleDropDown from './ToggleDropdown'
import ConditionalPaper from './ConditionalPaper'
import messages from './messages'

const styles = {

  wrapper: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'top'
  },
  picto: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white'
  },
  pictoWrapper: {
    width: '400px',
    maxWidth: '100%',
    height: 'auto',
    marginRight: '60px',
    flexGrow: 1
  },
  radioButton: {
    margin: 16
  },
  desc: {
    flexGrow: 3,
    width: '300px'
  },
  toggle: {
    margin: 16,
    width: 200
  },
  button: {
    margin: 16,
    width: 250
  }
}
class Pictogram extends Component {
  state = {
    language: this.props.locale,
    color: true,
    bgColor: false,
    plural: false,
    openMenu: false
  }

  onTogglePicker = () => this.setState({ pickerVisible: !this.state.pickerVisible })
  handleChange = (event, value) => { this.setState({ language: value }) }
  handleColor = (event, color) => { this.setState({ color }) }
  handlebgColor = (event, bgColor) => {
    this.setState({ bgColor, pickerVisible: bgColor })
  }
  handlePlural = (event, plural) => { this.setState({ plural }) }
  handleColorChange = ({ hex }) => {
    console.log(hex)
    this.setState({ pickerVisible: 0 })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    })
  }



  render() {
    const { pictogram, searchText, muiTheme, intl } = this.props
    const { formatMessage } = intl
    console.log('+++++++++++++++++++++++++++++++++++++++++++')
    console.log(intl)
    console.log(formatMessage)
    console.log('-------------------------')
    const { color, bgColor, plural } = this.state
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('idPictogram')
    const { keyword } = keywordSelector(searchText, keywords.toJS())
    const authors = pictogram.get('authors')
    // const keywords = pictogram.get('keywords')
    // audio source
    const streamUrl = 'http://www.arasaac.org/repositorio/locuciones/0/2139.mp3'

    return (
      <div>
        <div style={styles.wrapper}>
          <div style={styles.pictoWrapper}>
            <ConditionalPaper>
              <div style={{ backgroundColor: muiTheme.palette.accent2Color, display: 'flex', alignItems: 'center' }} >
                <SoundPlayer streamUrl={streamUrl} preloadType='metadata' showProgress={false} showTimer={false} />
                <H2 center={true} primary ucase noMargin>{keyword}</H2>
              </div>
              <img src={`${PICTOGRAMS_URL}/${idPictogram}_500.png`} alt={'alt'} style={styles.picto} />
              <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', flexWrap: 'wrap', backgroundColor: muiTheme.palette.accent2Color }}>
                <RaisedButton label={<FormattedMessage {...messages.addFavoriteLabel} />} secondary={true} style={styles.button} icon={<FavoriteIcon />} />
                <RaisedButton onClick={this.handleOpenMenu} label={<FormattedMessage {...messages.downloadLabel} />} primary={true} style={styles.button} icon={<DownloadIcon />} />
              </div>
            </ConditionalPaper>
          </div>
          <div style={styles.desc}>
            <H3 primary={true}>{<FormattedMessage {...messages.modifyPicto} />}</H3>
            <Divider />
            <P>Common options</P>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
              <Toggle
                label={<FormattedMessage {...messages.plural} />}
                labelPosition='right'
                onToggle={this.handlePlural}
                style={styles.toggle}
              />
              <Toggle
                label={<FormattedMessage {...messages.color} />}
                labelPosition='right'
                onToggle={this.handleColor}
                defaultToggled={true}
                style={styles.toggle}
              />

              <ToggleDropDown
                toggled={false}
                onToggle={this.handlebgColor}
                label={formatMessage(messages.backgroundColor)}
                style={styles.toggle}
                showExtra={true}
              />

              <div style={{ position: 'relative', width: '200px', display: 'flex', textAlign: 'center' }} >
                <Toggle
                  label={<FormattedMessage {...messages.backgroundColor} />}
                  labelPosition='right'
                  style={{ width: '200px', margin: '16' }}
                  onToggle={this.handlebgColor}
                />
                  {bgColor ?
                    this.state.pickerVisible ? this.showPicker : this.hidePicker
                    : ''
                  }
              </div>
                {bgColor ?
                  <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                    <TwitterPicker
                      triangle='hide'
                      color='#333'
                      onChangeComplete={this.handleColorChange}
                    />
                  </div>
                : ''
                }

              <Toggle
                label={<FormattedMessage {...messages.past} />}
                labelPosition='right'
                onToggle={this.handleColor}
                defaultToggled={true}
                style={styles.toggle}
              />
              <Toggle
                label={<FormattedMessage {...messages.future} />}
                labelPosition='right'
                style={styles.toggle}
                onToggle={this.handlebgColor}
              />
            </div>

            <P>Advanced options</P>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
              <Toggle
                label={<FormattedMessage {...messages.plural} />}
                labelPosition='right'
                onToggle={this.handlePlural}
                style={styles.toggle}
              />
              <Toggle
                label={<FormattedMessage {...messages.color} />}
                labelPosition='right'
                onToggle={this.handleColor}
                defaultToggled={true}
                style={styles.toggle}
              />
              <div style={{ position: 'relative', width: '200px', display: 'flex', textAlign: 'center' }} >
                <Toggle
                  label={<FormattedMessage {...messages.backgroundColor} />}
                  labelPosition='right'
                  style={{ width: '200px', margin: '16' }}
                  onToggle={this.handlebgColor}
                />
                  {bgColor ?
                    this.state.pickerVisible ? this.showPicker : this.hidePicker
                    : ''
                  }
              </div>
                {bgColor ?
                  <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                    <TwitterPicker
                      triangle='hide'
                      color='#333'
                      onChangeComplete={this.handleColorChange}
                    />
                  </div>
                : ''
                }

              <Toggle
                label={<FormattedMessage {...messages.past} />}
                labelPosition='right'
                onToggle={this.handleColor}
                defaultToggled={true}
                style={styles.toggle}
              />
              <Toggle
                label={<FormattedMessage {...messages.future} />}
                labelPosition='right'
                style={styles.toggle}
                onToggle={this.handlebgColor}
              />
            </div>
          </div>
        </div>
        <H3 primary>{<FormattedMessage {...messages.description} />}</H3>
        <Divider />
        {keywords.valueSeq().map((keyword) =>
          <div key={keyword}>
            <P important={true}>{keyword.get('keyword')}</P>
            <P>{<FormattedMessage {...messages.meaning} />}: {keyword.get('meaning')}</P>
          </div>
        )}
        
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <Divider />
        <P>{<FormattedMessage {...messages.changePictoLanguage} />}</P>
        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) =>
          <P key={author.get('id')}>
            <FlatButton
              key={author.get('id')}
              label={author.get('name')}
              labelPosition='after'
              icon={<Person />}
              href={`http://static.arasaac.org/${author}`}
            />
          </P>
        )}
        <H3 primary={true}>{<FormattedMessage {...messages.sharePictogram} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={'title'} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
      </div>
    )
  }
}


Pictogram.propTypes = {
  // onClick: PropTypes.func.isRequired,
  pictogram: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired,
  intl: intlShape.isRequired
}

export default muiThemeable()(Pictogram)
