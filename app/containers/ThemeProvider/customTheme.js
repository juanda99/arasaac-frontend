import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { fade } from 'material-ui/utils/colorManipulator'
import { lightGreen500, lightGreen300, darkBlack, lightGreen700, white, grey100, grey500 } from 'material-ui/styles/colors'
import { THEMES, DEFAULT_THEME } from './actions'

const themes = {}
themes[THEMES.LIGHT] = {
  color: 'yellow',
  palette: {
    primary1Color: lightGreen500,
    primary2Color: lightGreen300,
    primary3Color: lightGreen700,
    accent1Color: '#81388d',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white // sidebar drawer
  }
}

themes[THEMES.DARK] = {
  color: 'red',
  palette: {
    primary1Color: white,
    primary2Color: white,
    primary3Color: white,
    accent1Color: '#81388d',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: white,
    alternateTextColor: darkBlack,
    canvasColor: darkBlack // sidebar drawer
  }
}



/* global theme */
const componentsTheme = (currentTheme) => (
  {
    tabs: {
      backgroundColor: 'white',
      textColor: fade(currentTheme.palette.textColor, 0.5),
      selectedTextColor: currentTheme.palette.textColor
    },
    menu: {
      backgroundColor: currentTheme.palette.alternateTextColor
    }
  }
)

const customTheme = (theme = DEFAULT_THEME) => {
  const currentTheme = themes[theme]
  return getMuiTheme(currentTheme, componentsTheme(currentTheme))
}


export default customTheme
