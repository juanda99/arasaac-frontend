import styled from 'styled-components'
import media from 'utils/mediaqueries'

const StyledList = styled.li`
  margin: 5px;
  width: 300px;
  height: 400px;
  ${media.xs} {
    box-sizing: border-box;
    width: 95%;
    margin: 20px auto;
  }
`

export default StyledList
