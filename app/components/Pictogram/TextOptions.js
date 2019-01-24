/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontPicker from 'font-picker-react'
import Slider from 'material-ui/Slider'
import AutoComplete from 'material-ui/AutoComplete'
import api from 'services'
import LanguageSelector from 'components/LanguageSelector'
import P from 'components/P'
import RaisedButton from 'material-ui/RaisedButton'
import { textColorSet } from 'utils/colors'
import ColorPicker from './ColorPicker'
import ToggleDropDown from './ToggleDropdown'
import styles from './styles'
import BoxOptions from './BoxOptions'


class TextOptions extends Component {
  static propTypes = {
    textLabel: PropTypes.object.isRequired,
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
    idPictogram: PropTypes.number.isRequired
  }

  state = {
    language: this.props.locale,
    keywords: this.props.keywords,
    editText: true
  }

  handleFontChange = (nextFont) => {
    this.props.onFontChange(nextFont.family)
  }

  handleUpdateInput = (searchText) => {
    this.props.onTextChange(searchText)
  }

  handleFontSizeChange = (event, value) => {
    this.props.onFontSizeChange(value)
  }

  handleFontColorChange = (color) => this.props.onFontColorChange(color)

  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleLanguageChange = (language) => {
    const { idPictogram } = this.props
    api.GET_KEYWORDS_BY_PICTOID({ language, idPictogram }).then((data) => {
      this.setState({ keywords: data.keywords, language })
      this.props.onTextChange(data.keywords[0] || '')
    })
  }

  toggleVisibility = () => this.setState({ editText: !this.state.editText })

  render() {
    const {
      text,
      fontColor,
      fontSize,
      font,
      showOptions,
      active,
      textLabel
    } = this.props
    const { keywords, editText } = this.state
    let marginBottom = 'auto'
    if (showOptions) {
      marginBottom = editText ? '320px' : '410px'
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
              <P marginBottom='25px'>Change suggestions language:</P>
              <div style={{ position: 'relative', top: '-30px' }}>
                <LanguageSelector
                  value={this.state.language}
                  onChange={this.handleLanguageChange}
                  shortOption={true}
                  showToolTip={false}
                />
              </div>
              <P marginTop='0px' marginBottom='0px'>Write text or select suggestion:</P>

              <AutoComplete
                hintText="Type 'r', case insensitive"
                searchText={text}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={keywords}
                filter={() => true}
                openOnFocus={true}
              />
              <RaisedButton
                label='Text format'
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
              <P style={{ width: '100px' }}>Font Color:</P>
              <ColorPicker
                color={fontColor}
                colors={textColorSet}
                onChooseColor={this.handleFontColorChange}
                enableMoreColors={false}
                width={310}
              />
            </div>
            <div>
              <P style={{ width: '100px' }}>Font Size:</P>
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
              <P>
                Font family:
              </P>

              <FontPicker
                apiKey='AIzaSyCLxWCWpaWqXdBFuqfsvnzxOUzJI0JFPOE'
                activeFont={font}
                onChange={this.handleFontChange}
                style={{ display: 'inlineBlock', width: '100%' }}
              />

              <RaisedButton
                label='Edit text'
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
