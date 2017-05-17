import React, { PropTypes } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const Size = ({ intl, setFilterItems, values }) => {
  const { formatMessage } = intl
  const items = [
    { value: 1, primaryText: formatMessage(messages.large) },
    { value: 2, primaryText: formatMessage(messages.medium) },
    { value: 3, primaryText: formatMessage(messages.small) }
  ]

  const filterProps = {
    floatingLabelText: formatMessage(messages.size),
    multiple: false,
    setFilterItems,
    values,
    filterType: 'Size'
  }

  return <FilterSelect items={items} {...filterProps} />
}

Size.propTypes = {
  intl: intlShape.isRequired,
  setFilterItems: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired
}

export default injectIntl(Size)
