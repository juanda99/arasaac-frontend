/**
*
* H1
*
*/

import { darkWhite } from 'material-ui/styles/colors'

import styled from 'styled-components'
import { typography } from 'material-ui/styles'
import media from 'utils/mediaqueries'

const H1 = styled.h1`
  // color: ${darkWhite};
  font-size: 5.6em;
  margin-bottom: 0.25em;
  font-weight: ${typography.fontWeightLight};
  ${media.lg} {
    font-size: 5.6em;
  }
`

export default H1
