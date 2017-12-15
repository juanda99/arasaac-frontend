/**
*
* Welcome
*
*/


import React from 'react'
import { FormattedMessage } from 'react-intl'
import { lightGreen500 } from 'material-ui/styles/colors'
import FullWidthSection from 'components/FullWidthSection'
import H1 from 'components/H1'
import H2 from 'components/H2'
// import ShowArea from 'components/ShowArea'
import LocaleToggle from 'containers/LocaleToggle'
import messages from './messages'
import ArasaacLogo from './arasaac-logo.svg'
import Logo from './Logo'
import Strong from './Strong'

const Welcome = () => {
  const aragones = <Strong><FormattedMessage {...messages.aragonese} /> </Strong>
  return (
    <FullWidthSection color={lightGreen500}>
      <Logo alt='Arasaac logo' src={ArasaacLogo} />
      <H1>ARA<Strong>SAAC</Strong></H1>
      <H2>
        <FormattedMessage {...messages.header} values={{ aragones }} />
      </H2>
      <LocaleToggle />
    </FullWidthSection>
  )
}

export default Welcome
