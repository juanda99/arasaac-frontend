import styled from 'styled-components'
import media from 'utils/mediaqueries'


const Logo = styled.img.attrs({
  // src: 'https://static.arasaac.org/images/arasaac-logo.svg'
  src: 'https://static.arasaac.org/images/logo-arasaac-texto.svg'
})`

  width: 200px;
  padding: 8px;
  position: absolute;
  z-index: 100;
  top: calc(0% - 58px);
  left: calc(50% - 100px);

  ${media.sm} {
    width: 300px;
    padding: 12px;
    border-width: 3px;
    top: calc(50% - 60px);
    left: calc(50% - 150px);
  }
  ${media.md} {
    width: 400px;
    padding: 16px;
    border-width: 5px;
    top: calc(50% - 65 px);
    left: calc(50% - 200px);
  }
  ${media.lg} {
    width: 500px;
    border-width: 7px;
    padding: 20px;
    top: calc(50% - 75px);
    left: calc(50% - 250px);
  }
`

export default Logo