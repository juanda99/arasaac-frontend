import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { fade } from 'material-ui/utils/colorManipulator'
import {
  lightGreen500, lightGreen300, lightGreen700,
  darkBlack, white, fullBlack, fullWhite,
  pinkA100, pinkA200, pinkA400,
  grey100, grey300, grey500, grey600,
  cyan500, cyan700,
  yellowA200, yellowA400, yellowA700
} from 'material-ui/styles/colors'
import { THEME_NAMES, DEFAULT_THEME } from './actions'

const themes = {}
themes[THEME_NAMES.LIGHT] = {
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen300,
    primary3Color: lightGreen700,
    accent1Color: '#81388d',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white, // sidebar drawer
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
}

themes[THEME_NAMES.DARK] = {
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fullWhite,
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  }
}

themes[THEME_NAMES.HIGH_CONTRAST] = {
  palette: {
    primary1Color: yellowA400,
    primary2Color: yellowA200,
    primary3Color: yellowA700,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: darkBlack,
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  }
}


/* global theme */
const componentsTheme = (currentTheme) => (
  {
    tabs: {
      backgroundColor: currentTheme.palette.canvasColor,
      textColor: fade(currentTheme.palette.textColor, 0.5),
      selectedTextColor: currentTheme.palette.textColor
    },
    menu: {
      backgroundColor: currentTheme.palette.alternateTextColor
    },
    appBar: {
      color: currentTheme.palette.primary1Color,
      textColor: currentTheme.palette.alternateTextColor,
      backgroundColor: currentTheme.palette.primary1Color
    }
  }
)

const customTheme = (theme = DEFAULT_THEME) => {
  const currentTheme = themes[theme]
  return getMuiTheme(currentTheme, componentsTheme(currentTheme))
}


export default customTheme
