import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import media from 'utils/mediaqueries'

const WarningBox = styled.div`
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    border-width: 2px;
    border-style: dashed;
    border-color: ${(props) => props.muiTheme.palette.primary1Color};
    position: relative;
    align-items: center;
  ${media.xs} {
    flex-direction: column;
  }
  ${media.sm} {
    flex-direction: row;
    max-width: 950px;
  }
  
`

export default muiThemeable()(WarningBox)