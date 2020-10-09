import styled from "styled-components";
// import muiThemeable from 'material-ui/styles/muiThemeable'

const FullWidthSection = styled.div`
  overflow: "hidden";
  clear: both;
  padding: 0em;
  background: ${(props) => props.color};
  text-align: center;
  width: 100%;
  margin-bottom: -7px;
  border-color: white;
  border-style: solid;
  border-width: 0px;
  border-top-width: 2px;
  // border-bottom-width: 2px;
`;
// export default muiThemeable()(FullWidthSection)
export default FullWidthSection;
