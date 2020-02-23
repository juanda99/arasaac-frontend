import styled from 'styled-components'
import media from 'utils/mediaqueries'
import ArasaacLogo from './arasaac-logo-blanco.svg'


const Logo = styled.img.attrs({
  src: 'https://static.arasaac.org/images/arasaac-logo.svg'
})`
  width: 100px;
  padding: 8px;
  border-radius: 50%;
  border-width: 3px;
  border-style: inset;
  border-color: chartreuse;
  background-color: white;
  position: absolute;
  z-index: 10;
  top: calc(100% - 50px);
  left: calc(50% - 50px);

  ${media.sm} {
    width: 150px;
    padding: 12px;
    border-width: 3px;
    top: calc(100% - 75px);
    left: calc(50% - 75px);
  }
  ${media.md} {
    width: 200px;
    padding: 16px;
    border-width: 5px;
    top: calc(100% - 100px);
    left: calc(50% - 100px);
  }
  ${media.lg} {
    width: 240px;
    border-width: 7px;
    padding: 20px;
    top: calc(100% - 120px);
    left: calc(50% - 120px);
  }
`

export default Logo