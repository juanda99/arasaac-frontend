/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontPicker from 'font-picker-react'
import Slider from 'material-ui/Slider'
import AutoComplete from 'material-ui/AutoComplete'
import Toggle from 'material-ui/Toggle'
import FontFaceObserver from 'fontfaceobserver'
import { FormattedMessage } from 'react-intl'
import api from 'services'
import LanguageSelector from 'components/LanguageSelector'
import P from 'components/P'
import RaisedButton from 'material-ui/RaisedButton'
import { textColorSet } from 'utils/colors'
import ColorPicker from './ColorPicker'
import ToggleDropDown from './ToggleDropdown'
import styles from './styles'
import BoxOptions from './BoxOptions'
import messages from './messages'


class TextOptions extends Component {
  static propTypes = {
    textLabel: PropTypes.string.isRequired,
    fontColor: PropTypes.string.isRequired,
    font: PropTypes.string,
    fontSize: PropTypes.number,
    text: PropTypes.string,
    locale: PropTypes.string.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string),
    onActive: PropTypes.func.isRequired,
    onFontChange: PropTypes.func.isRequired,
    onFontColorChange: PropTypes.func.isRequired,
    onFontSizeChange: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
    idPictogram: PropTypes.number.isRequired,
    upperCase: PropTypes.bool.isRequired,
    onUpperCase: PropTypes.func.isRequired
  };

  state = {
    language: this.props.locale,
    keywords: this.props.keywords,
    editText: true
  };

  handleFontChange = (nextFont) => {
    const font = new FontFaceObserver(nextFont.family);
      font.load().then(() => {
        console.log(`${this.state.activeFontFamily} has loaded`);
        this.props.onFontChange(nextFont.family)
      }, () => {
        console.log(`${this.state.activeFontFamily} is not available`);
      });   
  };

  handleUpdateInput = (searchText) =>
    this.props.upperCase
      ? this.props.onTextChange(searchText.toUpperCase())
      : this.props.onTextChange(searchText);

  handleUpperCase = (event, uppercase) => this.props.onUpperCase(uppercase);

  handleFontSizeChange = (event, value) => {
    this.props.onFontSizeChange(value)
  };

  handleFontColorChange = (color) => this.props.onFontColorChange(color);

  handleActive = (active) => this.props.onActive(active);

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions);

  handleLanguageChange = (language) => {
    const { idPictogram } = this.props
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((data) => {
      let keywords
      if (data.keywords) {
        keywords = data.keywords.map((keyword) => keyword.keyword)
      } else keywords = []
      this.setState({ keywords, language })
      this.props.onTextChange(keywords[0] || '')
      this.suggestions.focus()
    })
  };

  toggleVisibility = () => this.setState({ editText: !this.state.editText });

  render() {
    const {
      text,
      fontColor,
      fontSize,
      font,
      showOptions,
      active,
      textLabel,
      upperCase
    } = this.props

    console.log(this.props.font, "**************************************")
    const { keywords, editText } = this.state
    let marginBottom = 'auto'
    if (showOptions) {
      marginBottom = editText ? '330px' : '410px'
    }

    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={textLabel}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions && editText && (
          <BoxOptions>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <P marginBottom='25px'>
                {<FormattedMessage {...messages.chooseSuggestionsLanguage} />}
              </P>
              <div style={{ position: 'relative', top: '-30px' }}>
                <LanguageSelector
                  value={this.state.language}
                  onChange={this.handleLanguageChange}
                  shortOption={true}
                  showToolTip={false}
                />
              </div>
              <P marginTop='0px' marginBottom='0px'>
                {<FormattedMessage {...messages.writeText} />}
              </P>

              <AutoComplete
                ref={(input) => {
                  this.suggestions = input
                }}
                searchText={text}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={keywords}
                filter={() => true}
                openOnFocus={true}
                fullWidth={true}
              />
              <div style={{ position: 'relative', left: '-13px' }}>
                <Toggle
                  label={<FormattedMessage {...messages.upperCase} />}
                  labelPosition='right'
                  onToggle={this.handleUpperCase}
                  toggled={upperCase}
                  style={styles.toggle}
                />
              </div>
              <RaisedButton
                label={<FormattedMessage {...messages.textFormat} />}
                primary={true}
                onClick={this.toggleVisibility}
                style={{ marginTop: '20', width: '100%' }}
              />
            </div>
          </BoxOptions>
        )}
        {showOptions && !editText && (
          <BoxOptions>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <P style={{ width: '100px' }}>
                {<FormattedMessage {...messages.fontColor} />}
              </P>
              <ColorPicker
                color={fontColor}
                colors={textColorSet}
                onChooseColor={this.handleFontColorChange}
                enableMoreColors={false}
                width={310}
              />
            </div>
            <div>
              <P>
                {<FormattedMessage {...messages.fontSize} />} {fontSize}px
              </P>
              <Slider
                min={1}
                max={100}
                step={1}
                value={fontSize}
                onChange={this.handleFontSizeChange}
                style={{ width: '100%', marginBottom: '0' }}
              />
            </div>
            <div style={{ marginTop: '-30px' }}>
              <P>{<FormattedMessage {...messages.fontFamily} />}</P>
              <FontPicker
                apiKey='AIzaSyAoip_N5rTGMPRkIbRqpKMti2CCsx_1iYg'
                activeFontFamily={font}
                onChange={this.handleFontChange}
                style={{ display: 'inlineBlock', width: '100%' }}
                limit="600"
              />

              <RaisedButton
                label={<FormattedMessage {...messages.editText} />}
                primary={true}
                onClick={this.toggleVisibility}
                style={{
                  marginTop: '20',
                  width: '100%',
                  marginBottom: '-30px'
                }}
              />
            </div>
          </BoxOptions>
        )}
      </div>
    )
  }
}

export default TextOptions
