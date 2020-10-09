import styled from "styled-components";
import { typography } from "material-ui/styles";
import media from "utils/mediaqueries";

const H1 = styled.h1`
  font-size: 4em;
  margin-bottom: 0.25em;
  margin-top: 0.25rem;
  font-weight: ${typography.fontWeightLight};
  ${media.lg} {
    font-size: 3em;
  }
`;

export default H1;
