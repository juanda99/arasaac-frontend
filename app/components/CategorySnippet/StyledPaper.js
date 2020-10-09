import styled from "styled-components";
import Paper from "material-ui/Paper";
import media from "utils/mediaqueries";

const StyledPaper = styled(Paper)`
  margin-bottom: 30px;
  width: 250px;
  height: 250px;
  ${media.xs} {
    width: inherit;
    height: auto;
    margin: 10px auto;
  }
`;

export default StyledPaper;
