import React from 'react'
import Div from 'components/Div'
import ArasaacLogo from './arasaac-logo.svg'

const style = {
  width: 180,
  marginLeft: 70
}

const Logo = () => (
  <Div top={2}>
    <img alt='Arasaac logo' style={style} src={ArasaacLogo} />
  </Div>
)

export default Logo
