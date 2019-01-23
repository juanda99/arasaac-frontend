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
import { Stage } from 'react-konva'
import P from 'components/P'
import PluralLayer from './PluralLayer'
import VerbalTenseLayer from './VerbalTenseLayer'
import BackgroundLayer from './BackgroundLayer'
import FrameLayer from './FrameLayer'
import styles from './styles'
import TextLayer from './TextLayer'
import Img from './Img'
import ConditionalPaper from './ConditionalPaper'
import messages from './messages'
import { MEDIUM, MAX_CANVAS_SIZE, PRESENT } from './constants'
import BackgroundColorOptions from './BackgroundColorOptions'
import FrameOptions from './FrameOptions'
import VerbalTenseOptions from './VerbalTenseOptions'
import PeopleAppearanceOptions from './PeopleAppearanceOptions'
import IdentifierOptions from './IdentifierOptions'
import TextOptions from './TextOptions'
import ZoomOptions from './ZoomOptions'
import PictoWrapper from './PictoWrapper'

class Pictogram extends Component {
  constructor(props) {
    super(props)
    const { pictogram, searchText } = this.props
    const keywords = pictogram.get('keywords')
    const { keyword } = keywordSelector(searchText, keywords.toJS())
    const keywordsArray = keywords
      .valueSeq()
      .map((keyword) => keyword.get('keyword'))
      .toArray()

    console.log(keywordsArray)

    this.state = {
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
      identifierOptionsShow: false,
      identifier: '',
      identifierPosition: '',
      text: false,
      peopleAppearanceActive: false,
      peopleAppearanceOptionsShow: false,
      hair: '',
      skin: '',
      verbalTenseActive: false,
      verbalTense: PRESENT,
      verbalTenseOptionsShow: false,
      showText: false,
      openMenu: false,
      url: '',
      downloadUrl: '',
      activeFont: 'Open Sans',
      buttonCaption: false,
      topTextActive: false,
      topTextOptionsShow: false,
      topText: keyword,
      topTextKeywords: keywordsArray,
      topTextFont: 'Roboto',
      topTextFontSize: 50,
      topTextFontColor: 'black',
      bottomTextActive: false,
      bottomTextOptionsShow: false,
      bottomText: keyword,
      bottomTextKeywords: keywordsArray,
      bottomTextFont: 'Roboto',
      bottomTextFontSize: 50,
      bottomTextFontColor: 'black',
      zoomLevel: 0,
      zoomActive: false,
      zoomOptionsShow: false,
      windowWidth: 0,
      dragAndDrop: false
    }
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    document.body.addEventListener('click', this.needHideOptions)
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

  onTogglePicker = () =>
    this.setState({ pickerVisible: !this.state.pickerVisible })

  updateWindowDimensions = () => {
    this.setState({ windowWidth: document.body.clientWidth })
  }

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
      zoomOptionsShow: false
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

  handleDragAndDrop = (event, dragAndDrop) => {
    this.setState({ dragAndDrop })
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

  handleVerbalTenseChange = (verbalTense) => this.setState({ verbalTense })

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

  handleBottomTextActive = (bottomTextActive) => {
    this.hideOptions()
    this.setState({ bottomTextActive, bottomTextOptionsShow: bottomTextActive })
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

  handleDownload = () => {
    const { searchText, pictogram, onDownload } = this.props
    const dataBase64 = this.stageRef.getStage().toDataURL()
    const keywords = pictogram.get('keywords')
    const { keyword } = keywordSelector(searchText, keywords.toJS())
    onDownload(keyword, dataBase64)
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
      topTextActive,
      topTextKeywords,
      topTextOptionsShow,
      topText,
      topTextFont,
      topTextFontSize,
      topTextFontColor,
      bottomTextActive,
      bottomTextKeywords,
      bottomTextOptionsShow,
      bottomText,
      bottomTextFont,
      bottomTextFontSize,
      bottomTextFontColor,
      zoomLevel,
      zoomActive,
      zoomOptionsShow,
      windowWidth,
      dragAndDrop
    } = this.state
    const canvasSize =
      windowWidth < MAX_CANVAS_SIZE ? windowWidth : MAX_CANVAS_SIZE

    const imgOffsetY = topText ? topTextFontSize : 0
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
          <PictoWrapper>
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
                width={canvasSize}
                height={canvasSize}
                ref={(node) => {
                  this.stageRef = node
                }}
              >
                {bgColorActive && (
                  <BackgroundLayer color={backgroundColor} size={canvasSize} />
                )}
                {frameActive && (
                  <FrameLayer
                    color={frameColor}
                    frameWidth={frameWidth}
                    size={canvasSize}
                  />
                )}
                <Img
                  src={pictoFile}
                  frameWidth={frameWidth}
                  enableFrame={
                    frameActive
                  } /* alt={'alt'} style={styles.picto} */
                  zoomLevel={zoomLevel}
                  canvasSize={canvasSize}
                  dragAndDrop={dragAndDrop}
                  topMargin={topTextActive ? 50 : 0}
                  bottomMargin={bottomTextActive ? 50 : 0}
                />
                {topTextActive && (
                  <TextLayer
                    font={topTextFont}
                    text={topText}
                    fontSize={topTextFontSize}
                    fontColor={topTextFontColor}
                    dragAndDrop={dragAndDrop}
                    canvasSize={canvasSize}
                    y={5}
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
                    y={canvasSize - bottomTextFontSize - 10}
                  />
                )}
                {plural && (
                  <PluralLayer
                    frame={frameActive}
                    frameWidth={frameWidth}
                    canvasSize={canvasSize}
                  />
                )}
                {verbalTenseActive && (
                  <VerbalTenseLayer
                    frame={frameActive}
                    frameWidth={frameWidth}
                    canvasSize={canvasSize}
                    verbalTense={verbalTense}
                  />
                )}
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
                  onClick={this.handleDownload}
                  label={<FormattedMessage {...messages.downloadLabel} />}
                  primary={true}
                  style={styles.button}
                  icon={<DownloadIcon />}
                />
                {/* </a>*/}
              </div>
            </ConditionalPaper>
          </PictoWrapper>
          <div style={styles.options} data-hide={true}>
            <H3 primary={true}>
              {<FormattedMessage {...messages.modifyPicto} />}
            </H3>
            <Divider />
            <P data-hide={true}>{<FormattedMessage {...messages.pictogramOptions} />}</P>
            <div style={styles.optionsWrapper} data-hide={true}>
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
            <P data-hide={true}>{<FormattedMessage {...messages.textOptions} />}</P>
            <div style={styles.optionsWrapper} data-hide={true}>
              <TextOptions
                textLabel={<FormattedMessage {...messages.topText} />}
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
              />
              <TextOptions
                textLabel={<FormattedMessage {...messages.bottomText} />}
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
              />
            </div>
            <P data-hide={true}>{<FormattedMessage {...messages.advancedOptions} />}</P>
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
                labelPosition='right'
                onToggle={this.handleDragAndDrop}
                style={styles.toggle}
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
  muiTheme: PropTypes.object.isRequired,
  onDownload: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired
}

export default muiThemeable()(Pictogram)
