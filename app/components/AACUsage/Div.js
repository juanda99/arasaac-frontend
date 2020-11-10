import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-basis: 300px;
  margin: 10px;
  flex-grow: 1;
  ${media.sm} {
    flex-basis: 400px;
  }
  ${media.md} {
    flex-basis: 600px;
  }
  ${media.lg} {
    flex-basis: 500px;
  }
`

export default Div