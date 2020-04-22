import styled from 'styled-components'
import media from 'utils/mediaqueries'

const StyledList = styled.li`
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  margin: 10px;
  ${'' /* margin-left: calc(50% - 160px); */}
  ${media.sm} {
    width: 600px;
    margin-right: 20px;
    margin-left: 0px;
  }

`

export default StyledList
