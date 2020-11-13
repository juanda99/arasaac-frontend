import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import H2 from 'components/H2'
import P from 'components/P'
import A from 'components/A'
import Img from 'components/SAAC/Img'
import messages from './messages'

const AAC = () => {

  const aac  = <strong><FormattedMessage {...messages.aac} /></strong>
  const systemSymbols = <strong><FormattedMessage {...messages.systemSymbols} /></strong>
  const supportProducts = <strong><FormattedMessage {...messages.supportProducts} /></strong>
  const author = <strong>Carmen Basil</strong>
  const team  = <strong> <A href='https://www.utac.cat/' target='_blank'>Unitat de Tècniques Augmentatives de Comunicació (UTAC)</A></strong>
  const communicationProducts = <strong><FormattedMessage {...messages.communicationProducts} /></strong>
  const referenceName = <strong><FormattedMessage {...messages.referenceName} /></strong>
  const gesturalSymbols = <strong><FormattedMessage {...messages.gesturalSymbols} /></strong>
  const graphicSymbols = <strong><FormattedMessage {...messages.graphicSymbols} /></strong>
  const pictographicSystems = <strong><FormattedMessage {...messages.pictographicSystems} /></strong>
  const communicationBoards = <strong><FormattedMessage {...messages.communicationBoards} /></strong>
  const communicationBooks = <strong><FormattedMessage {...messages.communicationBooks} /></strong>
  const electronicCommunicators = <strong><FormattedMessage {...messages.electronicCommunicators} /></strong>
  const evaluation = <strong><FormattedMessage {...messages.evalulation} /></strong>
  const empowerment = <strong><FormattedMessage {...messages.empowerment} /></strong>
  const teaching = <strong><FormattedMessage {...messages.teaching} /></strong>
  const directSelection = <strong><FormattedMessage {...messages.directSelection} /></strong>
  const mouseSelection = <strong><FormattedMessage {...messages.mouseSelection} /></strong>
  const dependentExploration = <strong><FormattedMessage {...messages.dependentExploration} /></strong>
  const independentExploration = <strong><FormattedMessage {...messages.independentExploration} /></strong>
  const codedSelection = <strong><FormattedMessage {...messages.codedSelection} /></strong>
  return (
    <div>
      <P><FormattedMessage {...messages.gratitude} values={{ author, team }}/></P>

      <H2 primary={true}><FormattedMessage {...messages.whatareAACSystems}/></H2>
      <P><FormattedMessage {...messages.p1} values={{ aac }} /></P>
      <Img src='https://static.arasaac.org/pictograms/27685/27685_500.png' alt='pictograms' left={true} />
      <P><FormattedMessage {...messages.p2} /></P>
      <P><FormattedMessage {...messages.p3} /></P>
      <P><FormattedMessage {...messages.p4} values={{ aac }} /></P>

      <H2 primary={true}><FormattedMessage {...messages.resources} /></H2>
      <P><FormattedMessage {...messages.p5} values={{ systemSymbols, supportProducts }}/></P>
      <Img src='https://static.arasaac.org/pictograms/36723/36723_500.png' alt='pictograms' />
      <P><FormattedMessage {...messages.p6} values={{ communicationProducts }}/></P>
      <P><FormattedMessage {...messages.p7} values={{ referenceName }}/></P>

      <H2 primary={true}><FormattedMessage {...messages.systemsSymbols} /></H2>
      <P><FormattedMessage {...messages.p8} /></P>
      <Img src='https://static.arasaac.org/pictograms/15018/15018_500.png' alt='pictograms' left={true} />
      <P><FormattedMessage {...messages.p9} values={{ gesturalSymbols }}/></P>
      <Img src='https://static.arasaac.org/pictograms/11754/11754_500.png' alt='pictograms' />
      <P><FormattedMessage {...messages.p10} values={{ graphicSymbols }}/></P>
      <P><FormattedMessage {...messages.p11} values={{ pictographicSystems }}/></P>

      <H2 primary={true}><FormattedMessage {...messages.supportProductsTitle} /></H2>
      <Img src='https://static.arasaac.org/pictograms/16155/16155_500.png' alt='pictograms' left={true} />
      <P><FormattedMessage {...messages.p12} values={{ communicationBoards, communicationBooks }}/></P>
      <Img src='https://static.arasaac.org/pictograms/5971/5971_500.png' alt='pictograms' />
      <P><FormattedMessage {...messages.p13} values={{ electronicCommunicators }}/></P>
      <P><FormattedMessage {...messages.p14} /></P>


      <H2 primary={true}><FormattedMessage {...messages.strategiesTitle} /></H2>
      <P><FormattedMessage {...messages.p15} /></P>
      <P>
        <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
          <li><FormattedMessage {...messages.list1} values={{ directSelection }}/></li>
          <li><FormattedMessage {...messages.list2} values={{ mouseSelection }}/></li>
          <li><FormattedMessage {...messages.list3} values={{ dependentExploration }}/></li>
          <li><FormattedMessage {...messages.list4} values={{ independentExploration }}/></li>
          <li><FormattedMessage {...messages.list5} values={{ codedSelection }}/></li>
        </ul>
      </P>
      <P><FormattedMessage {...messages.p16} /></P>

      <H2 primary={true}><FormattedMessage {...messages.encourageTitle} /></H2>
      <P><FormattedMessage {...messages.p17} /></P>
      <P><FormattedMessage {...messages.p18} values={{ evaluation }}/></P>
      <P><FormattedMessage {...messages.p19} values={{ empowerment, teaching }}/></P>
      <P><FormattedMessage {...messages.p20} /></P>

    </div>
  )
}

export default AAC


