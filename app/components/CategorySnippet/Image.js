import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { darkWhite } from 'material-ui/styles/colors'

const Image = styled.img`
  background-color: white;
  /* color: ${(props) => props.alternative ? darkWhite : props.muiTheme.palette.primary1Color};
  text-decoration: none;
  */
 width: 100%;
 height: auto;
`

export default muiThemeable()(Image)
