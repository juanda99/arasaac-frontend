/**
*
* H1Section
*
*/

import theme from 'material-ui/styles/baseThemes/lightBaseTheme'

import styled from 'styled-components'
import media from 'utils/mediaqueries'


const H1Section = styled.h1`
  color: ${theme.palette.primary1Color};
  font-size: 2em;
  margin-bottom: 0.25em;
  ${media.lg} {
    font-size: 2em;
  }
`

export default H1Section
