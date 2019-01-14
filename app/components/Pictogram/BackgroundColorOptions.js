/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { TwitterPicker } from 'react-color'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

class BackgroundColorOptions extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChoose: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }

  state = {
    showOptions: false
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { active } = this.props
    if (
      nextProps.active !== active &&
      nextState.showOptions !== nextProps.active
    ) {
      if (this.state.showOptions) this.setState({ showOptions: false })
      else this.setState({ showOptions: true })
    }
  }

  handleActive = (active) => this.props.onActive(active)

  handleShowOptions = () =>
    this.setState({
      showOptions: !this.state.showOptions
    })

  handleColorChange = ({ hex }) => this.props.onChoose(hex)

  render() {
    const { intl, color, active } = this.props
    const { formatMessage } = intl
    const { showOptions } = this.state
    const marginBottom = this.state.showOptions ? '140px' : 'auto'
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.backgroundColor)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleShowOptions}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <TwitterPicker
              triangle='hide'
              color={color}
              onChangeComplete={this.handleColorChange}
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
