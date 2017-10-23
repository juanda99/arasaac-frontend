import styled from 'styled-components'
import media from 'utils/mediaqueries'

const View = styled.div`
  padding: 4rem 1rem;
  padding-left: ${(props) => props.left ? '0.5rem' : '0rem'};
  padding-right: ${(props) => props.right ? '0.5rem' : '0rem'};
  padding-top: ${(props) => props.top ? `${props.top}rem` : '2rem'};
  padding-bottom: ${(props) => props.bottom ? `${props.bottom}rem` : '2rem'};
  ${media.md} {
    padding: 4rem 6rem;
    padding-left: ${(props) => props.left ? '6rem' : '0rem'};
    padding-right: ${(props) => props.right ? '6rem' : '0rem'};
    padding-top: ${(props) => props.top ? `${props.top}rem` : '4rem'};
    padding-bottom: ${(props) => props.bottom ? `${props.bottom}rem` : '4rem'};
  }
  
`

export default View
