import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Map } from 'immutable'
import FilterSelect from './FilterSelect'
import messages from './messages'

export const FilterSelectLoader = ({ intl, setFilterItems, values, filterData, type, ...other }) => {
  const { formatMessage } = intl
  const [...selectItems] = filterData.entries()
  const items = selectItems.map((selectItem) => {
    /* select for Language needs no translation */
    if (type === 'language') return { value: selectItem[0], primaryText: selectItem[1] }
    return { value: parseInt(selectItem[0], 10) || selectItem[0], primaryText: formatMessage(messages[selectItem[1]]) }
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
  filterData: PropTypes.instanceOf(Map).isRequired,
  type: PropTypes.string.isRequired
}

export default injectIntl(FilterSelectLoader)
