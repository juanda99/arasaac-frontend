import styled from 'styled-components'
import media from 'utils/mediaqueries'

const Item = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin:  30px;
  max-width:  100%;
  ${media.md} {
    max-width: 40%;
  }
  ${media.lg} {
    max-width: 42%;
  }
  ${media.xxl} {
    max-width: 28%;
  }
`

export default Item



// export default {
//   xs: '@media only screen and (max-width : 767px)', // 48 rem
//   sm: '@media only screen and (min-width : 768px)',
//   md: '@media only screen and (min-width : 992px)', // 62 rem
//   lg: '@media only screen and (min-width : 1200px)' // 75 rem
// }