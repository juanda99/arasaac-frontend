import { spacing, typography } from "material-ui/styles";

export default {
  logo: {
    cursor: "pointer",
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    paddingLeft: 60, // spacing.desktopGutter,
    paddingRight: 60, //rtl
  },
  menu: {
    zIndex: 9998, // fix about us map, less than 9999 (error console screen)
  },
};
