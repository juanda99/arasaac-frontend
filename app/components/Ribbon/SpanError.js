/**
*
* Span
*
*/


import styled from 'styled-components'
import Span from './Span'


const SpanError = styled.Span`
  background: #79A70A;
  background: linear-gradient(#9BC90D 0%, #79A70A 100%);
  &::before{
    border-left: 3px solid #79A70A;
    border-top: 3px solid #79A70A;
  }
  &::after {
    border-right: 3px solid #79A70A;
    border-top: 3px solid #79A70A;
  }
`

export default SpanError
