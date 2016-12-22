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
      <MenuItem value={'it'} primaryText={formatMessage(messages.italian)} />
      <MenuItem value={'val'} primaryText={formatMessage(messages.valencian)} />
      <MenuItem value={'de'} primaryText={formatMessage(messages.german)} />
      <MenuItem value={'af'} primaryText={formatMessage(messages.translateOnline)} />

    </SelectField>
  )
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}

export default injectIntl(LanguageSelector)

