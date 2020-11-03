import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Div = styled.div`
  flex-basis: 500px;
  margin: 10px;
  flex-grow: 1;
  max-width: 500px;
  ${media.sm} {
    flex-basis: 250px;
  }
  ${media.md} {
    flex-basis: 250px;
  }
  ${media.lg} {
    flex-basis: 300px;
  }
`

export default Div