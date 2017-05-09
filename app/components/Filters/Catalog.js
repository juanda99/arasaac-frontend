import React, { PropTypes } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const Catalog = ({ intl, addFilterItem, removeFilterItem, values }) => {
  const { formatMessage } = intl
  const items = [
    { value: 1, primaryText: formatMessage(messages.colorPictograms) },
    { value: 2, primaryText: formatMessage(messages.blackAndWhitePictograms) },
    { value: 3, primaryText: formatMessage(messages.pictures) },
    { value: 4, primaryText: formatMessage(messages.lseVideos) },
    { value: 5, primaryText: formatMessage(messages.lseColor) }
  ]

  const filterProps = {
    floatingLabelText: formatMessage(messages.catalog),
    multiple: false,
    addFilterItem,
    removeFilterItem,
    values,
    filterType: 'Catalog'
  }

  return <FilterSelect items={items} {...filterProps} />
}

Catalog.propTypes = {
  intl: intlShape.isRequired,
  addFilterItem: PropTypes.func.isRequired,
  removeFilterItem: PropTypes.func.isRequired,
  values: PropTypes.array
}

export default injectIntl(Catalog)
