import styled from 'styled-components'
import FullWidthSection from 'components/FullWidthSection'
import media from 'utils/mediaqueries'

const FooterSection = styled(FullWidthSection)`
  flex: none;
  ${media.md} {
    padding-left: ${(props) => (props.docked ? '16rem' : '0em')};
  }
`
export default FooterSection
