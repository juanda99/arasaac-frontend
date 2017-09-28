/**
*
* H2
*
*/

import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import { darkWhite, lightGreen500 } from 'material-ui/styles/colors'
import media from 'utils/mediaqueries'

const H2 = styled.h2`
  font-size: 2.4em;
  margin-bottom: 0.25em;
  line-height: '2.8em';
  font-weight: ${typography.fontWeightLight};
  color: ${props => props.primary ? lightGreen500 : darkWhite};
  text-transform: ${props => props.ucase ? 'uppercase' : 'none'};
  ${media.lg} {
    font-size: 2.4em;
  }
`

export default H2
