import { green900, lightGreen500, darkWhite } from 'material-ui/styles/colors'
import { typography, lightBaseTheme } from 'material-ui/styles'

export default {
  root: {
    backgroundColor: lightGreen500,
    overflow: 'hidden'
  },
  svgLogo: {
    marginLeft: (window.innerWidth * 0.5) - 225,
    width: 300
  },
  tagline: {
    margin: '16px auto 0 auto',
    textAlign: 'center',
    maxWidth: 625
  },
  githubStyle: {
    margin: '16px 32px 0px 8px'
  },
  h1: {
    color: darkWhite,
    fontWeight: typography.fontWeightLight
  },
  h2: {
    fontSize: 20,
    lineHeight: '28px',
    paddingTop: 19,
    marginBottom: 13,
    letterSpacing: 0,
    color: darkWhite,
    fontWeight: typography.fontWeightLight
  },
  strong: {
    color: green900
  },
  taglineWhenLarge: {
    marginTop: 32
  },
  h1WhenLarge: {
    fontSize: 56
  },
  h2WhenLarge: {
    fontSize: 24,
    lineHeight: '32px',
    paddingTop: 16,
    marginBottom: 12
  }
}
