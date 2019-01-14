/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import queryString from 'query-string'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL, LOCUTIONS_URL, API_ROOT } from 'services/config'
import { FormattedMessage } from 'react-intl'
import SoundPlayer from 'components/SoundPlayer'
import Toggle from 'material-ui/Toggle'
import { keywordSelector } from 'utils'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import { Stage, Layer, Text } from 'react-konva'
import P from 'components/P'
import PluralLayer from './PluralLayer'
import BackgroundLayer from './BackgroundLayer'
import FrameLayer from './FrameLayer'
import styles from './styles'
import Caption from './Caption'
import Img from './Img'
import ConditionalPaper from './ConditionalPaper'
import messages from './messages'
import { MEDIUM, CAPTION_SIZE, CANVAS_SIZE } from './constants'
import BackgroundColorOptions from './BackgroundColorOptions'
import FrameOptions from './FrameOptions'
import VerbalTenseOptions from './VerbalTenseOptions'
import PeopleAppearanceOptions from './PeopleAppearanceOptions'
import IdentifierOptions from './IdentifierOptions'
import TextOptions from './TextOptions'

class Pictogram extends Component {
  state = {
    language: this.props.locale,
    plural: false,
    color: true,
    backgroundColor: '',
    bgColorActive: false,
    bgColorOptionsShow: false,
    frameWidth: MEDIUM,
    frameColor: '',
    frameActive: false,
    frameOptionsShow: false,
    identifierActive: false,
    identifierShow: false,
    identifier: '',
    identifierPosition: '',
    text: false,
    peopleAppearanceActive: false,
    peopleAppearanceOptionsShow: false,
    hair: '',
    skin: '',
    verbalTenseActive: false,
    verbalTense: '',
    verbalTenseOptionsShow: false,
    showText: false,
    openMenu: false,
    url: '',
    downloadUrl: '',
    activeFont: 'Open Sans',
    buttonCaption: false,
    mainTextActive,
    mainText,
    mainTextFont,
    mainTextFontSize,
    mainTextColor
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.activeFont !== this.state.activeFont) {
      // setInterval(() => this.textLayer.draw(), 1000)
    }
  }

  onTogglePicker = () =>
    this.setState({ pickerVisible: !this.state.pickerVisible })

  hideOptions = () =>
    this.setState({
      bgColorOptionsShow: false,
      frameOptionsShow: false,
      verbalTenseOptionsShow: false,
      peopleAppearanceOptionsShow: false,
      identifierOptionsShow: false
    })

  buildOptionsRequest = () => {
    const { pictogram } = this.props
    const {
      color,
      hair,
      skin,
      identifier,
      identifierActive,
      identifierPosition
    } = this.state
    const idPictogram = pictogram.get('idPictogram')
    const parameters = { color }
    // only if active hair, skin, backgroundColor we add it to the request. Otherwise we take default image values
    if (hair) parameters.hair = hair
    if (skin) parameters.skin = skin
    if (identifierActive) parameters.identifier = identifier
    if (identifierPosition) parameters.identifierPosition = identifierPosition

    const urlParameters = Object.entries(parameters)
      .map((param) => param.join('='))
      .join('&')
    const endPoint = `${API_ROOT}/pictograms/${idPictogram}?${urlParameters}&url=true`
    const downloadUrl = `${API_ROOT}/pictograms/${idPictogram}?${urlParameters}&url=false&download=true`
    fetch(endPoint)
      .then((data) => data.json())
      .then((data) => this.setState({ url: data.image, downloadUrl }))
  }

  handleColor = (event, color) => {
    this.setState({ color }, () => this.buildOptionsRequest())
    this.hideOptions()
  }

  // handlePlural = (event, plural) => this.setState({ plural }, () => this.buildOptionsRequest())

  handlePlural = (event, plural) => {
    this.setState({ plural })
    this.hideOptions()
  }

  handleBgColorChange = (backgroundColor) => this.setState({ backgroundColor })
  /* this.setState({ backgroundColor: backgroundColor.replace('#', '%23') }, () =>
      this.buildOptionsRequest()
    )
} */

  handleBgColorOptionsShow = (bgColorOptionsShow) => {
    this.hideOptions()
    this.setState({ bgColorOptionsShow })
  }

  handleBgColorActive = (bgColorActive) => {
    this.hideOptions()
    this.setState({ bgColorActive, bgColorOptionsShow: bgColorActive })
  }
  handleFrameActive = (frameActive) => {
    this.hideOptions()
    this.setState({ frameActive, frameOptionsShow: frameActive })
  }
  handleFrameWidthChange = (frameWidth) => this.setState({ frameWidth })

  handleFrameColorChange = (frameColor) => this.setState({ frameColor })

  handleFrameOptionsShow = (frameOptionsShow) => {
    this.hideOptions()
    this.setState({ frameOptionsShow })
  }

  handleHairChange = (hair) => {
    this.setState({ hair }, () => this.buildOptionsRequest())
  }
  handleSkinChange = (skin) => {
    this.setState({ skin }, () => this.buildOptionsRequest())
  }

  handlePeopleAppearanceActive = (peopleAppearanceActive) => {
    this.hideOptions()
    this.setState(
      {
        peopleAppearanceActive,
        peopleAppearanceOptionsShow: peopleAppearanceActive,
        hair: '',
        skin: ''
      },
      () => this.buildOptionsRequest()
    )
  }

  handlePeopleAppearanceOptionsShow = (peopleAppearanceOptionsShow) => {
    this.hideOptions()
    this.setState({ peopleAppearanceOptionsShow })
  }

  handleVerbalTenseActive = (verbalTenseActive) => {
    this.hideOptions()
    this.setState({
      verbalTenseActive,
      verbalTenseOptionsShow: verbalTenseActive
    })
  }

  handleVerbalTenseOptionsShow = (verbalTenseOptionsShow) => {
    this.hideOptions()
    this.setState({ verbalTenseOptionsShow })
  }

  handleVerbalTenseChange = (verbalTense) => {
    this.hideOptions()
    this.setState({ verbalTense })
  }

  handleIdentifierActive = (identifierActive) => {
    this.hideOptions()
    this.setState(
      { identifierActive, identifierOptionsShow: identifierActive },
      () => this.buildOptionsRequest()
    )
  }

  handleIdentifierOptionsShow = (identifierOptionsShow) => {
    this.hideOptions()
    this.setState({ identifierOptionsShow })
  }

  handleIdentifierChange = (identifier) => {
    this.setState({ identifier }, () => this.buildOptionsRequest())
  }

  handleIdentifierPositionChange = (identifierPosition) =>
    this.setState({ identifierPosition }, () => this.buildOptionsRequest())

  handleOpenMenu = () => {
    const { pictogram } = this.props
    const { color, plural } = this.state
    const idPictogram = pictogram.get('idPictogram')
    const urlParameters = Object.entries({ color, plural })
      .map((param) => param.join('='))
      .join('&')
    const endPoint = `${API_ROOT}/pictograms/${idPictogram}?${urlParameters}&url=false&download=true`
    fetch(endPoint)
  }

  handleExportClick = () => {
    const imageBase64 = this.stageRef.getStage().toDataURL()
    console.log(imageBase64)

    const url = imageBase64.replace(
      /^data:image\/[^;]+/,
      'data:application/octet-stream'
    )
    window.open(url)

    // to convert into image file and send it to the server, but better in the server side:
    // https://gist.github.com/madhums/e749dca107e26d72b64d

    /*
    const block = imageBase64.split(';')
    // Get the content type of the image
    const contentType = block[0].split(':')[1] // In this case "image/gif"
    // get the real base64 content of the file
    const realData = block[1].split(',')[1] // In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    return b64toBlob(realData, contentType)
    */
  }

  render() {
    const { pictogram, searchText, muiTheme, locale } = this.props
    const {
      backgroundColor,
      bgColorActive,
      bgColorOptionsShow,
      identifierActive,
      identifierOptionsShow,
      identifier,
      identifierPosition,
      verbalTense,
      verbalTenseOptionsShow,
      verbalTenseActive,
      peopleAppearanceActive,
      peopleAppearanceOptionsShow,
      hair,
      skin,
      url,
      frameWidth,
      frameColor,
      frameActive,
      frameOptionsShow,
      plural,
      mainTextActive,
      mainText,
      mainTextFont,
      mainTextFontSize,
      mainTextColor
    } = this.state
    let pictoOrigin = mainText ? CAPTION_SIZE : 0
    pictoOrigin = frameActive ? pictoOrigin + frameWidth / 2 : pictoOrigin
    // const backgroundColor = this.state.backgroundColor.replace('%23', '')
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('idPictogram')
    // first time downloadUrl is default png
    const downloadUrl =
      this.state.downloadUrl ||
      `${API_ROOT}/pictograms/${idPictogram}?&url=false&download=true`
    const { keyword, idLocution } = keywordSelector(searchText, keywords.toJS())
    const authors = pictogram.get('authors')
    let soundPlayer = ''
    if (idLocution) {
      const streamUrl = `${LOCUTIONS_URL}/${locale}/${idLocution}`
      soundPlayer = (
        <SoundPlayer
          crossOrigin='anonymous'
          streamUrl={streamUrl}
          preloadType='metadata'
          showProgress={false}
          showTimer={false}
        />
      )
    }
    // const pictoFile = `/${idPictogram}_500.png`
    const pictoFile = url || `${PICTOGRAMS_URL}/${idPictogram}_500.png`
    return (
      <div>
        <div style={styles.wrapper}>
          <div style={styles.pictoWrapper}>
            <ConditionalPaper>
              <div
                style={{
                  backgroundColor: muiTheme.palette.accent2Color,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {soundPlayer}
                <H2 center={true} primary ucase noMargin>
                  {keyword}
                </H2>
              </div>
              <Stage
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                ref={(node) => {
                  this.stageRef = node
                }}
              >
                {bgColorActive && <BackgroundLayer color={backgroundColor} />}
                {frameActive && (
                  <FrameLayer color={frameColor} width={frameWidth} />
                )}
                <Img
                  src={pictoFile}
                  frameWidth={frameWidth}
                  enableFrame={
                    frameActive
                  } /* alt={'alt'} style={styles.picto} */
                  origin={pictoOrigin}
                />
                <Layer
                  ref={(node) => {
                    this.textLayer = node
                  }}
                >
                  <Text
                    fontFamily={this.state.activeFont}
                    text='Try to drag a star'
                    fontSize={20}
                  />
                  <Caption text='prueba' />
                </Layer>
                {plural && <PluralLayer />}
              </Stage>

              <div
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  backgroundColor: muiTheme.palette.accent2Color
                }}
              >
                <RaisedButton
                  label={<FormattedMessage {...messages.addFavoriteLabel} />}
                  secondary={true}
                  style={styles.button}
                  icon={<FavoriteIcon />}
                />
                {/* <a href={downloadUrl}> */}
                <RaisedButton
                  onClick={this.handleExportClick}
                  label={<FormattedMessage {...messages.downloadLabel} />}
                  primary={true}
                  style={styles.button}
                  icon={<DownloadIcon />}
                />
                {/* </a>*/}
              </div>
            </ConditionalPaper>
          </div>
          <div style={styles.desc}>
            <H3 primary={true}>
              {<FormattedMessage {...messages.modifyPicto} />}
            </H3>
            <Divider />
            <P>Common options</P>
            <div style={styles.optionsWrapper}>
              <Toggle
                label={<FormattedMessage {...messages.color} />}
                labelPosition='right'
                onToggle={this.handleColor}
                defaultToggled={true}
                style={styles.toggle}
              />

              <BackgroundColorOptions
                onChoose={this.handleBgColorChange}
                color={backgroundColor}
                onActive={this.handleBgColorActive}
                active={bgColorActive}
                onOptionsShow={this.handleBgColorOptionsShow}
                showOptions={bgColorOptionsShow}
              />

              <FrameOptions
                onChooseColor={this.handleFrameColorChange}
                color={frameColor}
                onActive={this.handleFrameActive}
                active={frameActive}
                width={frameWidth}
                onChooseWidth={this.handleFrameWidthChange}
                onOptionsShow={this.handleFrameOptionsShow}
                showOptions={frameOptionsShow}
              />

              <Toggle
                label={<FormattedMessage {...messages.plural} />}
                labelPosition='right'
                onToggle={this.handlePlural}
                style={styles.toggle}
              />
              <VerbalTenseOptions
                onActive={this.handleVerbalTenseActive}
                active={verbalTenseActive}
                verbalTense={verbalTense}
                onVerbalTenseChange={this.handleVerbalTenseChange}
                onOptionsShow={this.handleVerbalTenseOptionsShow}
                showOptions={verbalTenseOptionsShow}
              />
              <TextOptions
                onActive={this.handleMainTextActive}
                active={mainTextActive}
                text={mainText}
                font={mainTextFont}
                size={mainTextFontSize}
                color={mainTextColor}
                onFontChange={this.handleMainTextFontChange}
                onSizeChange={this.handleMainTextFontSizeChange}
                onColorChange={this.handleMainTextColorChange}
                onOptionsShow={this.handleMainTextOptionsShow}
                showOptions={mainTextOptionsShow}
              />
            </div>

            <P>Advanced options</P>
            <div style={styles.optionsWrapper}>
              <PeopleAppearanceOptions
                skin={skin}
                onSkinChange={this.handleSkinChange}
                onActive={this.handlePeopleAppearanceActive}
                active={peopleAppearanceActive}
                hair={hair}
                onHairChange={this.handleHairChange}
                onOptionsShow={this.handlePeopleAppearanceOptionsShow}
                showOptions={peopleAppearanceOptionsShow}
              />
              <IdentifierOptions
                identifier={identifier}
                identifierPosition={identifierPosition}
                onIdentifierChange={this.handleIdentifierChange}
                onIdentifierPositionChange={this.handleIdentifierPositionChange}
                onActive={this.handleIdentifierActive}
                active={identifierActive}
                onOptionsShow={this.handleIdentifierOptionsShow}
                showOptions={identifierOptionsShow}
              />
            </div>
          </div>
        </div>
        <H3 primary>{<FormattedMessage {...messages.description} />}</H3>
        <Divider />
        {/* index for keyword will not be necessary if load data is ok */}
        {keywords.valueSeq().map((keyword, index) => (
          <div key={`${keyword.get('keyword')}-${index}`}>
            <P important={true}>{keyword.get('keyword')}</P>
            <P>
              {<FormattedMessage {...messages.meaning} />}:{' '}
              {keyword.get('meaning')}
            </P>
          </div>
        ))}
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <Divider />
        <P>{<FormattedMessage {...messages.changePictoLanguage} />}</P>
        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) => (
          <P key={`${author.get('id')}`}>
            <FlatButton
              label={author.get('name')}
              labelPosition='after'
              icon={<Person />}
              href={`http://static.arasaac.org/${author}`}
            />
          </P>
        ))}
        <H3 primary={true}>
          {<FormattedMessage {...messages.sharePictogram} />}
        </H3>
        <Divider />
        <p>
          <ShareBar
            shareUrl={window.location.href}
            title={'title'}
            image={'http://www.arasaac.org/images/arasaac_titulo.png'}
          />
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
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Pictogram)

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}
