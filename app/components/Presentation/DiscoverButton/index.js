import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";
import media from "utils/mediaqueries";

const DiscoverButton = styled(RaisedButton)`
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 200px;
  margin-right: -50%;
  transform: translate(-50%, 0);
  ${media.sm} {
    bottom: calc(40px + 150px);
  }
  ${media.md} {
    bottom: calc(30px + 150px);
  }
  ${media.lg} {
    bottom: calc(60px + 150px);
  }
`;

export default muiThemeable()(DiscoverButton);
