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
  ${media.lg} {
    padding-left: ${(props) => (props.docked ? '26em' : '0em')};
  }
`
export default FooterSection
