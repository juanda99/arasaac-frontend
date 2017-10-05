import styled from 'styled-components'
import media from 'utils/mediaqueries'

const View = styled.div`
  padding: 4rem 0.5rem;
  padding-left: ${(props) => props.left ? '1rem' : '0rem'};
  padding-right: ${(props) => props.right ? '1rem' : '0rem'};
  ${media.md} {
    padding: 4rem 4rem;
    padding-left: ${(props) => props.left ? '4rem' : '0rem'};
    padding-right: ${(props) => props.right ? '4rem' : '0rem'};
  }
  
`

export default View
