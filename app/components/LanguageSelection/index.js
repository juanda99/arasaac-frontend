/**
*
* Welcome
*
*/


import React from 'react'
import { lightGreen500, grey400 } from 'material-ui/styles/colors'
import FullWidthSection from 'components/FullWidthSection'
import LocaleToggle from 'containers/LocaleToggle'


const LanguageSelection = () => {

  return (
    <div>

      <FullWidthSection color={lightGreen500}>
        <LocaleToggle />
      </FullWidthSection>
    </div>

  )
}

export default LanguageSelection
