import React from 'react'
import PropTypes from 'prop-types'
import ChipInput from 'material-ui-chip-input'
import AutoComplete from 'material-ui/AutoComplete'

const RenderChip = ({ input, hintText, floatingLabelText, dataSource }) => (
  <div style={{ display: 'flex', maxWidth: '500px' }}>
    <ChipInput
      {...input}
      value={input.value || []}
      onRequestAdd={(addedChip) => {
        let values = input.value || []
        values = values.slice()
        values.push(addedChip)
        input.onChange(values)
      }}
      onRequestDelete={(deletedChip) => {
        let values = input.value || []
        values = values.filter((v) => v !== deletedChip)
        input.onChange(values)
      }}
      onBlur={() => input.onBlur()}
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      dataSource={dataSource}
      filter={AutoComplete.fuzzyFilter}
      fullWidth
      openOnFocus
    />
  </div>
)

RenderChip.propTypes = {
  input: PropTypes.object.isRequired,
  hintText: PropTypes.string.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default RenderChip
