import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import media from 'utils/mediaqueries'
import muiThemeable from 'material-ui/styles/muiThemeable'

const StyledPaper = styled(Paper)`
  box-sizing: border-box;
  display: flex;
  margin: 10px;
  height: 200px;
  ${'' /* margin-left: calc(50% - 160px); */}

  ${media.sm} {
    margin-left: 0px;
    margin-right: 10px;
  }

`

export default muiThemeable()(StyledPaper)
