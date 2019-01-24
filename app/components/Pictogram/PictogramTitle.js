import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'

const PictogramTitle = styled.div`
  background-color: ${(props) => props.muiTheme.optionBox.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export default muiThemeable()(PictogramTitle)
