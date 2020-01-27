import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import media from 'utils/mediaqueries'
import muiThemeable from 'material-ui/styles/muiThemeable'

const StyledPaper = styled(Paper)`
  margin-bottom: 30px;
  width: 300px;
  height: 400px;
`

export default muiThemeable()(StyledPaper)
