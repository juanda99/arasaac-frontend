import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";
import media from "utils/mediaqueries";

const FooterSection = styled.div`
  overflow: hidden;
  clear: both;
  background: ${(props) => props.color};
  text-align: center;
  align-items: center;
  justify-content: space-between;
  display: flex;
  ${media.md} {
    padding-left: ${(props) => (props.docked ? "16rem" : "0em")};
  }
  ${media.md} {
    padding-left: ${(props) =>
      props.docked && props.muiTheme.direction === "ltr" ? "16rem" : "0rem"};
    padding-right: ${(props) =>
      props.docked && props.muiTheme.direction === "rtl" ? "16rem" : "0rem"};
  }
  ${media.xs} {
    flex-direction: column;
  }
`;
export default muiThemeable()(FooterSection);
