/**
 *
 * H1Section
 *
 */

import muiThemeable from "material-ui/styles/muiThemeable";

import styled from "styled-components";
import media from "utils/mediaqueries";

const H1Section = styled.h1`
  color: ${(props) => props.muiTheme.palette.primary1Color};
  font-size: 2em;
  margin-bottom: 0.25em;
  ${media.lg} {
    font-size: 2em;
  }
`;

export default muiThemeable()(H1Section);
