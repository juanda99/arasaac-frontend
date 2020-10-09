/**
 *
 * Div
 *
 */

import styled from "styled-components";

const Div = styled.div`
  margin-top: ${(props) => (props.top ? `${props.top}rem` : "0rem")};
  margin-bottom: ${(props) => (props.bottom ? `${props.bottom}rem` : "0rem")};
  background-color: ${(props) => (props.bg ? props.bg : "")};
  color: ${(props) => (props.color ? `${props.color} !important` : "inherit")};
`;

export default Div;
