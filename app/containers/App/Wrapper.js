import styled from "styled-components";
import media from "utils/mediaqueries";
import muiThemeable from "material-ui/styles/muiThemeable";

const Wrapper = styled.div`
  background-color: ${(props) => props.muiTheme.palette.bodyColor};
  flex: 1; // otherwise, it shrinks and footer goes up
  ${media.md} {
    padding-left: ${(props) =>
      props.docked && props.muiTheme.direction === "ltr" ? "16rem" : "0rem"};
    padding-right: ${(props) =>
      props.docked && props.muiTheme.direction === "rtl" ? "16rem" : "0rem"};
  }
`;

export default muiThemeable()(Wrapper);
