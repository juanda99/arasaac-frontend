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
    margin-bottom: 22em;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 62.5%;
  }

  p, input, label {
    font-size: 1rem
  }

  ul {
    list-style-type: none
  }

  
  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }
  button, html [type="button"],[type="reset"], [type="submit"] {
    -webkit-appearance: none;
  }  


  ${media.md} {
    body {
      margin-bottom: 15em;
    }
  }
  svg {
    /* for social icons, sanitize.css put it as currentColor */
    fill: white !important;
  }
`
