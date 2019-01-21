/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TwitterPicker } from 'react-color'
import FontPicker from 'font-picker-react'
import Slider from 'material-ui/Slider'
import AutoComplete from 'material-ui/AutoComplete'
import api from 'services'
import LanguageSelector from 'components/LanguageSelector'
import RaisedButton from 'material-ui/RaisedButton'
import ToggleDropDown from './ToggleDropdown'
import styles from './styles'
import Subheader from 'material-ui/Subheader'

class TextOptions extends Component {
  static propTypes = {
    textLabel: PropTypes.object.isRequired,
    fontColor: PropTypes.string,
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

  handleFontColorChange = ({ hex }) => this.props.onFontColorChange(hex)

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
          <div style={styles.optionBox}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>Change suggestions language:</p>
              <div style={{ position: 'relative', top: '-30px' }}>
                <LanguageSelector
                  value={this.state.language}
                  onChange={this.handleLanguageChange}
                  shortOption={true}
                />
              </div>
              <p>Write text or select suggestion:</p>

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
          </div>
        )}
        {showOptions && !editText && (
          <div style={styles.optionBox}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <p style={{ width: '100px' }}>Font Color:</p>
              <TwitterPicker
                triangle='hide'
                color={fontColor}
                onChangeComplete={this.handleFontColorChange}
              />
            </div>
            <div>
              <p style={{ width: '100px' }}>Font Size:</p>
              <Slider
                min={1}
                max={100}
                step={1}
                value={fontSize}
                onChange={this.handleFontSizeChange}
                style={{ width: '200px', marginBottom: '0' }}
              />
            </div>
            <div style={{ marginTop: '-48px' }}>
              <p
                style={{
                  width: '100px',
                  float: 'left'
                }}
              >
                Font family:
              </p>

              <FontPicker
                apiKey='AIzaSyCLxWCWpaWqXdBFuqfsvnzxOUzJI0JFPOE'
                activeFont={font}
                onChange={this.handleFontChange}
                style={{ display: 'inlineBlock' }}
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
          </div>
        )}
      </div>
    )
  }
}

export default TextOptions
