import styled from 'styled-components'
import media from 'utils/mediaqueries'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Wrapper = styled.div`
  background-color: ${(props) => props.muiTheme.palette.bodyColor};
  flex: 1;
  ${media.md} {
    padding-left: ${(props) => (props.docked ? '16rem' : '0rem')};
  };
`

export default muiThemeable()(Wrapper)
