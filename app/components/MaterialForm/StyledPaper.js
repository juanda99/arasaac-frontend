import styled from "styled-components";
import Paper from "material-ui/Paper";
import media from "utils/mediaqueries";
import muiThemeable from "material-ui/styles/muiThemeable";

const StyledPaper = styled(Paper)`
  width: 200px;
  min-height: 130px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: auto;
  ${media.xs} {
    width: inherit;
    height: auto;
    // margin: 10px auto;
  }
`;

export default muiThemeable()(StyledPaper);
