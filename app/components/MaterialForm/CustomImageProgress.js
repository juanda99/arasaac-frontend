import muiThemeable from "material-ui/styles/muiThemeable";
import styled from "styled-components";
import CircularProgress from "material-ui/CircularProgress";

const CustomImageProgress = styled(CircularProgress)`
  color: ${(props) => props.muiTheme.palette.accent1Color};
  position: absolute;
  left: -50%;
`;

export default muiThemeable()(CustomImageProgress);
