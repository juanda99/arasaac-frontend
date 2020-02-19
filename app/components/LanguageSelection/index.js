/**
*
* Welcome
*
*/


import React from 'react'
import { lightGreen500 } from 'material-ui/styles/colors'
import FullWidthSection from 'components/FullWidthSection'
import LocaleToggle from 'containers/LocaleToggle'


const LanguageSelection = () => {

  return (

    <FullWidthSection color={lightGreen500}>
      <div style={{ padding: '10em' }}>
        <LocaleToggle />
      </div>

    </FullWidthSection>

  )
}

export default LanguageSelection
