import styled from "styled-components";
import muiThemeable from "material-ui/styles/muiThemeable";

const CardActions = styled.div`
  position: absolute;
  top: 0;
  button: 0;
  width: 250px;
  height: 250px;
  opacity: 0;
  &:hover {
    opacity: 0.93;
  }
  background-color: ${(props) => props.muiTheme.palette.primary1Color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default muiThemeable()(CardActions);
