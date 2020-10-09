import styled from "styled-components";
import Paper from "material-ui/Paper";
import media from "utils/mediaqueries";
import muiThemeable from "material-ui/styles/muiThemeable";

const StyledPaper = styled(Paper)`
  box-sizing: border-box;
  width: 320px;
  margin: 10px;
  height: 420px;
  margin-left: calc(50% - 160px);

  ${media.sm} {
    height: 420px;
    margin-left: 0px;
    margin-right: 10px;
  }
`;

export default muiThemeable()(StyledPaper);
