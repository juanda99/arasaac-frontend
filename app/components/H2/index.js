/**
*
* H2
*
*/

import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import { darkWhite } from 'material-ui/styles/colors'
import media from 'utils/mediaqueries'

const H2 = styled.h2`
  color: ${darkWhite};
  font-size: 1em;
  margin-bottom: 0.25em;
  line-height: '28px';
  font-weight: ${typography.fontWeightLight};
  ${media.lg} {
    font-size: 2em;
  }
`

export default H2
