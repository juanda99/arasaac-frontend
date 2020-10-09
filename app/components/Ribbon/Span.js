/**
 *
 * Span
 *
 */

import styled, { css } from "styled-components";

const Span = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  ${"" /* background: #79A70A;
  background: linear-gradient(#9BC90D 0%, #79A70A 100%); */}
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  right: -21px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 100%;
    z-index: -1;
    ${"" /* border-left: 3px solid #79A70A; */}
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    ${"" /* border-top: 3px solid #79A70A; */}
  }
  &::after {
    content: "";
    position: absolute;
    right: 0px;
    top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    ${"" /* border-right: 3px solid #79A70A; */}
    border-bottom: 3px solid transparent;
    ${"" /* border-top: 3px solid #79A70A; */}
  }
  ${(props) =>
    props.type === "success" &&
    css`
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
    `}
  ${(props) =>
    props.type === "danger" &&
    css`
      background: #f44336;
      background: linear-gradient(#ff5252 0%, #f44336 100%);
      &::before {
        border-left: 3px solid #f44336;
        border-top: 3px solid #f44336;
      }
      &::after {
        border-right: 3px solid #f44336;
        border-top: 3px solid #f44336;
      }
    `}
    ${(props) =>
    props.type === "warning" &&
    css`
      color: #000;
      background: #ffeb3b;
      background: linear-gradient(#ffff00 0%, #ffeb3b 100%);
      &::before {
        border-left: 3px solid #ffeb3b;
        border-top: 3px solid #ffeb3b;
      }
      &::after {
        border-right: 3px solid #ffeb3b;
        border-top: 3px solid #ffeb3b;
      }
    `}
`;

export default Span;
