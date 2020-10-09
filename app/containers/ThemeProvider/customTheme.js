import getMuiTheme from "material-ui/styles/getMuiTheme";
import { fade } from "material-ui/utils/colorManipulator";
import {
  lightGreen500,
  lightGreen300,
  lightGreen900,
  green900,
  darkBlack,
  white,
  fullBlack,
  fullWhite,
  pinkA100,
  pinkA200,
  grey100,
  grey200,
  grey300,
  grey500,
  grey800,
  grey900,
  cyan500,
} from "material-ui/styles/colors";
import { THEME_NAMES, DEFAULT_THEME } from "./actions";

const themes = {};
themes[THEME_NAMES.LIGHT] = {
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen300,
    primary3Color: lightGreen900, // used by LinearProgress backendColor
    accent1Color: grey800,
    accent2Color: grey200,
    accent3Color: grey500,
    footerColor: grey800,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white, // sidebar drawer
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    bodyColor: fullWhite,
    logoColor: fullWhite,
  },
};

themes[THEME_NAMES.DARK] = {
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen300,
    primary3Color: lightGreen900,
    accent1Color: grey200, // used by footer
    accent2Color: grey800,
    accent3Color: pinkA100,
    footerColor: "#333333",
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: "#303030",
    canvasColor: grey900,
    borderColor: fullWhite, // divider
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
    shadowColor: fullWhite,
    bodyColor: grey800,
    logoColor: fullBlack,
  },
};

// logoColor for ARASAAC text should be black if high contrast

themes[THEME_NAMES.HIGH_CONTRAST] = {
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen300,
    primary3Color: lightGreen900,
    accent1Color: grey800,
    accent2Color: grey100,
    accent3Color: grey500,
    footerColor: grey800,
    textColor: fullBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: fullWhite,
    canvasColor: white, // sidebar drawer
    borderColor: fullBlack, // divider
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    bodyColor: fullWhite,
    logoColor: fullBlack,
  },
};

/* global theme */

const commonComponentsTheme = (currentTheme) => ({
  tabs: {
    backgroundColor: currentTheme.palette.canvasColor,
    textColor: fade(currentTheme.palette.textColor, 0.5),
    selectedTextColor: currentTheme.palette.textColor,
  } /* ,
    menu: {
      backgroundColor: currentTheme.palette.alternateTextColor
    },
    appBar: {
      color: currentTheme.palette.primary1Color,
      textColor: currentTheme.palette.alternateTextColor,
      backgroundColor: currentTheme.palette.primary1Color
    },
    avatar: {
      color: currentTheme.palette.canvasColor,
      backgroundColor: emphasize(currentTheme.palette.canvasColor, 0.24)
    },
    chip: {
      backgroundColor: emphasize(currentTheme.palette.canvasColor, 0.12),
      deleteIconColor: fade(currentTheme.palette.textColor, 0.26),
      textColor: fade(currentTheme.palette.textColor, 0.87),
      fontSize: 14,
      fontWeight: typography.fontWeightNormal,
      shadow: `0 1px 6px ${fade(currentTheme.palette.shadowColor, 0.12)},
        0 1px 4px ${fade(currentTheme.palette.shadowColor, 0.12)}`
    }*/,
});
const componentsTheme = {};
componentsTheme[THEME_NAMES.LIGHT] = (
  currentTheme // eslint-disable-line no-unused-vars
) => ({
  optionBox: {
    backgroundColor: grey100,
  },
});
componentsTheme[THEME_NAMES.DARK] = (
  currentTheme // eslint-disable-line no-unused-vars
) => ({
  listItem: {
    leftIconColor: "white",
    rightIconColor: "white",
  },
  dropDownMenu: {
    canvasColor: "white",
    backgroundColor: "white",
  },
  menu: {
    backgroundColor: "white",
    containerBackgroundColor: "white",
  },
  optionBox: {
    backgroundColor: grey900,
  },
});
componentsTheme[THEME_NAMES.HIGH_CONTRAST] = (
  currentTheme // eslint-disable-line no-unused-vars
) => ({
  appBar: {
    textColor: "black",
  },
  optionBox: {
    backgroundColor: grey900,
  },
});

const customComponentsTheme = (theme, currentTheme) => ({
  ...commonComponentsTheme(currentTheme),
  ...(componentsTheme[theme](currentTheme) || {}),
});

const customTheme = (theme = DEFAULT_THEME, direction) => {
  const currentTheme = themes[theme];
  currentTheme.direction = direction;
  return getMuiTheme(currentTheme, customComponentsTheme(theme, currentTheme));
};

export default customTheme;
