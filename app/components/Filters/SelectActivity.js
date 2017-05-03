import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import MultipleSelect from 'components/MultipleSelect'
import messages from './messages'

const SelectActivity = ({ intl }) => {
  const { formatMessage } = intl
  const items = [
    { value: 24, primaryText: formatMessage(messages.lim) },
    { value: 29, primaryText: formatMessage(messages.picaa) },
    { value: 14, primaryText: formatMessage(messages.animation) },
    { value: 2, primaryText: formatMessage(messages.software) },
    { value: 31, primaryText: formatMessage(messages.araBoard) },
    { value: 16, primaryText: formatMessage(messages.board) },
    { value: 32, primaryText: formatMessage(messages.bingo) },
    { value: 20, primaryText: formatMessage(messages.song) },
    { value: 19, primaryText: formatMessage(messages.notebook) },
    { value: 1, primaryText: formatMessage(messages.story) },
    { value: 36, primaryText: formatMessage(messages.multimedia) },
    { value: 34, primaryText: formatMessage(messages.domino) },
    { value: 5, primaryText: formatMessage(messages.game) },
    { value: 6, primaryText: formatMessage(messages.group) },
    { value: 15, primaryText: formatMessage(messages.exercise) },
    { value: 28, primaryText: formatMessage(messages.jClic) },
    { value: 33, primaryText: formatMessage(messages.goose) },
    { value: 18, primaryText: formatMessage(messages.book) },
    { value: 3, primaryText: formatMessage(messages.image) },
    { value: 35, primaryText: formatMessage(messages.video) },
    { value: 30, primaryText: formatMessage(messages.pictodroidLite) },
    { value: 21, primaryText: formatMessage(messages.digitalBoard) },
    { value: 4, primaryText: formatMessage(messages.slide) },
    { value: 12, primaryText: formatMessage(messages.protocol) },
    { value: 26, primaryText: formatMessage(messages.routine) },
    { value: 25, primaryText: formatMessage(messages.signalling) },
    { value: 27, primaryText: formatMessage(messages.sequence) },
    { value: 23, primaryText: formatMessage(messages.smartNotebook) },
    { value: 22, primaryText: formatMessage(messages.tico) },
    { value: 13, primaryText: formatMessage(messages.test) },
    { value: 37, primaryText: formatMessage(messages.socialHistory) }
  ]
  return <MultipleSelect items={items} />
}

SelectActivity.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(SelectActivity)
