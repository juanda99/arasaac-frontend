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
  font-size: 14px;
  top: 10px;
  ${media.sm} {
    font-size: 1em;
    top: calc(50% + 8px);
  }
  ${media.md} {
    font-size: 1em;
    top: calc(50% + 30px);
  }
  ${media.lg} {   
    font-size: 1em; // 626px wide
    top: calc(50% + 37px);
  }
`

export default H2
