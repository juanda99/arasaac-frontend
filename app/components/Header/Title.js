/**
 *
 * Title
 *
 */

import styled from "styled-components";

const Title = styled.span`
  padding-left: ${(props) => (props.docked ? "12em" : "0em")};
  ${"" /* for rtl: */}
  padding-right: ${(props) => (props.docked ? "12em" : "0em")};
`;

export default Title;
