import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";
import media from "utils/mediaqueries";

const NoMobileButton = styled(RaisedButton)`
  ${media.xs} {
    display: none !important;
  }
`;

export default NoMobileButton;
