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

const LanguageSelector = ({
  onChange,
  intl,
  value,
  shortOption,
  showToolTip
}) => {
  const { formatMessage } = intl
  const handleChange = (event, index, value) => {
    onChange(value)
  }

  const showOriginal = (original) => (shortOption ? '' : `${original} - `)

  return (
    <SelectField
      style={{ textAlign: 'left', width: '330px', maxWidth: '98%' }}
      maxHeight={400}
      value={value}
      onChange={handleChange}
      floatingLabelText={showToolTip && 'Choose your language'}
    >
      <MenuItem
        value={'es'}
        primaryText={`${showOriginal('Español')}${formatMessage(messages.es)}`}
      />
      <MenuItem
        value={'en'}
        primaryText={`${showOriginal('English')}${formatMessage(messages.en)}`}
      />
      <MenuItem
        value={'fr'}
        primaryText={`${showOriginal('Français')}${formatMessage(messages.fr)}`}
      />
      <MenuItem
        value={'de'}
        primaryText={`${showOriginal('Deutsche')}${formatMessage(messages.de)}`}
      />
      <MenuItem
        value={'hr'}
        primaryText={`${showOriginal('Hrvatski')}${formatMessage(messages.hr)}`}
      />
      <MenuItem
        value={'it'}
        primaryText={`${showOriginal('Italiano')}${formatMessage(messages.it)}`}
      />
      <MenuItem
        value={'bg'}
        primaryText={`${showOriginal('български')}${formatMessage(
          messages.bg
        )}`}
      />
      <MenuItem
        value={'pl'}
        primaryText={`${showOriginal('Polskie')}${formatMessage(messages.pl)}`}
      />
      <MenuItem
        value={'pt'}
        primaryText={`${showOriginal('Português')}${formatMessage(
          messages.pt
        )}`}
      />
      <MenuItem
        value={'br'}
        primaryText={`${showOriginal('Português do Brasil')}${formatMessage(
          messages.br
        )}`}
      />
      <MenuItem
        value={'ro'}
        primaryText={`${showOriginal('Română')}${formatMessage(messages.ro)}`}
      />
      <MenuItem
        value={'ru'}
        primaryText={`${showOriginal('Pусский')}${formatMessage(messages.ru)}`}
      />
      <MenuItem
        value={'ar'}
        primaryText={`${showOriginal('عربى')}${formatMessage(messages.ar)}`}
      />
      <MenuItem
        value={'zh'}
        primaryText={`${showOriginal('简体中文')}${formatMessage(messages.zh)}`}
      />
      <MenuItem
        value={'gl'}
        primaryText={`${showOriginal('Galego')}${formatMessage(messages.gl)}`}
      />
      <MenuItem
        value={'ca'}
        primaryText={`${showOriginal('Català')}${formatMessage(messages.ca)}`}
      />
      <MenuItem
        value={'eu'}
        primaryText={`${showOriginal('Euskal')}${formatMessage(messages.eu)}`}
      />
      <MenuItem
        value={'val'}
        primaryText={`${showOriginal('Valencia')}${formatMessage(
          messages.val
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
