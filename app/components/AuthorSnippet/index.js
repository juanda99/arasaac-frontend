import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import CardActions from 'components/PictogramSnippet/CardActions'
import StyledPaper from './StyledPaper'
import StyledList from './StyledList'
import H3 from 'components/H3'
import Image from 'components/PictogramSnippet/Image'


class AuthorSnippet extends PureComponent {
  state = {
    zDepth: 1
  };

  styles = {
    icon: {
      width: 48,
      height: 48
    },
    leftIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: 'absolute',
      top: '0',
      left: '0'
    },
    rightIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: 'absolute',
      opacity: 100,
      top: '0',
      right: '0'
    },
    cardTitle: {
      textAlign: 'center',
      fontSize: '1rem',
      textTransform: 'uppercase',
      color: this.props.muiTheme.appBar.textColor,
      backgroundColor: this.props.muiTheme.palette.primary1Color,
      fontWeight: '600',
      margin: 0,
      marginTop: 10,
      padding: 10,
      paddingTop: 20,
      height: 70
    }
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3
    })
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1
    })
  };

  render() {
    const {
      imageSource,
      name,
      desc
    } = this.props
    return (
      <StyledList
        key={name}
        className='image-element-class'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth}>
          <div style={{ position: 'relative' }}>
            <Image
              src={imageSource}
              alt={name}
            />
            <H3 style={this.styles.cardTitle} primary={true}>{name}</H3>
          </div>
        </StyledPaper>
      </StyledList>
    )
  }
}


AuthorSnippet.propTypes = {
  muiTheme: PropTypes.object,
  imageSource: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
}

export default muiThemeable()(AuthorSnippet)
