import styled from 'styled-components'

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  position: relative;
  width: 50%;
  max-width: 290px;
  /* if not, it seemed not to be centered */
  left: -3%;
  z-index: 9;
`
export default Logo
