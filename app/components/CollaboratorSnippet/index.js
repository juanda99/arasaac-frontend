import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ReactCardFlip from 'react-card-flip'
import Facebook from 'components/SocialLogin/icons/svg/facebook'
import GitHub from 'components/SocialLogin/icons/svg/github'
import YouTube from 'components/SocialLogin/icons/svg/youtube'
import { IMAGES_URL } from 'services/config'
import { DEFAULT_PROFILE_PICTURE } from 'utils'
import WebIcon from 'material-ui/svg-icons/social/public'
import Twitter from 'components/SocialLogin/icons/svg/twitter'
import Instagram from 'components/SocialLogin/icons/svg/instagram'
import IconButton from 'material-ui/IconButton'
import StyledPaper from './StyledPaper'
import StyledList from './StyledList'
import H3 from 'components/H3'
import P from 'components/P'
import Image from 'components/PictogramSnippet/Image'


class CollaboratorSnippet extends PureComponent {
  state = {
    zDepth: 1,
    isFlipped: false
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
      padding: 10,
      paddingTop: 20,
      height: 70
    },
    smallIcon: {
      width: 36,
      height: 36,
    },
    small: {
      width: 72,
      height: 72,
      padding: 32,
    }
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
      isFlipped: true
    })
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
      isFlipped: false
    })
  };

  handleClick = () => this.setState({ isFlipped: !this.state.isFlipped })

  render() {
    const { collaborator } = this.props
    const collaboratorImage = collaborator.image ?
      `${IMAGES_URL}/collaborators/${collaborator.image}`
      : DEFAULT_PROFILE_PICTURE
    return (
      <StyledList
        key={name}
        className='image-element-class'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div key='front'>
            <StyledPaper zDepth={this.state.zDepth}>

              <div style={{ position: 'relative' }} >
                <Image
                  src={collaboratorImage}
                  alt={collaborator.name}
                  style={{ padding: '5px' }}
                />
                <H3 style={this.styles.cardTitle} primary={true}>{collaborator.name}</H3>
              </div>
            </StyledPaper >
          </div>
          <div key='back'>
            <StyledPaper zDepth={this.state.zDepth}>
              <H3 style={this.styles.cardTitle} primary={true}>{collaborator.name}</H3>
              {collaborator.desc && (
                <P style={{ textAlign: 'center' }}>{collaborator.desc}</P>
              )}
              {collaborator.url && (
                <a href={collaborator.url} target='_blank' style={{ margin: '110px' }}>
                  <IconButton
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                  >
                    <WebIcon color={this.props.muiTheme.palette.primary1Color} hoverColor={this.props.muiTheme.palette.accent1Color} />
                  </IconButton>
                </a>
              )}
              {collaborator.youtube && (
                <a href={`https://youtube.com/${collaborator.youtube}`} target='_blank' style={{ margin: '110px' }}>
                  <IconButton
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                  >
                    <YouTube color={this.props.muiTheme.palette.primary1Color} hoverColor={this.props.muiTheme.palette.accent1Color} />
                  </IconButton>
                </a>
              )}
              {collaborator.facebook && (
                <a href={`https://www.facebook.com/${collaborator.facebook}`} target='_blank' style={{ margin: '110px' }}>
                  <IconButton
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                  >
                    <Facebook color={this.props.muiTheme.palette.primary1Color} hoverColor={this.props.muiTheme.palette.accent1Color} />
                  </IconButton>
                </a>
              )}
              {collaborator.instagram && (
                <a href={`https://www.instagram.com/${collaborator.instagram}`} target='_blank' style={{ margin: '110px' }}>
                  <IconButton
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                  >
                    <Instagram color={this.props.muiTheme.palette.primary1Color} hoverColor={this.props.muiTheme.palette.accent1Color} />
                  </IconButton>
                </a>
              )}
              {collaborator.github && (
                <P style={{ textAlign: 'center' }}>
                  <a href={`https://github.com/${collaborator.github}`} target='_blank' style={{ margin: '110px' }}>
                    <IconButton
                      iconStyle={this.styles.smallIcon}
                      style={this.styles.small}
                    >
                      <GitHub color={this.props.muiTheme.palette.primary1Color} hoverColor={this.props.muiTheme.palette.accent1Color} />
                    </IconButton>
                  </a>
                </P>
              )}
              {collaborator.twitter && (
                <a href={`https://twitter.com/${collaborator.twitter}`} target='_blank' style={{ margin: '110px' }}>
                  <IconButton
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                  >
                    <Twitter color={this.props.muiTheme.palette.primary1Color} hoverColor={this.props.muiTheme.palette.accent1Color} />
                  </IconButton>
                </a>
              )}

            </StyledPaper >
          </div>
        </ReactCardFlip>
      </StyledList >
    )
  }
}


CollaboratorSnippet.propTypes = {
  muiTheme: PropTypes.object,
  collaborator: PropTypes.object.isRequired,
}

export default muiThemeable()(CollaboratorSnippet)
