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
import LocaleToggle from 'containers/LocaleToggle'
import RaisedButton from 'material-ui/RaisedButton'
import messages from './messages'

const Welcome = ({ run, onStart, onStop }) => (

  <FullWidthSection color={lightGreen500}>
    <div style={{ padding: '10em' }}>
      <H1 center={true} style={{ color: 'black' }}> {<FormattedMessage {...messages.welcome} />}</H1>
      <LocaleToggle />
      <RaisedButton
        label={<FormattedMessage {...messages.discover} />}
        secondary={true}
        onClick={onStart}
        disabled={run === true}
      />
    </div>
  </FullWidthSection>

)

export default Welcome
