import styled from "styled-components";
import media from "utils/mediaqueries";

const Img = styled.img`
  float: ${(props) => (props.left ? "left" : "right")};
  ${media.xs} {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ${media.sm} {
    width: 250px;
    padding: 20px;
  }
`;
export default Img;
