import React from 'react'
import PropTypes from 'prop-types'
import ChipInput from 'material-ui-chip-input'
import AutoComplete from 'material-ui/AutoComplete'

class CustomChipInput extends React.Component {


  handleRequestAdd(chip) {
    const chips = this.props.input.value || []
    // we can't save chip as it is. If its entered by keyboard, value=text, so we need
    // to calculate its value:
    const verifyChip = this.props.dataSource.filter((item) => (item.text === chip.text))
    // if its already present, we don't add it
    const duplicated = chips.some((item) => (item.text === chip.text))
    // if its already entered, we don't put it again
    if (verifyChip && !duplicated) {
      chips.push(verifyChip[0])
      this.props.input.onChange(chips)
    }
  }

  handleRequestDelete(deletedChip) {
    let chips = this.props.input.value || []
    chips = chips.filter((c) => c.value !== deletedChip)
    this.props.input.onChange(chips)
  }

  render() {
    const { dataSource, hintText, floatingLabelText, input } = this.props
    const chips = input.value || []
    return (
      <ChipInput
        {...this.props}
        value={chips}
        onRequestAdd={(chip) => this.handleRequestAdd(chip)}
        onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
        dataSource={dataSource}
        dataSourceConfig={{ text: 'text', value: 'value' }}
        onBlur={() => input.onBlur()}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        filter={AutoComplete.fuzzyFilter}
        fullWidth
        openOnFocus
      />
    )
  }
}

CustomChipInput.propTypes = {
  input: PropTypes.object.isRequired,
  hintText: PropTypes.object.isRequired,
  floatingLabelText: PropTypes.object.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default CustomChipInput
