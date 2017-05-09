import React, { PropTypes } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import FilterSelect from './FilterSelect'
import messages from './messages'

const Activity = ({ intl, setFilterItems, values }) => {
  const { formatMessage } = intl
  const items = [
    { value: 0, primaryText: formatMessage(messages.lim) },
    { value: 1, primaryText: formatMessage(messages.picaa) },
    { value: 2, primaryText: formatMessage(messages.animation) },
    { value: 3, primaryText: formatMessage(messages.software) },
    { value: 4, primaryText: formatMessage(messages.araBoard) },
    { value: 5, primaryText: formatMessage(messages.board) },
    { value: 6, primaryText: formatMessage(messages.bingo) },
    { value: 7, primaryText: formatMessage(messages.song) },
    { value: 8, primaryText: formatMessage(messages.notebook) },
    { value: 9, primaryText: formatMessage(messages.story) },
    { value: 10, primaryText: formatMessage(messages.multimedia) },
    { value: 11, primaryText: formatMessage(messages.domino) },
    { value: 12, primaryText: formatMessage(messages.game) },
    { value: 13, primaryText: formatMessage(messages.group) },
    { value: 14, primaryText: formatMessage(messages.exercise) },
    { value: 15, primaryText: formatMessage(messages.jClic) },
    { value: 16, primaryText: formatMessage(messages.goose) },
    { value: 17, primaryText: formatMessage(messages.book) },
    { value: 18, primaryText: formatMessage(messages.image) },
    { value: 19, primaryText: formatMessage(messages.video) },
    { value: 20, primaryText: formatMessage(messages.pictodroidLite) },
    { value: 21, primaryText: formatMessage(messages.digitalBoard) },
    { value: 22, primaryText: formatMessage(messages.slide) },
    { value: 23, primaryText: formatMessage(messages.protocol) },
    { value: 24, primaryText: formatMessage(messages.routine) },
    { value: 25, primaryText: formatMessage(messages.signalling) },
    { value: 26, primaryText: formatMessage(messages.sequence) },
    { value: 27, primaryText: formatMessage(messages.smartNotebook) },
    { value: 28, primaryText: formatMessage(messages.tico) },
    { value: 29, primaryText: formatMessage(messages.test) },
    { value: 30, primaryText: formatMessage(messages.socialHistory) }
  ]
  const filterProps = {
    floatingLabelText: formatMessage(messages.activity),
    multiple: true,
    setFilterItems,
    values,
    filterType: 'Activity'
  }
  return <FilterSelect items={items} {...filterProps} />
}

Activity.propTypes = {
  intl: intlShape.isRequired,
  setFilterItems: PropTypes.func.isRequired,
  values: PropTypes.array
}

export default injectIntl(Activity)
