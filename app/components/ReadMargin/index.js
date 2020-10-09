import styled from "styled-components";
import media from "utils/mediaqueries";
// just for mobile in places where View is supposed to be all width for mobile view (ex PictogramView)
const ReadMargin = styled.div`
  ${media.xs} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default ReadMargin;
