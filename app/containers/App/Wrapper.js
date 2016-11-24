import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Wrapper = styled.div`
  padding: 8rem 4rem;
  ${media.lg} {
    padding-left: ${(props) => (props.docked ? '20rem' : '4rem')};
  }
`

export default Wrapper
