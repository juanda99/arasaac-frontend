import muiThemeable from "material-ui/styles/muiThemeable";
import styled from "styled-components";
import { darkWhite } from "material-ui/styles/colors";

const Counter = styled.p`
  color: #aaa;
  // color: ${(props) =>
    props.alternative ? darkWhite : props.muiTheme.palette.primary1Color};
  text-decoration: none;
  position: absolute;
  font-size: 1.5rem;
  right: 0px;
  bottom: 0px;
  padding: 3px;
  margin: 0px;
  border-radius: 10px 0 0 0px;
  // background: hsla(0, 0% , 100% , 0.8);
  background-color: rgba(255, 255, 255, 0.8);
  transition: opacity 0.3s ease;
`;

export default muiThemeable()(Counter);
