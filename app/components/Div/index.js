/**
*
* Div
*
*/

import styled from 'styled-components'

const Div = styled.div`
  margin-top: ${(props) => props.top ? `${props.top}rem` : '0rem'};
  margin-bottom: ${(props) => props.bottom ? `${props.bottom}rem` : '0rem'};
`

export default Div
