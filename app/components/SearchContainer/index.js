import styled from "styled-components";
import media from "utils/mediaqueries";
import muiThemeable from "material-ui/styles/muiThemeable";

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 900px;
  ${media.sm} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  ${media.lg} {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

export default muiThemeable()(SearchContainer);
