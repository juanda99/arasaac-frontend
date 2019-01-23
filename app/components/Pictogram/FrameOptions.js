/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import ReactTooltip from 'react-tooltip'
import P from 'components/P'
import Slider from 'material-ui/Slider'
import { white, yellow, orange, red, green, blue } from 'utils/colors'
import ColorPicker from './ColorPicker'
import { THIN, MEDIUM, EXTRA_THICK } from './constants'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

const colors = [white, yellow, orange, red, green, blue]

class FrameOptions extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChooseColor: PropTypes.func.isRequired,
    onChooseWidth: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
  }

  state = {
    showMoreColors: false
  }

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleFrameWidthChange = (event, frameWidth) =>
    this.props.onChooseWidth(frameWidth)

  handleColorChange = (color) => this.props.onChooseColor(color)

  handleShowMoreColors = () =>
    this.setState({ showMoreColors: !this.state.showMoreColors })

  render() {
    const { intl, color, active, showOptions, width } = this.props
    const { formatMessage } = intl
    const { showMoreColors } = this.state
    let marginBottom = 'auto'
    if (showOptions) {
      marginBottom = showMoreColors ? '460px' : '240px'
    }
    return (
      <div style={{ marginBottom }}>
        <ReactTooltip />
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.frame)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <P marginTop='0px'>{formatMessage(messages.frameWidth)}</P>
            <Slider
              min={THIN}
              max={EXTRA_THICK}
              step={MEDIUM - THIN}
              value={width}
              onChange={this.handleFrameWidthChange}
              sliderStyle={{ marginBottom: '24px' }}
            />
            <P>{formatMessage(messages.chooseColor)}</P>
            <ColorPicker
              color={color}
              colors={colors}
              onChooseColor={this.handleColorChange}
              showMoreColors={showMoreColors}
              onShowMoreColors={this.handleShowMoreColors}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(FrameOptions)
