import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const SelectArea = ({ intl }) => {
  const { formatMessage } = intl
  const items = [
    { value: 0, primaryText: formatMessage(messages.selfawareness) },
    { value: 1, primaryText: formatMessage(messages.visualdiscrimination) },
    { value: 2, primaryText: formatMessage(messages.auditorydiscrimination) },
    { value: 3, primaryText: formatMessage(messages.phonology) },
    { value: 4, primaryText: formatMessage(messages.morphosyntax) },
    { value: 5, primaryText: formatMessage(messages.semantics) },
    { value: 6, primaryText: formatMessage(messages.pragmatics) },
    { value: 7, primaryText: formatMessage(messages.reading) },
    { value: 9, primaryText: formatMessage(messages.writing) },
    { value: 9, primaryText: formatMessage(messages.literature) },
    { value: 10, primaryText: formatMessage(messages.languages) },
    { value: 11, primaryText: formatMessage(messages.numeration) },
    { value: 12, primaryText: formatMessage(messages.basicOperations) },
    { value: 13, primaryText: formatMessage(messages.problems) },
    { value: 14, primaryText: formatMessage(messages.geometry) },
    { value: 15, primaryText: formatMessage(messages.naturalSciences) },
    { value: 16, primaryText: formatMessage(messages.socialSciences) },
    { value: 17, primaryText: formatMessage(messages.music) },
    { value: 18, primaryText: formatMessage(messages.art) },
    { value: 19, primaryText: formatMessage(messages.physicalEducation) },
    { value: 20, primaryText: formatMessage(messages.religion) },
    { value: 21, primaryText: formatMessage(messages.health) },
    { value: 22, primaryText: formatMessage(messages.leisure) },
    { value: 23, primaryText: formatMessage(messages.signalling) }
  ]
  return <FilterSelect items={items} />
}

SelectArea.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(SelectArea)
