import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import media from 'utils/mediaqueries'
import muiThemeable from 'material-ui/styles/muiThemeable'

const StyledPaper = styled(Paper)`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  width: 100%;
  height: 430px;
  ${media.sm} {
    width: 100%;
    height: 200px;
  }
  ${media.md} {
    width: 590px;
    height: 200px;
  }

`

export default muiThemeable()(StyledPaper)
