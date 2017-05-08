import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const Size = ({ intl }) => {
  const { formatMessage } = intl
  const items = [
    { value: 1, primaryText: formatMessage(messages.large) },
    { value: 2, primaryText: formatMessage(messages.medium) },
    { value: 3, primaryText: formatMessage(messages.small) }
  ]

  const filterProps = {
    floatingLabelText: formatMessage(messages.size),
    multiple: false,
    key: 'size'
  }

  return <FilterSelect items={items} {...filterProps} />
}

Size.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(Size)
