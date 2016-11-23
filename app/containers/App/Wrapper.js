import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Wrapper = styled.div`
  ${media.lg} {
    padding-left: ${(props) => (props.docked ? '26em' : '0em')};
  }
  margin-top: 10em;
  margin-left: 1em;
`

export default Wrapper
