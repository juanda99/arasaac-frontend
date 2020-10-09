import styled from "styled-components";
import media from "utils/mediaqueries";

const FormatCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${media.sm} {
    flex-direction: row;
  }
`;
export default FormatCard;
