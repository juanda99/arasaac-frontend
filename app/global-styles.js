import { injectGlobal } from "styled-components";
import { lightGreen500 } from "material-ui/styles/colors";

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100vh;
    flex: 1;
  }

  .leaftlet-popup-content-wrapper {
    width: 200px !important;
    height: 200px !important;
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

  a {text-decoration: none; color: ${lightGreen500}   }
  a:hover {color:#81388d}

  
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
`;
