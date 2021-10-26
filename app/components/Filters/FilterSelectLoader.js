import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import langMessages from 'components/LanguageSelector/messages'
import FilterSelect from './FilterSelect'
import messages from './messages'

export const FilterSelectLoader = ({
  intl,
  values,
  filtersData,
  type,
  ...other
}) => {
  const { formatMessage } = intl
  const items = filtersData.map((selectItem) => {
    if (type === 'language')
      return {
        value: selectItem.code,
        primaryText: formatMessage(langMessages[selectItem.code]),
      }
    /* areas and activities also used in MaterialForm */
    if (type === 'area') {
      const value = parseInt(selectItem.code, 10)
      let text = formatMessage(messages[selectItem.text])
      switch (value) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 31:
        case 32:
          text = `${formatMessage(messages['language'])} / ${text}`
          break
        case 13:
        case 14:
        case 15:
        case 16:
        case 29:
        case 30:
        case 33:
          text = `${formatMessage(messages['math'])} / ${text}`
          break
        case 1:
        case 2:
        case 27:
          text = `${formatMessage(messages['priorSkills'])} / ${text}`
          break
        case 36:
        case 37:
        case 38:
          text = `${formatMessage(messages['socio-emotionalSkills'])} / ${text}`
          break
        default:
          break
      }
      return { value, primaryText: text }
    }
    if (type === 'activity') {
      const value = parseInt(selectItem.code, 10)
      let text = formatMessage(messages[selectItem.text])
      switch (value) {
        case 1:
        case 15:
        case 21:
        case 27:
        case 31:
          text = `${formatMessage(messages['software'])} / ${text}`
          break
        case 4:
        case 5:
        case 8:
        case 17:
        case 20:
        case 28:
          text = `${formatMessage(messages['communication'])} / ${text}`
          break
        case 6:
        case 11:
        case 12:
        case 13:
        case 16:
        case 49:
          text = `${formatMessage(messages['game'])} / ${text}`
          break
        default:
          break
      }
      return { value, primaryText: text }
    }
    return {
      value: parseInt(selectItem.code, 10) || selectItem.code,
      primaryText: formatMessage(messages[selectItem.text]),
    }
  })
  const sortItems = items.sort((a, b) =>
    a.primaryText.localeCompare(b.primaryText)
  )
  const filterProps = {
    floatingLabelText:
      type === 'language'
        ? formatMessage(messages.langSelector)
        : formatMessage(messages[type]),
    multiple: false,
    values,
    filterType: type,
  }
  return <FilterSelect {...other} items={sortItems} {...filterProps} />
}

FilterSelectLoader.displayName = 'FilterSelectLoader'

FilterSelectLoader.propTypes = {
  intl: intlShape.isRequired,
  values: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.string,
  ]),
  filtersData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default injectIntl(FilterSelectLoader)
