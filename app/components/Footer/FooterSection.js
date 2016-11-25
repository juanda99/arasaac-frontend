import styled from 'styled-components'
import FullWidthSection from 'components/FullWidthSection'
import media from 'utils/mediaqueries'

const FooterSection = styled(FullWidthSection)`
  position: absolute;
  height: 22em;
  bottom: 0;
  ${media.lg} {
    padding-left: ${(props) => (props.docked ? '26em' : '0em')};
  }
  ${media.md} {
    height: 15em;
  }
`
export default FooterSection
