import styled from 'styled-components'
import media from 'utils/mediaqueries'

const FooterSection = styled.div`
  overflow: hidden;
  clear: both;
  background: ${(props) => props.color};
  text-align: center;
  align-items: center;
  justify-content: space-around;
  flex: none;
  display: flex;
  ${media.md} {
    padding-left: ${(props) => (props.docked ? '16rem' : '0em')};
  }
  ${media.xs} {
    flex-direction: column;
  }
`
export default FooterSection
