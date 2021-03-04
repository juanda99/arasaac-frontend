/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
// import queryString from 'query-string'
import H2 from 'components/H2'
import H3 from 'components/H3'
import Helmet from 'react-helmet'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { PICTOGRAMS_URL, API_ROOT, IMAGES_URL } from 'services/config'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import ShowSoundPlayer from 'components/SoundPlayer/ShowSoundPlayer'
import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { keywordSelector, isEmptyObject } from 'utils'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import Konva from 'konva'
import { Stage } from 'react-konva'
import P from 'components/P'
import { colorSet, black } from 'utils/colors'
import Snackbar from 'material-ui/Snackbar'
import PluralLayer from './PluralLayer'
import StrikeThroughLayer from './StrikeThroughLayer'
import VerbalTenseLayer from './VerbalTenseLayer'
import BackgroundLayer from './BackgroundLayer'
import FrameLayer from './FrameLayer'
import IdentifierLayer from './IdentifierLayer'
import styles from './styles'
import TextLayer from './TextLayer'
import Img from './Img'
import ConditionalPaper from './ConditionalPaper'
import messages from './messages'
import {
  MEDIUM,
  MAX_CANVAS_SIZE,
  PRESENT,
  STANDARD_RESOLUTION,
  HIGH_RESOLUTION,
} from './constants'
import BackgroundColorOptions from './BackgroundColorOptions'
import FrameOptions from './FrameOptions'
import VerbalTenseOptions from './VerbalTenseOptions'
import PeopleAppearanceOptions from './PeopleAppearanceOptions'
import PluralOptions from './PluralOptions'
import IdentifierOptions from './IdentifierOptions'
import TextOptions from './TextOptions'
import ZoomOptions from './ZoomOptions'
import PictoWrapper from './PictoWrapper'
import Canvas from './Canvas'
import PictogramTitle from '../BoxTitle'
import RelatedWords from './RelatedWords'
import PictogramCategories from './PictogramCategories'
import { times } from 'lodash'

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const data = b64Data.replace('data:image/png;base64,', '')
  const byteCharacters = atob(data)
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

class Pictogram extends Component {
  constructor(props) {
    super(props)
    const { pictogram, searchText, locale, color } = this.props
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('_id')
    const aacColor = pictogram.get('aacColor')
    const { keyword, type } = keywordSelector(searchText, keywords.toJS())
    const keywordsArray = keywords
      .valueSeq()
      .map((keyword) => keyword.get('keyword'))
      .toArray()
    Konva.pixelRatio = Math.ceil(HIGH_RESOLUTION / STANDARD_RESOLUTION)
    const defaultColor = type >= 0 && type < 7 ? colorSet[type - 1] : ''
    // if user profile bw or pictogram  without color isColor  = false
    const isColor = !((this.props.type === 'aac' && aacColor) || !color)
    this.state = {
      language: locale,
      highResolution: false, // true for photoResolution
      plural: false,
      pluralActive: false,
      pluralOptionsShow: false,
      pluralColor: black,
      color: isColor,
      backgroundColor: defaultColor,
      bgColorActive: false,
      bgColorOptionsShow: false,
      strikeThrough: false,
      frameWidth: MEDIUM,
      frameColor: defaultColor,
      frameActive: false,
      frameOptionsShow: false,
      identifierActive: false,
      identifierOptionsShow: false,
      identifier: 'classroom',
      identifierPosition: 'right',
      identifierColor: '#000000',
      text: false,
      peopleAppearanceActive: false,
      peopleAppearanceOptionsShow: false,
      hair: '',
      skin: '',
      verbalTenseActive: false,
      verbalTense: PRESENT,
      verbalTenseOptionsShow: false,
      verbalTenseColor: 'black',
      showText: false,
      openMenu: false,
      url: !isColor
        ? `${PICTOGRAMS_URL}/${idPictogram}/${idPictogram}_nocolor_${STANDARD_RESOLUTION}.png`
        : `${PICTOGRAMS_URL}/${idPictogram}/${idPictogram}_${STANDARD_RESOLUTION}.png`,
      downloadUrl: '',
      activeFont: 'Open Sans',
      buttonCaption: false,
      topTextActive: false,
      topTextOptionsShow: false,
      topText: keyword,
      topTextKeywords: keywordsArray,
      topTextFont: 'Roboto',
      topTextFontSize: 46,
      topTextFontColor: 'black',
      topTextUpperCase: false,
      bottomTextActive: false,
      bottomTextOptionsShow: false,
      bottomText: keyword,
      bottomTextKeywords: keywordsArray,
      bottomTextFont: 'Roboto',
      bottomTextFontSize: 46,
      bottomTextFontColor: 'black',
      bottomTextUpperCase: false,
      zoomLevel: 0,
      zoomActive: false,
      zoomOptionsShow: false,
      windowWidth: 0,
      dragAndDrop: false,
      isFavorite: false,
      snackOpen: false,
      blurRadius: 0,
      open: false,
    }
  }

