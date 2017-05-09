import React, { PropTypes } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const SelectArea = ({ intl, addFilterItem, removeFilterItem, values }) => {
  const { formatMessage } = intl
  const items = [
    { value: 0, primaryText: formatMessage(messages.selfawareness) },
    { value: 1, primaryText: formatMessage(messages.visualdiscrimination) },
    { value: 2, primaryText: formatMessage(messages.auditorydiscrimination) },
    { value: 3, primaryText: formatMessage(messages.language) },
    { value: 4, primaryText: formatMessage(messages.phonology) },
    { value: 5, primaryText: formatMessage(messages.morphosyntax) },
    { value: 6, primaryText: formatMessage(messages.semantics) },
    { value: 7, primaryText: formatMessage(messages.pragmatics) },
    { value: 8, primaryText: formatMessage(messages.reading) },
    { value: 9, primaryText: formatMessage(messages.writing) },
    { value: 10, primaryText: formatMessage(messages.literature) },
    { value: 11, primaryText: formatMessage(messages.languages) },
    { value: 12, primaryText: formatMessage(messages.math) },
    { value: 13, primaryText: formatMessage(messages.numeration) },
    { value: 14, primaryText: formatMessage(messages.basicOperations) },
    { value: 15, primaryText: formatMessage(messages.problems) },
    { value: 16, primaryText: formatMessage(messages.geometry) },
    { value: 17, primaryText: formatMessage(messages.naturalSciences) },
    { value: 18, primaryText: formatMessage(messages.socialSciences) },
    { value: 19, primaryText: formatMessage(messages.music) },
    { value: 20, primaryText: formatMessage(messages.art) },
    { value: 21, primaryText: formatMessage(messages.physicalEducation) },
    { value: 22, primaryText: formatMessage(messages.religion) },
    { value: 23, primaryText: formatMessage(messages.health) },
    { value: 24, primaryText: formatMessage(messages.leisure) },
    { value: 25, primaryText: formatMessage(messages.signalling) }
  ]
  const filterProps = {
    floatingLabelText: formatMessage(messages.area),
    multiple: true,
    addFilterItem,
    removeFilterItem,
    values,
    filterType: 'Area'
  }
  return <FilterSelect items={items} {...filterProps} />
}

SelectArea.propTypes = {
  intl: intlShape.isRequired,
  addFilterItem: PropTypes.func.isRequired,
  removeFilterItem: PropTypes.func.isRequired,
  values: PropTypes.array
}

export default injectIntl(SelectArea)
