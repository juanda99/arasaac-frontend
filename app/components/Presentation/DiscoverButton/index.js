import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import media from 'utils/mediaqueries'

const DiscoverButton = styled(RaisedButton)`
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 180px;
  margin-right: -50%;
  transform: translate(-50%, 0);
  ${media.xs} {
    bottom: -100px;
  } 
  ${media.sm} {
    bottom: 110px;
  } 
  ${media.md} {
    bottom: 160px;
  }
  ${media.lg} {   
    bottom: 180px;
  }
`;

export default muiThemeable()(DiscoverButton)