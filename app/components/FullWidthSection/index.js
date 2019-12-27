import styled from 'styled-components'
// import muiThemeable from 'material-ui/styles/muiThemeable'

const FullWidthSection = styled.div`
  overflow: 'hidden';
  clear:both;
  padding: 2em;
  padding-bottom: 6em;
  background: ${(props) => props.color};
  text-align: center;
  width: 100%;
`
// export default muiThemeable()(FullWidthSection)
export default FullWidthSection
