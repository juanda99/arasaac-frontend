import React from 'react'
import PropTypes from 'prop-types'
import Div from 'components/Div'
import ArasaacLogo from './arasaac-logo.svg'

const style = {
  width: 250,
  display: 'flex',
  margin: '0 auto'
}

const Logo = ({ src, top }) => (
  <Div top={top}>
    <img alt='Arasaac logo' style={style} src={src || ArasaacLogo} />
  </Div>
)

Logo.propTypes = {
  src: PropTypes.string,
  top: PropTypes.number
}

export default Logo
