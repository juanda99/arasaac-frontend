import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

export const FilterSelectLoader = ({ intl, setFilterItems, values, filterData, type, ...other }) => {
  const { formatMessage } = intl
  // const [...selectItems] = filterData.entries()
  const items = filterData.map((selectItem) => {
    if (type === 'languages') return { value: selectItem.code, primaryText: selectItem.text }
    return { value: parseInt(selectItem.code, 10) || selectItem.code, primaryText: formatMessage(messages[selectItem.text]) }
  })
  const sortItems = items.sort((a, b) => a.primaryText.localeCompare(b.primaryText))
  const filterProps = {
    floatingLabelText: formatMessage(messages[type]),
    multiple: true,
    setFilterItems,
    values,
    filterType: type
  }
  return <FilterSelect {...other} items={sortItems} {...filterProps} />
}

FilterSelectLoader.displayName = 'FilterSelectLoader'

FilterSelectLoader.propTypes = {
  intl: intlShape.isRequired,
  setFilterItems: PropTypes.func.isRequired,
  values: PropTypes.array,
  filterData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

export default injectIntl(FilterSelectLoader)
