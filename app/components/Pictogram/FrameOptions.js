/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { TwitterPicker } from 'react-color'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { THIN, MEDIUM, THICK } from './constants'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

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

  handleFrameWidthChange = (event, index, frameWidth) =>
    this.props.onChooseWidth(frameWidth)

  handleColorChange = ({ hex }) => this.props.onChooseColor(hex)

  render() {
    const { intl, color, active, showOptions, width } = this.props
    const { formatMessage } = intl
    const marginBottom = showOptions ? '200px' : 'auto'
    return (
      <div style={{ marginBottom }}>
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
            <TwitterPicker
              triangle='hide'
              color={color}
              onChangeComplete={this.handleColorChange}
            />

            <SelectField
              floatingLabelText={formatMessage(messages.frameWidth)}
              value={width}
              onChange={this.handleFrameWidthChange}
            >
              <MenuItem value={null} primaryText='' />
              <MenuItem
                value={THIN}
                primaryText={formatMessage(messages.thin)}
              />
              <MenuItem
                value={MEDIUM}
                primaryText={formatMessage(messages.medium)}
              />
              <MenuItem
                value={THICK}
                primaryText={formatMessage(messages.thick)}
              />
            </SelectField>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(FrameOptions)
