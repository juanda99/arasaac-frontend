/**
*
* Welcome
*
*/


import React from 'react'
import { lightGreen500 } from 'material-ui/styles/colors'
import FullWidthSection from 'components/FullWidthSection'
import H1 from 'components/H1'
import LocaleToggle from 'containers/LocaleToggle'
import RaisedButton from 'material-ui/RaisedButton'


const Welcome = () => {

  return (

    <FullWidthSection color={lightGreen500}>
      <div style={{ padding: '10em' }}>
        <H1 center={true} style={{ color: 'black' }}>¡Bienvenido a ARASAAC!</H1>
        <LocaleToggle />
        <RaisedButton
          label='Como empezar'
          secondary={true}
        />
      </div>

    </FullWidthSection>

  )
}

export default Welcome
