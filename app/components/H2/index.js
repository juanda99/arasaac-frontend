/**
 *
 * H2
 *
 */

import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import { darkWhite } from 'material-ui/styles/colors'
import media from 'utils/mediaqueries'

const H2 = styled.h2`
  font-size: 2.4em;
  margin-bottom: ${(props) => (props.noMargin ? 0 : '0.25em')};
  margin-top: ${(props) => (props.noMargin ? 0 : '')};
  line-height: '2.8em';
  font-weight: 800;
  font-weight: ${typography.fontWeightLight};
  color: ${(props) =>
    props.primary ? props.muiTheme.palette.primary1Color : darkWhite};
  backgroundcolor: ${(props) =>
    props.bgColor ? props.muiTheme.palette.primary1Color : darkWhite};
  text-transform: ${(props) => (props.ucase ? 'uppercase' : 'none')};
  ${media.lg} {
    font-size: 2.4em;
  }
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`

export default muiThemeable()(H2)
