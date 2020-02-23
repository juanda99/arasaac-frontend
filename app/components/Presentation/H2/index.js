import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import media from 'utils/mediaqueries'

const H2 = styled.h2`
  color: white;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 10;
  font-weight: ${typography.fontWeightLight};
  ${media.sm} {
    font-size: 16px;
    top: calc(100% - 75px);
  }
  ${media.md} {
    font-size: 17px;
    top: calc(100% - 280px);
  }
  ${media.lg} {   
    font-size: 19px; // 626px wide
    top: calc(100% - 282px);
  }
`

export default H2
