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

  const showOriginal = (original) => (props.shortOption ? '' : `${original} - `)

  return (
    <SelectField
      style={{ textAlign: 'left', width: '330px', maxWidth: '98%' }}
      maxHeight={400}
      value={props.value}
      onChange={handleChange}
      floatingLabelText={props.showToolTip && 'Choose your language'}
    >
      <MenuItem
        value={'es'}
        primaryText={`${showOriginal('Español')}${formatMessage(
          messages.spanish
        )}`}
      />
      <MenuItem
        value={'en'}
        primaryText={`${showOriginal('English')}${formatMessage(
          messages.english
        )}`}
      />
      <MenuItem
        value={'fr'}
        primaryText={`${showOriginal('Français')}${formatMessage(
          messages.french
        )}`}
      />
      <MenuItem
        value={'de'}
        primaryText={`${showOriginal('Deutsche')}${formatMessage(
          messages.german
        )}`}
      />
      <MenuItem
        value={'hr'}
        primaryText={`${showOriginal('Hrvatski')}${formatMessage(
          messages.croatian
        )}`}
      />
      <MenuItem
        value={'it'}
        primaryText={`${showOriginal('Italiano')}${formatMessage(
          messages.italian
        )}`}
      />
      <MenuItem
        value={'bg'}
        primaryText={`${showOriginal('български')}${formatMessage(
          messages.bulgarian
        )}`}
      />
      <MenuItem
        value={'pl'}
        primaryText={`${showOriginal('Polskie')}${formatMessage(
          messages.polish
        )}`}
      />
      <MenuItem
        value={'pt'}
        primaryText={`${showOriginal('Português')}${formatMessage(
          messages.portuguese
        )}`}
      />
      <MenuItem
        value={'br'}
        primaryText={`${showOriginal('Português do Brasil')}${formatMessage(
          messages.brazilian
        )}`}
      />
      <MenuItem
        value={'ro'}
        primaryText={`${showOriginal('Română')}${formatMessage(
          messages.romanian
        )}`}
      />
      <MenuItem
        value={'ru'}
        primaryText={`${showOriginal('Pусский')}${formatMessage(
          messages.russian
        )}`}
      />
      <MenuItem
        value={'ar'}
        primaryText={`${showOriginal('عربى')}${formatMessage(messages.arabic)}`}
      />
      <MenuItem
        value={'zh'}
        primaryText={`${showOriginal('简体中文')}${formatMessage(
          messages.chineseSimplified
        )}`}
      />
      <MenuItem
        value={'gl'}
        primaryText={`${showOriginal('Galego')}${formatMessage(
          messages.galician
        )}`}
      />
      <MenuItem
        value={'ca'}
        primaryText={`${showOriginal('Català')}${formatMessage(
          messages.catalan
        )}`}
      />
      <MenuItem
        value={'eu'}
        primaryText={`${showOriginal('Euskal')}${formatMessage(
          messages.basque
        )}`}
      />

      <MenuItem
        value={'val'}
        primaryText={`${showOriginal('Valencia')}${formatMessage(
          messages.valencian
        )}`}
      />
    </SelectField>
  )
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  shortOption: PropTypes.bool,
  showToolTip: PropTypes.bool
}

export default injectIntl(LanguageSelector)
