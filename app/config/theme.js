import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { fade } from 'material-ui/utils/colorManipulator'
import { lightGreen500, lightGreen300, darkBlack, lightGreen700, white, grey100, grey500 } from 'material-ui/styles/colors'

const themes = {
  DEFAULT_THEME: {
    palette: {
      primary1Color: lightGreen500,
      primary2Color: lightGreen300,
      primary3Color: lightGreen700,
      accent1Color: '#81388d',
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      alternateTextColor: white
    }
  }
}

/* global theme */
const componentsTheme = {
  tabs: {
    backgroundColor: 'white',
    textColor: fade(defaultTheme.palette.textColor, 0.5),
    selectedTextColor: defaultTheme.palette.textColor
  }
}

const customTheme = (theme) = getMuiTheme(theme, componentsTheme)


export default customTheme
