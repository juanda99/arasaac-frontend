/**
 *
 * H3
 *
 */

import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import media from 'utils/mediaqueries'

const H3 = styled.h3`
  font-size: 1.25rem;
  line-height: '1.25rem';
  font-weight: ${typography.fontWeightLight};
  color: ${(props) =>
    props.primary
      ? props.muiTheme.palette.primary1Color
      : props.muiTheme.palette.textColor}};
      
  text-transform: ${(props) => (props.ucase ? 'uppercase' : 'none')};
  ${media.lg} {
    font-size: 1.25rem;
  }
  clear: both;
`

export default muiThemeable()(H3)
