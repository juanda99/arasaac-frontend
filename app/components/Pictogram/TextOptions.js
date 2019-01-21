/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TwitterPicker } from 'react-color'
import FontPicker from 'font-picker-react'
import Slider from 'material-ui/Slider'
import AutoComplete from 'material-ui/AutoComplete'
import api from 'services'
import ToggleDropDown from './ToggleDropdown'
import LanguageSelector from 'components/LanguageSelector'
import styles from './styles'

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
    keywords: this.props.keywords
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
    const { keywords } = this.state
    const marginBottom = showOptions ? '550px' : 'auto'
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
        {showOptions ? (
          <div style={styles.optionBox}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p
                style={{
                  width: '100px',
                  position: 'relative',
                  top: '20px'
                }}
              >
                Text:
              </p>
              <AutoComplete
                hintText="Type 'r', case insensitive"
                searchText={text}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                dataSource={keywords}
                filter={() => true}
                openOnFocus={true}
              />
              <LanguageSelector
                value={this.state.language}
                onChange={this.handleLanguageChange}
                shortOption={true}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
              }}
            >
              <p style={{ width: '100px' }}>Color:</p>
              <TwitterPicker
                triangle='hide'
                color={fontColor}
                onChangeComplete={this.handleFontColorChange}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '10px', clear: 'both' }}>
              <p style={{ width: '100px' }}>Font Size:</p>
              <Slider
                min={1}
                max={100}
                step={1}
                value={fontSize}
                onChange={this.handleFontSizeChange}
                style={{ width: '200px' }}
              />
            </div>
            <div>
              <p
                style={{
                  width: '100px',
                  float: 'left'
                }}
              >
                Font:
              </p>
              <div style={{ float: 'left', width: '200px' }}>
                <FontPicker
                  apiKey='AIzaSyCLxWCWpaWqXdBFuqfsvnzxOUzJI0JFPOE'
                  activeFont={font}
                  onChange={this.handleFontChange}
                  style={{ display: 'inlineBlock' }}
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default TextOptions
