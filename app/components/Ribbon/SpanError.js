/**
 *
 * Span
 *
 */

import styled from "styled-components";
import Span from "./Span";

const SpanError = styled.Span`
  background: #79a70a;
  background: linear-gradient(#9bc90d 0%, #79a70a 100%);
  &::before {
    border-left: 3px solid #79a70a;
    border-top: 3px solid #79a70a;
  }
  &::after {
    border-right: 3px solid #79a70a;
    border-top: 3px solid #79a70a;
  }
`;

export default SpanError;
