/**
 *
 * A
 *
 */

import muiThemeable from "material-ui/styles/muiThemeable";
import styled from "styled-components";
import { darkWhite } from "material-ui/styles/colors";

const A = styled.a`
  color: ${(props) =>
    props.alternative ? darkWhite : props.muiTheme.palette.primary1Color};
  text-decoration: none;
  cursor: pointer;
`;

export default muiThemeable()(A);
