import React from 'react'
import PropTypes from 'prop-types'
import Div from 'components/Div'
import ArasaacLogo from './arasaac-logo-blanco.svg'
import LogoImg from './Logo'


const style = {
  width: 270,
  display: 'flex',
  margin: '0 auto',
  padding: 20,
  // backgroundColor: 'white'
}


const Logo = ({ src, top, circle }) => (
  <Div top={top}>
    {circle ? <LogoImg alt='Arasaac logo' /> : <img alt='Arasaac logo' style={style} src={src || ArasaacLogo} />}
  </Div >
)



Logo.propTypes = {
  src: PropTypes.string,
  top: PropTypes.number,
  circle: PropTypes.bool,
}

export default Logo
