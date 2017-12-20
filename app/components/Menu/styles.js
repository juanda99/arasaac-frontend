import { spacing, typography } from 'material-ui/styles'

export default {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    paddingLeft: 60 // spacing.desktopGutter,
  },
  menu: {
    zIndex: 10
  }
}
