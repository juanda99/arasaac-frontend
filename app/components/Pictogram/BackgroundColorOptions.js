/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { CirclePicker } from 'react-color'
import { white, yellow, orange, red, green, blue } from 'utils/colors'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

const colors = [white, yellow, orange, red, green, green, blue]

class BackgroundColorOptions extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChoose: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired
  }

  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleColorChange = ({ hex }) => this.props.onChoose(hex)

  render() {
    const { intl, color, active, showOptions } = this.props
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
            <CirclePicker
              color={color}
              colors={colors}
              onChangeComplete={this.handleColorChange}
              width={300}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(BackgroundColorOptions)
