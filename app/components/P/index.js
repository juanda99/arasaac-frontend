/**
 *
 * P
 *
 */

import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const P = styled.p`
  color: ${(props) =>
    props.alternative
      ? props.muiTheme.palette.alternateTextColor
      : props.muiTheme.palette.textColor};
  font-weight: ${(props) => (props.important ? 900 : 300)};
  text-decoration: none;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-right: ${(props) => props.marginRight};
  text-align: ${(props) =>
    props.justify
      ? 'justify'
      : ''};
`

export default muiThemeable()(P)
