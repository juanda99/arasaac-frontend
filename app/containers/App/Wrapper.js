import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Wrapper = styled.div`
  ${media.lg} {
    padding-left: ${(props) => (props.docked ? '20rem' : '0rem')};
  }
`

export default Wrapper
