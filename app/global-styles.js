import { injectGlobal } from 'styled-components'
import media from 'utils/mediaqueries'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    /* Margin bottom by footer height */
    margin-bottom: 20em;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 62.5%;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }
  button, html [type="button"],[type="reset"], [type="submit"] {
    -webkit-appearance: none;
  }  


  ${media.md} {
    body {
      margin-bottom: 16em;
    }
  }
`
