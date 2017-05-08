import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const Catalog = ({ intl }) => {
  const { formatMessage, key } = intl
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
    key: 'catalog'
  }

  return <FilterSelect items={items} {...filterProps} />
}

Catalog.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Catalog)
