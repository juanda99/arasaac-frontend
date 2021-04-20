import muiThemeable from 'material-ui/styles/muiThemeable'

import styled from 'styled-components'
import media from 'utils/mediaqueries'

const FilterWrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  ${media.md} {
    flex-wrap: wrap;
    align-items: baseline;
    flex-direction: row;
    justify-content: center;
  }
`

export default muiThemeable()(FilterWrapper)
