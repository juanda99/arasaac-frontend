import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import media from 'utils/mediaqueries'
import muiThemeable from 'material-ui/styles/muiThemeable'

const StyledPaper = styled(Paper)`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  width: 100%;
  height: 400px;
  ${media.sm} {
    margin-left: 0px;
    margin-right: 10px;
    width: 600px;
    height: 200px;
  }

`

export default muiThemeable()(StyledPaper)
