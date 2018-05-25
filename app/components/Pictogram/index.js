import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL, LOCUTIONS_URL, API_ROOT } from 'services/config'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import SoundPlayer from 'components/SoundPlayer'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
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
    plural: false,
    color: true,
    bgColor: false,
    identifier: false,
    text: false,
    frame: false,
    peopleAppearance: false,
    showBgColor: false,
    verbalTense: false,
    showVerbalTense: false,
    showIdentifier: false,
    showText: false,
    showFrame: false,
    showPeopleAppearance: false,
    openMenu: false,
    url: ''
  }

  onTogglePicker = () => this.setState({ pickerVisible: !this.state.pickerVisible })

  apiState = { url: true }

  buildOptionsRequest = () => {
    const { pictogram } = this.props
    const idPictogram = pictogram.get('idPictogram')
    const getString = queryString.stringify(this.apiState)
    const endPoint = `${API_ROOT}/pictograms/${idPictogram}?${getString}`
    fetch(endPoint).then((data) => data.json()).then((data) => this.setState({ url: data.image }))
  }

  handleColor = (event, color) => { 
    this.setState({ color })
    if (color) delete this.apiState.color
    else this.apiState.color = false
    this.buildOptionsRequest()
  }

  handlePlural = (event, plural) => {
    this.setState({ plural })
    if (!plural) delete this.apiState.plural
    else this.apiState.plural = true
    this.buildOptionsRequest()
  }

  handleColorChange = ({ hex }) => {
    console.log(hex)
    this.setState({ pickerVisible: 0 })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    })
  }

  handlebgColor = (bgColor) => {
    this.setState({ bgColor, showBgColor: bgColor })
  }

  handlebgColorClick = () => {
    this.setState({
      showBgColor: !this.state.showBgColor
    })
  }

  handleVerbalTense = (verbalTense) => {
    this.setState({ verbalTense, showVerbalTense: verbalTense })
  }

  handleVerbalTenseClick = () => {
    this.setState({
      showVerbalTense: !this.state.showVerbalTense
    })
  }

  handleIdentifier = (identifier) => {
    this.setState({ identifier, showIdentifier: identifier })
  }

  handleIdentifierClick = () => {
    this.setState({
      showIdentifier: !this.state.showIdentifier
    })
  }

  handleText = (text) => {
    this.setState({ text, showText: text })
  }

  handleTextClick = () => {
    this.setState({
      showText: !this.state.showText
    })
  }

  handlePeopleAppearance = (peopleAppearance) => {
    this.setState({ peopleAppearance, showPeopleAppearance: peopleAppearance })
  }

  handlePeopleAppearanceClick = () => {
    this.setState({
      showPeopleAppearance: !this.state.showPeopleAppearance
    })
  }

  handleFrame = (frame) => {
    this.setState({ frame, showFrame: frame })
  }

  handleFrameClick = () => {
    this.setState({
      showFrame: !this.state.showFrame
    })
  }

  render() {
    const { pictogram, searchText, muiTheme, intl, locale } = this.props
    const { formatMessage } = intl
    const {
      color,
      bgColor,
      showBgColor,
      plural,
      identifier,
      showIdentifier,
      text,
      showText,
      verbalTense,
      showVerbalTense,
      frame,
      showFrame,
      peopleAppearance,
      showPeopleAppearance,
      url
    } = this.state
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('idPictogram')
    const { keyword, idLocution } = keywordSelector(searchText, keywords.toJS())
    const authors = pictogram.get('authors')
    let soundPlayer = ''
    if (idLocution) {
      const streamUrl = `${LOCUTIONS_URL}/${locale}/${idLocution}`
      soundPlayer = <SoundPlayer crossOrigin='anonymous' streamUrl={streamUrl} preloadType='metadata' showProgress={false} showTimer={false} />
    }
    console.log('render again!')
    console.log(this.state.url)
    console.log('----------------')
    return (
      <div>
        <div style={styles.wrapper}>
          <div style={styles.pictoWrapper}>
            <ConditionalPaper>
              <div style={{ backgroundColor: muiTheme.palette.accent2Color, display: 'flex', alignItems: 'center' }} >
                {soundPlayer}
                <H2 center={true} primary ucase noMargin>{keyword}</H2>
              </div>
              <img src={url || `${PICTOGRAMS_URL}/${idPictogram}_500.png`} alt={'alt'} style={styles.picto} />
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
                toggled={bgColor}
                onToggle={this.handlebgColor}
                label={formatMessage(messages.backgroundColor)}
                style={styles.toggle}
                showOptions={showBgColor}
                onClick={this.handlebgColorClick}
              />
              { showBgColor ?
                <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                  <TwitterPicker
                    triangle='hide'
                    color='#333'
                    onChangeComplete={this.handleColorChange}
                  />
                </div>
              : ''
              }
              <ToggleDropDown
                toggled={verbalTense}
                onToggle={this.handleVerbalTense}
                label={formatMessage(messages.verbalTense)}
                style={styles.toggle}
                showOptions={showVerbalTense}
                onClick={this.handleVerbalTenseClick}
              />
              { showVerbalTense ?
                <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%' }}>
                  <RadioButtonGroup name='verbalTense' defaultSelected='present'>
                    <RadioButton
                      value='past'
                      label={<FormattedMessage {...messages.past} />}
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value='present'
                      label={<FormattedMessage {...messages.present} />}
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value='future'
                      label={<FormattedMessage {...messages.future} />}
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                </div>
              : ''
              }

            </div>

            <P>Advanced options</P>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
              <ToggleDropDown
                toggled={identifier}
                onToggle={this.handleIdentifier}
                label={formatMessage(messages.identifier)}
                style={styles.toggle}
                showOptions={showIdentifier}
                onClick={this.handleIdentifierClick}
              />
              { showIdentifier ?
                <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                  <p>WIP!!!! Here we'll choose our identifier</p>
                </div>
              : ''
              }
              <ToggleDropDown
                toggled={text}
                onToggle={this.handleText}
                label={formatMessage(messages.text)}
                style={styles.toggle}
                showOptions={showText}
                onClick={this.handleTextClick}
              />
              { showText ?
                <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                    <p>WIP!!!! Here we'll write our text for the pictogram</p>
                </div>
              : ''
              }

              <ToggleDropDown
                toggled={peopleAppearance}
                onToggle={this.handlePeopleAppearance}
                label={formatMessage(messages.peopleAppearance)}
                style={styles.toggle}
                showOptions={showPeopleAppearance}
                onClick={this.handlePeopleAppearanceClick}
              />
              { showPeopleAppearance ?
                <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                    <p>WIP!!!! Here we'll change skin and hair</p>
                </div>
              : ''
              }


              <ToggleDropDown
                toggled={frame}
                onToggle={this.handleFrame}
                label={formatMessage(messages.frame)}
                style={styles.toggle}
                showOptions={showFrame}
                onClick={this.handleFrameClick}
              />
              { showFrame ?
                <div style={{ padding: '10px', border: '1px dashed lightgrey', width: '100%', height: '120px' }}>
                  <p>WIP!!!! Here we'll choose color and width for a picto frame</p>
                </div>
              : ''
              }

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

export default injectIntl(muiThemeable()(Pictogram))
