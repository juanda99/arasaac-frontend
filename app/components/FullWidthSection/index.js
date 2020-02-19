import styled from 'styled-components'
import { url } from 'redux-form-validators'
// import muiThemeable from 'material-ui/styles/muiThemeable'

const FullWidthSection = styled.div`
  overflow: 'hidden';
  clear:both;
  padding: ${(props) =>
    props.noPadding ? '0em' : '2em'};
  padding-bottom: ${(props) =>
    props.noPadding ? '0em' : '6em'};
  background: ${(props) => props.color};
  text-align: center;
  width: 100%;
  background-image: ${(props) =>
    props.bgImage ? url(bgImage) : ''};
`
// export default muiThemeable()(FullWidthSection)
export default FullWidthSection