  componentDidMount() {
    const { pictogram, sex, violence } = this.props
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    document.body.addEventListener('click', this.needHideOptions)
    const hasSex = pictogram.get('sex')
    const hasViolence = pictogram.get('violence')
    if ((sex && hasSex) || (violence && hasViolence))
      this.setState({ blurRadius: 160, open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.activeFont !== this.state.activeFont) {
      // setInterval(() => this.textLayer.draw(), 1000)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
    document.body.removeEventListener('click', this.needHideOptions)
  }

  handleRequestClose = () => {
    this.setState({
      snackOpen: false,
    })
  }

  handleRegisterAction = () => {
    const { authenticated } = this.props
    const url = authenticated ? '/profile' : '/signin'
    this.props.router.push(url)
  }

  onTogglePicker = () =>
    this.setState({ pickerVisible: !this.state.pickerVisible })

  needHideOptions = (event) => {
    // add data-hide to elements where if click options should hide
    if (event.target.dataset.hide) this.hideOptions()
  }

  hideOptions = () =>
    this.setState({
      bgColorOptionsShow: false,
      frameOptionsShow: false,
      verbalTenseOptionsShow: false,
      peopleAppearanceOptionsShow: false,
      identifierOptionsShow: false,
      topTextOptionsShow: false,
      bottomTextOptionsShow: false,
      zoomOptionsShow: false,
      pluralOptionsShow: false,
    })

  buildOptionsRequest = () => {
    const { pictogram } = this.props
    const { color, hair, skin, highResolution } = this.state
    const idPictogram = pictogram.get('_id')
    const parameters = color ? {} : { color }

    // only if active hair, skin, backgroundColor we add it to the request. Otherwise we take default image values
    if (hair) parameters.hair = hair
    if (skin) parameters.skin = skin
    if (isEmptyObject(parameters)) {
      const url = highResolution
        ? `${PICTOGRAMS_URL}/${idPictogram}/${idPictogram}_${HIGH_RESOLUTION}.png`
        : `${PICTOGRAMS_URL}/${idPictogram}/${idPictogram}_${STANDARD_RESOLUTION}.png`
      this.setState({ url })
    } else {
      if (highResolution) parameters.resolution = HIGH_RESOLUTION
      const urlParameters = Object.entries(parameters)
        .map((param) => param.join('='))
        .join('&')
      const endPoint = `${API_ROOT}/pictograms/${idPictogram}?${urlParameters}&url=true`
      const downloadUrl = `${API_ROOT}/pictograms/${idPictogram}?${urlParameters}&url=false&download=true`
      fetch(endPoint)
        .then((data) => data.json())
        .then((data) => this.setState({ url: data.image, downloadUrl }))
    }
  }

  handleLanguageChange = (language) => {
    this.setState({ language })
  }

  handleColor = (event, color) => {
    this.setState({ color }, () => this.buildOptionsRequest())
    this.hideOptions()
  }

  handleHighResolution = (event, highResolution) => {
    this.setState({ highResolution }, () => this.buildOptionsRequest())
    this.hideOptions()
  }

  handleDragAndDrop = (event, dragAndDrop) => {
    this.setState({ dragAndDrop })
    this.hideOptions()
  }

  // handlePlural = (event, plural) => this.setState({ plural }, () => this.buildOptionsRequest())

  handlePluralChange = (plural) => {
    this.hideOptions()
    this.setState({ plural, pluralOptionsShow: plural })
  }

  handlePluralColorChange = (pluralColor) => this.setState({ pluralColor })

  handlePluralOptionsShow = (pluralOptionsShow) => {
    this.hideOptions()
    this.setState({ pluralOptionsShow })
  }

  handleStrikeThrough = (event, strikeThrough) => {
    this.setState({ strikeThrough })
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

  handleZoomChange = (zoomLevel) => this.setState({ zoomLevel })

  handleZoomOptionsShow = (zoomOptionsShow) => {
    this.hideOptions()
    this.setState({ zoomOptionsShow })
  }

  handleZoomActive = (zoomActive) => {
    this.hideOptions()
    this.setState({ zoomActive, zoomOptionsShow: zoomActive, zoomLevel: 0 })
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
        skin: '',
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
      verbalTenseOptionsShow: verbalTenseActive,
    })
  }

  handleVerbalTenseOptionsShow = (verbalTenseOptionsShow) => {
    this.hideOptions()
    this.setState({ verbalTenseOptionsShow })
  }

  handleVerbalTenseChange = (verbalTense) => this.setState({ verbalTense })

  handleVerbalTenseColorChange = (verbalTenseColor) =>
    this.setState({ verbalTenseColor })

  handleIdentifierActive = (identifierActive) => {
    this.hideOptions()
    this.setState({
      identifierActive,
      identifierOptionsShow: identifierActive,
    })
  }

  handleIdentifierOptionsShow = (identifierOptionsShow) => {
    this.hideOptions()
    this.setState({ identifierOptionsShow })
  }

  handleIdentifierChange = (identifier) => this.setState({ identifier })

  handleIdentifierPositionChange = (identifierPosition) =>
    this.setState({ identifierPosition })

  handleIdentifierColorChange = (identifierColor) =>
    this.setState({ identifierColor })

  handleTopTextActive = (topTextActive) => {
    this.hideOptions()
    this.setState({ topTextActive, topTextOptionsShow: topTextActive })
  }

  handleTopTextChange = (topText) => this.setState({ topText })

  handleTopTextFontChange = (topTextFont) => this.setState({ topTextFont })

  handleTopTextFontSizeChange = (topTextFontSize) =>
    this.setState({ topTextFontSize })

  handleTopTextFontColorChange = (topTextFontColor) =>
    this.setState({ topTextFontColor })

  handleTopTextOptionsShow = (topTextOptionsShow) => {
    this.hideOptions()
    this.setState({ topTextOptionsShow })
  }

  handleTopTextUpperCase = (uppercase) => {
    // if word is in our list, and uppercase is false, put it back
    const { topText } = this.state
    const { pictogram } = this.props
    const keywords = pictogram.get('keywords')
    if (uppercase) {
      this.setState({
        topTextUpperCase: uppercase,
        topText: topText.toUpperCase(),
      })
    } else {
      const { keyword } = keywordSelector(topText, keywords.toJS())
      // if not found we'll return first match
      if (topText.toLowerCase() === keyword.toLowerCase()) {
        this.setState({ topTextUpperCase: uppercase, topText: keyword })
      } else {
        this.setState({
          topTextUpperCase: uppercase,
          topText: topText.toLowerCase(),
        })
      }
    }
  }

  handleBottomTextActive = (bottomTextActive) => {
    this.hideOptions()
    this.setState({
      bottomTextActive,
      bottomTextOptionsShow: bottomTextActive,
    })
  }

  handleBottomTextChange = (bottomText) => this.setState({ bottomText })

  handleBottomTextFontChange = (bottomTextFont) =>
    this.setState({ bottomTextFont })

  handleBottomTextFontSizeChange = (bottomTextFontSize) =>
    this.setState({ bottomTextFontSize })

  handleBottomTextFontColorChange = (bottomTextFontColor) =>
    this.setState({ bottomTextFontColor })

  handleBottomTextOptionsShow = (bottomTextOptionsShow) => {
    this.hideOptions()
    this.setState({ bottomTextOptionsShow })
  }

  handleExport = () => {
    const base64Code = this.stageRef.getStage().toDataURL()
    // var data = new Blob([base64Code], { type: "image/png" });
    const item = new ClipboardItem({
      'image/png': b64toBlob(base64Code, 'image/png'),
    })
    navigator.clipboard.write([item])
    this.setState({ snackOpen: true })
  }

  handleBottomTextUpperCase = (uppercase) => {
    // if word is in our list, and uppercase is false, put it back
    const { bottomText } = this.state
    const { pictogram } = this.props
    const keywords = pictogram.get('keywords')
    if (uppercase) {
      this.setState({
        bottomTextUpperCase: uppercase,
        bottomText: bottomText.toUpperCase(),
      })
    } else {
      const { keyword } = keywordSelector(bottomText, keywords.toJS())
      // if not found we'll return first match
      if (bottomText.toLowerCase() === keyword.toLowerCase()) {
        this.setState({ bottomTextUpperCase: uppercase, bottomText: keyword })
      } else {
        this.setState({
          bottomTextUpperCase: uppercase,
          bottomText: bottomText.toLowerCase(),
        })
      }
    }
  }

  handleOpenMenu = () => {
    const { pictogram } = this.props
    const { color, plural } = this.state
    const idPictogram = pictogram.get('_id')
    const urlParameters = Object.entries({ color, plural })
      .map((param) => param.join('='))
      .join('&')
    const endPoint = `${API_ROOT}/pictograms/${idPictogram}?${urlParameters}&url=false&download=true`
    fetch(endPoint)
  }

  handleDownload = () => {
    const { searchText, pictogram, onDownload } = this.props
    const { highResolution } = this.state
    const pixelRatio = highResolution
      ? Math.ceil(HIGH_RESOLUTION / STANDARD_RESOLUTION)
      : 1
    const dataBase64 = this.stageRef.getStage().toDataURL({ pixelRatio })
    const keywords = pictogram.get('keywords')
    const { keyword } = keywordSelector(searchText, keywords.toJS())
    onDownload(keyword, dataBase64)
  }

  handleAddFavorite = (event) => {
    const { pictogram, onAddFavorite } = this.props
    const idPictogram = pictogram.get('_id')
    event.preventDefault()
    onAddFavorite(idPictogram)
    this.setState({ isFavorite: true })
  }

  updateWindowDimensions = () =>
    this.setState({ windowWidth: document.body.clientWidth })

  renderDownloadButton = (disabled) => (
    // const userAgent = window.navigator.userAgent.toLowerCase()
    // const isIOS = /iphone|ipod|ipad/.test(userAgent)
    // const isSAFARI = /^((?!chrome|android).)*safari/i.test(userAgent)
    <RaisedButton
      label={<FormattedMessage {...messages.downloadLabel} />}
      onClick={this.handleDownload}
      primary={true}
      style={styles.button}
      icon={<DownloadIcon />}
      disabled={disabled}
    />
  )

  render() {
    const {
      pictogram,
      searchText,
      locale,
      intl,
      authenticated,
      categories,
    } = this.props
    const {
      language,
      backgroundColor,
      bgColorActive,
      bgColorOptionsShow,
      strikeThrough,
      identifierActive,
      identifierOptionsShow,
      identifier,
      identifierPosition,
      identifierColor,
      verbalTense,
      verbalTenseOptionsShow,
      verbalTenseActive,
      verbalTenseColor,
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
      pluralOptionsShow,
      pluralColor,
      topTextActive,
      topTextKeywords,
      topTextOptionsShow,
      topText,
      topTextFont,
      topTextFontSize,
      topTextFontColor,
      topTextUpperCase,
      bottomTextActive,
      bottomTextKeywords,
      bottomTextOptionsShow,
      bottomText,
      bottomTextFont,
      bottomTextFontSize,
      bottomTextFontColor,
      bottomTextUpperCase,
      zoomLevel,
      zoomActive,
      zoomOptionsShow,
      windowWidth,
      dragAndDrop,
      isFavorite,
      snackOpen,
      blurRadius,
      open,
    } = this.state

    const canvasSize =
      windowWidth < MAX_CANVAS_SIZE ? windowWidth : MAX_CANVAS_SIZE

    // const backgroundColor = this.state.backgroundColor.replace('%23', '')
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('_id')
    const tags = pictogram.get('tags')
    const pictoCategories = pictogram.get('categories')
    // first time downloadUrl is default png
    const { keyword, hasLocution } = keywordSelector(
      searchText,
      keywords.toJS()
    )
    // remove # character in identifierColor for url
    const identifierFile = `${IMAGES_URL}/identifiers/${identifier}_${identifierColor.substr(
      1
    )}.png`
    const { formatMessage } = intl

    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.cancel} />}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage {...messages.accept} />}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleRegisterAction}
      />,
    ]
    return (
      <div>
        <Helmet>
          <title>
            {formatMessage(messages['pictoMetaTitle'], { keyword })}
          </title>
          <meta
            name="description"
            content={formatMessage(messages['pictoMetaDesc'], { keyword })}
          />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <Dialog
          title={formatMessage(messages.pictogramDisabled)}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
        >
          {authenticated ? (
            <FormattedMessage {...messages.disableFilter} />
          ) : (
            <FormattedMessage {...messages.authUser} />
          )}
        </Dialog>
        <div style={styles.wrapper}>
          <Snackbar
            open={snackOpen}
            message={<FormattedMessage {...messages.copyToClipboard} />}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <PictoWrapper>
            <ConditionalPaper>
              <PictogramTitle>
                <ShowSoundPlayer
                  hasLocution={hasLocution}
                  locale={locale}
                  keyword={keyword}
                  download={false}
                />
                <H2 style={{ textAlign: 'center' }} primary ucase noMargin>
                  {keyword}
                </H2>
              </PictogramTitle>
              <Canvas>
                <Stage
                  width={canvasSize}
                  height={canvasSize}
                  ref={(node) => {
                    this.stageRef = node
                  }}
                  // onContextMenu={(e) => e.evt.preventDefault()}
                >
                  {bgColorActive && (
                    <BackgroundLayer
                      color={backgroundColor}
                      size={canvasSize}
                    />
                  )}
                  <Img
                    src={url}
                    frameWidth={frameWidth}
                    enableFrame={
                      frameActive
                    } /* alt={'alt'} style={styles.picto} */
                    zoomLevel={zoomLevel}
                    canvasSize={canvasSize}
                    dragAndDrop={dragAndDrop}
                    topMargin={topTextActive ? 50 : 0}
                    bottomMargin={bottomTextActive ? 50 : 0}
                    blurRadius={blurRadius}
                  />
                  {topTextActive && (
                    <TextLayer
                      font={topTextFont}
                      text={topText}
                      fontSize={topTextFontSize}
                      fontColor={topTextFontColor}
                      dragAndDrop={dragAndDrop}
                      canvasSize={canvasSize}
                      y={frameActive ? frameWidth / 2 + 8 : 8}
                    />
                  )}
                  {bottomTextActive && (
                    <TextLayer
                      font={bottomTextFont}
                      text={bottomText}
                      fontSize={bottomTextFontSize}
                      fontColor={bottomTextFontColor}
                      dragAndDrop={dragAndDrop}
                      canvasSize={canvasSize}
                      y={
                        frameActive
                          ? canvasSize - bottomTextFontSize - frameWidth / 2 + 2
                          : canvasSize - bottomTextFontSize + 2
                      }
                    />
                  )}
                  {plural && (
                    <PluralLayer
                      frame={frameActive}
                      frameWidth={frameWidth}
                      canvasSize={canvasSize}
                      color={pluralColor}
                    />
                  )}
                  {verbalTenseActive && (
                    <VerbalTenseLayer
                      frame={frameActive}
                      frameWidth={frameWidth}
                      canvasSize={canvasSize}
                      verbalTense={verbalTense}
                      color={verbalTenseColor}
                    />
                  )}
                  {strikeThrough && (
                    <StrikeThroughLayer
                      frame={frameActive}
                      frameWidth={frameWidth}
                      canvasSize={canvasSize}
                    />
                  )}
                  {identifierActive && (
                    <IdentifierLayer
                      enableFrame={frameActive}
                      frameWidth={frameWidth}
                      canvasSize={canvasSize}
                      position={identifierPosition}
                      src={identifierFile}
                      dragAndDrop={dragAndDrop}
                    />
                  )}
                  {frameActive && (
                    <FrameLayer
                      color={frameColor}
                      frameWidth={frameWidth}
                      size={canvasSize}
                    />
                  )}
                </Stage>
              </Canvas>
              <PictogramTitle>
                <RaisedButton
                  label={<FormattedMessage {...messages.addFavoriteLabel} />}
                  secondary={true}
                  style={styles.button}
                  icon={<FavoriteIcon />}
                  disabled={!authenticated || isFavorite ? true : false}
                  onClick={this.handleAddFavorite}
                />
                {this.renderDownloadButton(!!blurRadius)}
                <RaisedButton
                  label={<FormattedMessage {...messages.copy} />}
                  primary={true}
                  style={styles.button}
                  icon={<CopyIcon />}
                  onClick={this.handleExport}
                  disabled={blurRadius}
                />
              </PictogramTitle>
            </ConditionalPaper>
          </PictoWrapper>

          <div style={styles.options} data-hide={true}>
            <H3 primary={true}>
              {<FormattedMessage {...messages.modifyPicto} />}
            </H3>
            <Divider />
            <P data-hide={true}>
              {<FormattedMessage {...messages.pictogramOptions} />}
            </P>
            <div style={styles.optionsWrapper} data-hide={true}>
              <Toggle
                label={<FormattedMessage {...messages.color} />}
                labelPosition="right"
                toggled={this.state.color}
                onToggle={this.handleColor}
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
              <PluralOptions
                active={plural}
                onActive={this.handlePluralChange}
                onOptionsShow={this.handlePluralOptionsShow}
                showOptions={pluralOptionsShow}
                color={pluralColor}
                onColorChange={this.handlePluralColorChange}
              />
              <Toggle
                label={<FormattedMessage {...messages.strikeThrough} />}
                labelPosition="right"
                onToggle={this.handleStrikeThrough}
                style={styles.toggle}
              />
              <VerbalTenseOptions
                onActive={this.handleVerbalTenseActive}
                active={verbalTenseActive}
                verbalTense={verbalTense}
                onVerbalTenseChange={this.handleVerbalTenseChange}
                onOptionsShow={this.handleVerbalTenseOptionsShow}
                showOptions={verbalTenseOptionsShow}
                color={verbalTenseColor}
                onColorChange={this.handleVerbalTenseColorChange}
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
                color={identifierColor}
                onColorChange={this.handleIdentifierColorChange}
              />
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
            </div>
            <P data-hide={true}>
              {<FormattedMessage {...messages.textOptions} />}
            </P>
            <div style={styles.optionsWrapper} data-hide={true}>
              <TextOptions
                textLabel={formatMessage(messages.topText)}
                keywords={topTextKeywords}
                defaultLanguage={locale}
                onActive={this.handleTopTextActive}
                active={topTextActive}
                text={topText}
                font={topTextFont}
                fontSize={topTextFontSize}
                fontColor={topTextFontColor}
                onTextChange={this.handleTopTextChange}
                onFontChange={this.handleTopTextFontChange}
                onFontSizeChange={this.handleTopTextFontSizeChange}
                onFontColorChange={this.handleTopTextFontColorChange}
                onOptionsShow={this.handleTopTextOptionsShow}
                showOptions={topTextOptionsShow}
                idPictogram={idPictogram}
                locale={locale}
                upperCase={topTextUpperCase}
                onUpperCase={this.handleTopTextUpperCase}
              />
              <TextOptions
                textLabel={formatMessage(messages.bottomText)}
                keywords={bottomTextKeywords}
                onActive={this.handleBottomTextActive}
                active={bottomTextActive}
                text={bottomText}
                font={bottomTextFont}
                fontSize={bottomTextFontSize}
                fontColor={bottomTextFontColor}
                onTextChange={this.handleBottomTextChange}
                onFontChange={this.handleBottomTextFontChange}
                onFontSizeChange={this.handleBottomTextFontSizeChange}
                onFontColorChange={this.handleBottomTextFontColorChange}
                onOptionsShow={this.handleBottomTextOptionsShow}
                showOptions={bottomTextOptionsShow}
                idPictogram={idPictogram}
                locale={locale}
                upperCase={bottomTextUpperCase}
                onUpperCase={this.handleBottomTextUpperCase}
              />
            </div>
            <P data-hide={true}>
              {<FormattedMessage {...messages.advancedOptions} />}
            </P>
            <div style={styles.optionsWrapper} data-hide={true}>
              <ZoomOptions
                zoomLevel={zoomLevel}
                onZoomChange={this.handleZoomChange}
                onActive={this.handleZoomActive}
                active={zoomActive}
                onOptionsShow={this.handleZoomOptionsShow}
                showOptions={zoomOptionsShow}
              />
              <Toggle
                label={<FormattedMessage {...messages.dragAndDrop} />}
                labelPosition="right"
                onToggle={this.handleDragAndDrop}
                style={styles.toggle}
              />
              <Toggle
                label={<FormattedMessage {...messages.highResolution} />}
                labelPosition="right"
                onToggle={this.handleHighResolution}
                defaultToggled={false}
                style={styles.toggle}
              />
            </div>
          </div>
        </div>
        {!!categories.size && (
          <PictogramCategories
            categories={categories}
            pictoCategories={pictoCategories}
            tags={tags}
          />
        )}

        <RelatedWords
          style={{ padding: '5px' }}
          locale={locale}
          language={language}
          idPictogram={idPictogram}
          onLanguageChange={this.handleLanguageChange}
        />

        <H3 primary={true} style={{ padding: '5px' }}>
          {<FormattedMessage {...messages.sharePictogram} />}
        </H3>
        <Divider />
        <p style={{ padding: '5px' }}>
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
  onDownload: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  sex: PropTypes.bool.isRequired,
  violence: PropTypes.bool.isRequired,
  color: PropTypes.bool.isRequired,
  router: PropTypes.any.isRequired,
  type: PropTypes.string,
}

export default injectIntl(withRouter(Pictogram))
