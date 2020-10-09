import muiThemeable from "material-ui/styles/muiThemeable";
import styled from "styled-components";
import Dropzone from "react-dropzone";

const CustomDropzone = styled(Dropzone)`
  color: ${(props) => props.muiTheme.palette.accent1Color};
  width: 100%;
  max-width: 800px;
  min-height: 150px;
  border-style: dashed;
  border-width: 2px;
  border-color: ${(props) => props.muiTheme.palette.primary1Color};
  margin-top: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

export default muiThemeable()(CustomDropzone);
