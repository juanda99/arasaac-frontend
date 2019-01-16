/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { FUTURE, PAST, PRESENT } from './constants'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

class VerbalTenseOptions extends Component {
  static propTypes = {
    verbalTense: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onActive: PropTypes.func.isRequired,
    onVerbalTenseChange: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired
  }

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleVerbalTenseChange = (event, verbalTense) => this.props.onVerbalTenseChange(verbalTense)

  render() {
    const { intl, active, showOptions, verbalTense } = this.props
    const { formatMessage } = intl
    const marginBottom = showOptions ? '200px' : 'auto'
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.verbalTense)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <RadioButtonGroup
              name='verbalTense'
              // defaultSelected='present'
              valueSelected={verbalTense}
              onChange={this.handleVerbalTenseChange}
            >
              <RadioButton
                value={PAST}
                label={<FormattedMessage {...messages.past} />}
                style={styles.radioButton}
              />
              <RadioButton
                value={PRESENT}
                label={<FormattedMessage {...messages.present} />}
                style={styles.radioButton}
              />
              <RadioButton
                value={FUTURE}
                label={<FormattedMessage {...messages.future} />}
                style={styles.radioButton}
              />
            </RadioButtonGroup>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default injectIntl(VerbalTenseOptions)
