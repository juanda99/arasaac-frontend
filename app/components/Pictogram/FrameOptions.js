/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { CirclePicker } from 'react-color'
import ReactTooltip from 'react-tooltip'
import P from 'components/P'
import Slider from 'material-ui/Slider'
import { white, yellow, orange, red, green, blue } from 'utils/colors'
import BoxOptions from './BoxOptions'
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

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleFrameWidthChange = (event, frameWidth) =>
    this.props.onChooseWidth(frameWidth)

  // hack we use darkWhite circle color to see it with white body background
  handleColorChange = ({ hex }) => this.props.onChooseColor(hex)

  render() {
    const { intl, color, active, showOptions, width } = this.props
    const { formatMessage } = intl
    const marginBottom = showOptions ? '300px' : 'auto'
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
          <BoxOptions>
            <P>{formatMessage(messages.chooseColor)}</P>
            <CirclePicker
              color={color}
              colors={colors}
              onChangeComplete={this.handleColorChange}
              width={300}
            />
            <P marginBottom='0px' >{formatMessage(messages.frameWidth)}</P>
            <Slider
              min={THIN}
              max={EXTRA_THICK}
              step={MEDIUM - THIN}
              value={width}
              data-tip='hello world'
              onChange={this.handleFrameWidthChange}
            />
          </BoxOptions>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(FrameOptions)
