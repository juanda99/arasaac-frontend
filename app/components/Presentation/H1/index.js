import styled from 'styled-components'
import media from 'utils/mediaqueries'

const H1 = styled.h1`
  color: white;
  font-weight: 900;
  position: absolute;
  width: 100%;
  z-index: 10;
  text-align: center;
  ${media.sm} {
    font-size: 4em;
    top: calc(100% - 75px); 
  } 
  ${media.md} {
    font-size: 40px;
    top: calc(100% - 350px);
  }
  ${media.lg} {   
    font-size: 64px;
    top: calc(100% - 400px);
  }
`

export default H1
