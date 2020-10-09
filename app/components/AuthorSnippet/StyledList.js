import styled from "styled-components";
import media from "utils/mediaqueries";

const StyledList = styled.li`
  box-sizing: border-box;
  width: 320px;
  height: 430px;
  margin: 10px;
  margin-left: calc(50% - 160px);
  ${media.sm} {
    height: 430px;
    margin-right: 20px;
    margin-left: 0px;
  }
`;

export default StyledList;
