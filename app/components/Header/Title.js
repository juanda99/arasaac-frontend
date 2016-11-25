/**
*
* Title
*
*/

import styled from 'styled-components'

const Title = styled.span`
  padding-left: ${(props) => (props.docked ? '15em' : '0em')};
`

export default Title
