import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justifyContent: flexStart;
  ${media.sm} {
    flex-wrap: nowrap;
  }
  ${media.md} {
    flex-wrap: nowrap;
  }
  ${media.lg} {
    flex-wrap: nowrap;
  }
`
export default Div
