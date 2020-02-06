import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import media from 'utils/mediaqueries'
import muiThemeable from 'material-ui/styles/muiThemeable'

const StyledPaper = styled(Paper)`
  margin-bottom: 30px;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isDragging ? 0.25 : 1)};
  ${media.xs} {
    width: inherit;
    height: auto;
    margin: 10px auto;
  }
`

export default muiThemeable()(StyledPaper)