import styled from 'styled-components'
import media from 'utils/mediaqueries'

const DivSearchBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

  ${media.xs} {
    flex-direction: column;
  }
  ${media.sm} {
    flex-direction: row;
  }
  
`

export default DivSearchBox