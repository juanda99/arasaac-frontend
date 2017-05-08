import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const License = ({ intl }) => {
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
    key: 'license'
  }

  return <FilterSelect items={items} {...filterProps} />
}

License.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(License)
