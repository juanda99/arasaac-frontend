/**
*
* LanguageSelector
*
*/


import React from 'react'
import PropTypes from 'prop-types'
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
    <SelectField style={{ textAlign: 'left', width: '330px', maxWidth: '98%' }} maxHeight={400} value={props.value} onChange={handleChange} floatingLabelText='Choose your language'>
      <MenuItem value={'ca'} primaryText={`Català - ${formatMessage(messages.catalan)}`} />
      <MenuItem value={'de'} primaryText={`Deutsche - ${formatMessage(messages.german)}`} />
      <MenuItem value={'es'} primaryText={`Español - ${formatMessage(messages.spanish)}`} />
      <MenuItem value={'en'} primaryText={`English - ${formatMessage(messages.english)}`} />
      <MenuItem value={'eu'} primaryText={`Euskal - ${formatMessage(messages.basque)}`} />
      <MenuItem value={'fr'} primaryText={`Français - ${formatMessage(messages.french)}`} />
      <MenuItem value={'ga'} primaryText={`Galego - ${formatMessage(messages.galician)}`} />
      <MenuItem value={'cr'} primaryText={`Hrvatski - ${formatMessage(messages.croatian)}`} />
      <MenuItem value={'it'} primaryText={`Italiano - ${formatMessage(messages.italian)}`} />
      <MenuItem value={'bg'} primaryText={`български - ${formatMessage(messages.bulgarian)}`} />
      <MenuItem value={'pl'} primaryText={`Polskie - ${formatMessage(messages.polish)}`} />
      <MenuItem value={'pt'} primaryText={`Português - ${formatMessage(messages.portuguese)}`} />
      <MenuItem value={'br'} primaryText={`Português do Brasil - ${formatMessage(messages.brazilian)}`} />
      <MenuItem value={'ro'} primaryText={`Română - ${formatMessage(messages.romanian)}`} />
      <MenuItem value={'ru'} primaryText={`Pусский - ${formatMessage(messages.russian)}`} />
      <MenuItem value={'val'} primaryText={`Valencia - ${formatMessage(messages.valencian)}`} />
      <MenuItem value={'ara'} primaryText={`عربى - ${formatMessage(messages.arabic)}`} />
      <MenuItem value={'zhs'} primaryText={`简体中文） - ${formatMessage(messages.chineseSimplified)}`} />
    </SelectField>
  )
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default injectIntl(LanguageSelector)

