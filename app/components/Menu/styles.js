import { spacing, typography } from 'material-ui/styles'
import { lightGreen500 } from 'material-ui/styles/colors'

export default {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: lightGreen500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  },
  menu: {
    zIndex: 10
  }
}
