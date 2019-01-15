/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { TwitterPicker } from 'react-color'
import FontPicker from 'font-picker-react'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

class TextOptions extends Component {
  static propTypes = {
    textLabel: PropTypes.object.isRequired,
    fontColor: PropTypes.string,
    font: PropTypes.string,
    fontSize: PropTypes.number,
    text: PropTypes.string,
    onActive: PropTypes.func.isRequired,
    onFontChange: PropTypes.func.isRequired,
    onFontColorChange: PropTypes.func.isRequired,
    onFontSizeChange: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired
  }

  handleFontChange = (nextFont) => {
    this.props.onFontChange(nextFont.family)
  }

  handleTextChange = (event) => {
    this.props.onTextChange(event.target.value)
  }

  handleFontSizeChange = (event, value) => {
    this.props.onFontSizeChange(value)
  }

  handleFontColorChange = ({ hex }) => this.props.onFontColorChange(hex)

  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

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
    const marginBottom = showOptions ? '350px' : 'auto'
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
            <div style={{ display: 'flex' }}>
              <p
                style={{
                  width: '100px',
                  position: 'relative',
                  top: '20px'
                }}
              >
                Text:
              </p>
              <TextField
                className='apply-font'
                hintText={<FormattedMessage {...messages.enterText} />}
                floatingLabelText={textLabel}
                onChange={this.handleTextChange}
                value={text}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
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
