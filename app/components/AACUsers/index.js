import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import H2 from 'components/H2'
import P from 'components/P'
import A from 'components/A'
import Img from 'components/SAAC/Img'
import messages from './messages'

const AACUsers = () => {
  const author = <strong>Carmen Basil</strong>
  const team  = <strong> <A href='https://www.utac.cat/' target='_blank'>Unitat de Tècniques Augmentatives de Comunicació (UTAC)</A></strong>

  return (
    <div>
      <P><FormattedMessage {...messages.gratitude} values={{ author, team }}/></P>


    </div>
  )
}

export default AACUsers


