import React, { PropTypes } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const License = ({ intl, setFilterItems, values }) => {
  const { formatMessage } = intl
  const items = [
    { value: 1, primaryText: formatMessage(messages.reuseMofified) },
    { value: 2, primaryText: formatMessage(messages.reuse) },
    { value: 3, primaryText: formatMessage(messages.nonCommercialModified) },
    { value: 4, primaryText: formatMessage(messages.nonCommercial) }
  ]

  const filterProps = {
    floatingLabelText: formatMessage(messages.license),
    multiple: false,
    setFilterItems,
    values,
    filterType: 'License'
  }

  return <FilterSelect items={items} {...filterProps} />
}

License.propTypes = {
  intl: intlShape.isRequired,
  setFilterItems: PropTypes.func.isRequired,
  values: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired
}

export default injectIntl(License)
