import styled from "styled-components";
import media from "utils/mediaqueries";

const StyledList = styled.li`
  margin: 5px;
  width: 250px;
  height: 250px;
  ${media.xs} {
    box-sizing: border-box;
    width: 95%;
    height: auto;
    margin: 20px auto;
  }
`;

export default StyledList;
