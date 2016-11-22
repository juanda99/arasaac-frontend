/**
*
* LanguageSelector
*
*/


import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'

const LanguageSelector = (props) => {
  const { formatMessage } = props.intl
  const handleChange = (event, index, value) => {
    props.onChange(value)
  }
  return (
    <SelectField style={{ textAlign: 'left' }} value={props.value} onChange={handleChange} floatingLabelText='Choose your language'>
      <MenuItem value={'es'} primaryText={formatMessage(messages.spanish)} />
      <MenuItem value={'fr'} primaryText={formatMessage(messages.french)} />
      <MenuItem value={'en'} primaryText={formatMessage(messages.english)} />
    </SelectField>
  )
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}

export default injectIntl(LanguageSelector)

