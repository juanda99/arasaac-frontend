import styled from "styled-components";
import Paper from "material-ui/Paper";
import media from "utils/mediaqueries";
import muiThemeable from "material-ui/styles/muiThemeable";

const StyledPaper = styled(Paper)`
  margin-bottom: 30px;
  width: 250px;
  height: 250px;
  opacity: ${(props) => (props.isDragging ? 0.25 : 1)};
  border: ${(props) =>
    props.canDrop ? `2px dashed ${props.muiTheme.palette.accent1Color}` : ""};
  border: ${(props) =>
    props.isOver ? `4px dashed ${props.muiTheme.palette.accent1Color}` : ""};
  ${media.xs} {
    width: inherit;
    height: auto;
    margin: 10px auto;
  }
`;

export default muiThemeable()(StyledPaper);
