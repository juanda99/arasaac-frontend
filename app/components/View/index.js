import styled from "styled-components";
import media from "utils/mediaqueries";
import muiThemeable from "material-ui/styles/muiThemeable";

const View = styled.div`
  background-color: ${(props) => props.muiTheme.palette.bodyColor};
  padding-left: ${(props) => (props.readMargin ? "1rem" : "0rem")};
  padding-right: ${(props) => (props.readMargin ? "1rem" : "0rem")};
  padding-top: ${(props) => (props.top ? `${props.top}rem` : "0rem")};
  ${"" /* 0 for SearchField in materials and pictograms */}
  padding-bottom: ${(props) => (props.bottom ? `${props.bottom}rem` : "0rem")};

  ${media.sm} {
    padding-left: ${(props) => (props.left ? "2rem" : "0.5rem")};
    padding-right: ${(props) => (props.right ? "2rem" : "0.5rem")};
    padding-top: ${(props) => (props.top ? `${props.top}rem` : "4rem")};
    padding-bottom: ${(props) =>
      props.bottom ? `${props.bottom}rem` : "4rem"};
  }

  ${media.lg} {
    padding-left: ${(props) => (props.left ? "4rem" : "0.5rem")};
    padding-right: ${(props) => (props.right ? "4rem" : "0.5rem")};
    padding-top: ${(props) => (props.top ? `${props.top}rem` : "3rem")};
    padding-bottom: ${(props) =>
      props.bottom ? `${props.bottom}rem` : "4rem"};
  }
`;

export default muiThemeable()(View);
