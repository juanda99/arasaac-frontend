import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const Language = ({ intl }) => {
  const { formatMessage } = intl
  const items = [
    { value: 'da', primaryText: 'Dansk' },
    { value: 'nl', primaryText: 'Nederlands' },
    { value: 'en', primaryText: 'English' },
    { value: 'fi', primaryText: 'Suomi' },
    { value: 'fr', primaryText: 'Français' },
    { value: 'de', primaryText: 'Deutsch' },
    { value: 'hu', primaryText: 'Magyar' },
    { value: 'it', primaryText: 'Italiano' },
    { value: 'nb', primaryText: 'Norsk' },
    { value: 'pt', primaryText: 'Português' },
    { value: 'ro', primaryText: 'Român' },
    { value: 'ru', primaryText: 'Русский язык' },
    { value: 'es', primaryText: 'Español' },
    { value: 'sv', primaryText: 'svenska' },
    { value: 'tr', primaryText: 'Türkçe' },
    { value: 'ara', primaryText: 'جزائري' },
    { value: 'prs', primaryText: 'درى' },
    { value: 'pes', primaryText: ' فارسى' },
    { value: 'urd', primaryText: 'اردو' },
    { value: 'zhs', primaryText: '简体中文' },
    { value: 'zht', primaryText: '繁體中文' }
  ]

  const filterProps = {
    floatingLabelText: formatMessage(messages.chooseLanguage),
    multiple: false
  }

  return <FilterSelect items={items} {...filterProps} />
}

Language.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Language)
