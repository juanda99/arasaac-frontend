/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { TwitterPicker } from 'react-color'
import FontPicker from 'font-picker-react'
import Slider from 'material-ui/Slider'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

class TextOptions extends Component {
  static propTypes = {
    color: PropTypes.string,
    font: PropTypes.string,
    fontSize: PropTypes.number,
    text: PropTypes.string,
    intl: intlShape.isRequired,
    onActive: PropTypes.func.isRequired,
    onFontChange: PropTypes.func.isRequired,
    onTextColorChange: PropTypes.func.isRequired,
    onFontSizeChange: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired
  }

  handleFontChange = (nextFont) => {
    this.props.onFontChange(nextFont.family)
  }

  handleTextChange = (text) => {
    this.props.onTextChange(text)
  }

  handleFontSizeChange = (event, value) => {
    this.props.onFontSizeChange(value)
  }

  handleTextColorChange = ({ hex }) => this.props.onTextColorChange(hex)

  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)


  render() {
    const { intl, color, active, showOptions, font, size, handleFontChange, text, fontSize } = this.props
    const { formatMessage } = intl
    const marginBottom = showOptions ? '140px' : 'auto'
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.backgroundColor)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <TwitterPicker
              triangle='hide'
              color={color}
              onChangeComplete={this.handleTextColorChange}
            />
            <FontPicker
              apiKey='AIzaSyCLxWCWpaWqXdBFuqfsvnzxOUzJI0JFPOE'
              activeFont={font}
              onChange={handleFontChange}
            />
            <Slider value={fontSize} onChange={this.handleFontSizeChange} />
            <p className='apply-font'>
              The font will be applied to this text.
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(TextOptions)
