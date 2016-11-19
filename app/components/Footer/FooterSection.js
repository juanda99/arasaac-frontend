import styled from 'styled-components'
import FullWidthSection from 'components/FullWidthSection'
import media from 'utils/mediaqueries'

const FooterSection = styled(FullWidthSection)`
  position: absolute;
  height: 20em;
  bottom: 0;
    ${media.md} {
      height: 16em;
  }
`
export default FooterSection
