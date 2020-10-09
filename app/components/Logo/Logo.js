import styled from "styled-components";
import media from "utils/mediaqueries";

const Logo = styled.img.attrs({
  // src: 'https://static.arasaac.org/images/arasaac-logo.svg'
  src: "https://static.arasaac.org/images/logo-arasaac-texto.svg",
  alt: "ARASAAC logo",
})`
  width: 180px;
  padding: 8px;
  position: absolute;
  z-index: 10;
  top: calc(0% - 58px);
  left: calc(50% - 100px);
  ${media.md} {
    width: 400px;
    padding: 16px;
    border-width: 5px;
    top: calc(50% - 65px - 75px);
    left: calc(50% - 200px);
  }
  ${media.lg} {
    width: 500px;
    border-width: 7px;
    padding: 20px;
    top: calc(50% - 75px - 75px);
    left: calc(50% - 250px);
  }
`;

export default Logo;
