import muiThemeable from "material-ui/styles/muiThemeable";
import styled from "styled-components";

const SoundButton = styled.div`
  display: flex;
  color: ${(props) => props.muiTheme.palette.primary1Color};
  align-items: center;
  justify-content: center;
  border: ${(props) => `0px solid ${props.muiTheme.palette.primary1Color}`};
  &:hover {
    background-color: ${(props) => props.muiTheme.palette.accent3Color};
  }
  width: 50px;
  padding: 15px;
`;

export default muiThemeable()(SoundButton);
