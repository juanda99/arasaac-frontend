import styled from "styled-components";
import { url } from "redux-form-validators";
// import muiThemeable from 'material-ui/styles/muiThemeable'

const FullWidthSection = styled.div`
  overflow: hidden;
  clear: both;
  background: ${(props) => props.color};
  text-align: center;
  width: 100%;
  padding-bottom: 30px;
  padding-top: 30px;
`;
// export default muiThemeable()(FullWidthSection)
export default FullWidthSection;
