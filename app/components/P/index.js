/**
*
* P
*
*/

import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const P = styled.p`
  color: ${(props) => props.alternative ? props.muiTheme.palette.alternateTextColor : props.muiTheme.palette.textColor};
  text-decoration: none;
`

export default muiThemeable()(P)
