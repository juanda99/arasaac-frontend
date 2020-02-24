import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import media from 'utils/mediaqueries'

const DiscoverButton = styled(RaisedButton)`
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 20px;
  margin-right: -50%;
  transform: translate(-50%, 0);
  ${media.sm} {
    bottom: 40px;
  } 
  ${media.md} {
    bottom: 50px;
  }
  ${media.lg} {   
    bottom: 60px;
  }
`;

export default muiThemeable()(DiscoverButton)