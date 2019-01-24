import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { darkWhite } from 'material-ui/styles/colors'

const BoxOptions = styled.div`
padding: 10px;
background-color: blue;
border: 1px dashed lightgrey;
width: 300px;
min-height: 120px;
position: absolute;
background-color: ${(props) => props.bgColor ? props.muiTheme.palette.primary1Color : darkWhite};
`

export default muiThemeable()(BoxOptions)
