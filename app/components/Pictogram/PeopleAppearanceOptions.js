/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

class PeopleAppearanceOptions extends Component {
  static propTypes = {
    skin: PropTypes.string,
    hair: PropTypes.string,
    intl: intlShape.isRequired,
    onSkinChange: PropTypes.func.isRequired,
    onHairChange: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired
  }

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  handleSkinChange = (event, index, skin) => this.props.onSkinChange(skin)

  handleHairChange = (event, index, hair) => this.props.onHairChange(hair)

  render() {
    const { intl, skin, active, showOptions, hair } = this.props
    const { formatMessage } = intl
    const marginBottom = showOptions ? '200px' : 'auto'
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.peopleAppearance)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <SelectField
              style={{ marginRight: '40px' }}
              floatingLabelText={formatMessage(messages.skinColor)}
              value={skin}
              onChange={this.handleSkinChange}
            >
              <MenuItem value={null} primaryText='' />
              <MenuItem
                value='white'
                primaryText={formatMessage(messages.whiteSkin)}
              />
              <MenuItem
                value='black'
                primaryText={formatMessage(messages.blackSkin)}
              />
              <MenuItem
                value='assian'
                primaryText={formatMessage(messages.assianSkin)}
              />
              <MenuItem
                value='mulatto'
                primaryText={formatMessage(messages.mulattoSkin)}
              />
              <MenuItem
                value='aztec'
                primaryText={formatMessage(messages.aztecSkin)}
              />
            </SelectField>
            <SelectField
              floatingLabelText={formatMessage(messages.hairColor)}
              value={hair}
              onChange={this.handleHairChange}
            >
              <MenuItem value={null} primaryText='' />
              <MenuItem
                value='blonde'
                primaryText={formatMessage(messages.blondeHair)}
              />
              <MenuItem
                value='brown'
                primaryText={formatMessage(messages.brownHair)}
              />
              <MenuItem
                value='darkBrown'
                primaryText={formatMessage(messages.darkBrownHair)}
              />
              <MenuItem
                value='gray'
                primaryText={formatMessage(messages.grayHair)}
              />
              <MenuItem
                value='darkGray'
                primaryText={formatMessage(messages.darkGrayHair)}
              />
              <MenuItem
                value='red'
                primaryText={formatMessage(messages.redHair)}
              />
              <MenuItem
                value='black'
                primaryText={formatMessage(messages.blackHair)}
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

export default injectIntl(PeopleAppearanceOptions)
