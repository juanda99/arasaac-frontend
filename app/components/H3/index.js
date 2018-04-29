/**
*
* H3
*
*/

import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import { darkWhite, darkBlack } from 'material-ui/styles/colors'
import media from 'utils/mediaqueries'

const H3 = styled.h3`
  font-size: 1.25rem;
  line-height: '1.25rem';
  font-weight: ${typography.fontWeightLight};
  color: ${(props) => props.primary ? props.muiTheme.palette.primary1Color : darkBlack};
  text-transform: ${(props) => props.ucase ? 'uppercase' : 'none'};
  ${media.lg} {
    font-size: 1.25rem;
  }
`

export default muiThemeable()(H3)
