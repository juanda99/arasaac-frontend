import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100vh;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #font-picker {
    width: 100%;
  }

  p, input, label {
    font-size: 1rem
  }
  span {
    font-size: inherit
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {text-decoration: none}

  
  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }
  button, html [type="button"],[type="reset"], [type="submit"] {
    -webkit-appearance: none;
  }
  /*remove x in input types*/
  ::-ms-clear {
    display: none;
  }
`
