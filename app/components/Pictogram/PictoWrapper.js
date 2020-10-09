import styled from "styled-components";
import media from "utils/mediaqueries";

const PictoWrapper = styled.div`
  max-width: 500px;
  margin-right: 20px;
  ${media.md} {
    margin-right: 60px;
  }
`;

export default PictoWrapper;
