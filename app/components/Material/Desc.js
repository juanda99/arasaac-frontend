import styled from "styled-components";
import media from "utils/mediaqueries";

const Desc = styled.div`
  flex-grow: 3;
  width: 500px;
  text-align: justify;
  ${media.md} {
    padding: 2rem;
  }
`;
export default Desc;
