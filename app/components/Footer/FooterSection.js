import styled from 'styled-components'
import media from 'utils/mediaqueries'

const FooterSection = styled.div`
  overflow: hidden;
  clear: both;
  background: ${(props) => props.color};
  text-align: center;
  flex: none;
  padding: 0em;
  ${media.md} {
    padding-left: ${(props) => (props.docked ? '16rem' : '0em')};
  }
`
export default FooterSection
