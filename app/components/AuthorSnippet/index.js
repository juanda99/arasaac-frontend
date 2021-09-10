import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ReactCardFlip from 'react-card-flip'
import Facebook from 'components/SocialLogin/icons/svg/facebook'
import GitHub from 'components/SocialLogin/icons/svg/github'
import Twitter from 'components/SocialLogin/icons/svg/twitter'
import IconButton from 'material-ui/IconButton'
import StyledPaper from './StyledPaper'
import StyledList from './StyledList'
import H3 from 'components/H3'
import P from 'components/P'
import Image from 'components/PictogramSnippet/Image'
import messages from './messages'

class AuthorSnippet extends PureComponent {
  state = {
    zDepth: 1,
    isFlipped: false
  }

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
      width: 72,
      height: 72
    },
    small: {
      width: 144,
      height: 144,
      padding: 32
    }
  }

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
      isFlipped: true
    })
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
      isFlipped: false
    })
  }

  handleClick = () => this.setState({ isFlipped: !this.state.isFlipped })

  render() {
    const { author } = this.props
    return (
      <StyledList
        key={name}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div key="front">
            <StyledPaper zDepth={this.state.zDepth}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={author.imageSource}
                  alt={author.name}
                  style={{ padding: '5px', paddingTop: '35px' }}
                />
                <H3 style={this.styles.cardTitle} primary={true}>
                  {author.name}
                </H3>
              </div>
            </StyledPaper>
          </div>
          <div key="back">
            <StyledPaper zDepth={this.state.zDepth}>
              <H3 style={this.styles.cardTitle} primary={true}>
                {author.name}
              </H3>
              <H3 style={{ textAlign: 'center' }}>
                {<FormattedMessage {...messages[author.desc]} />}
              </H3>
              {/* <P style={{ textAlign: 'center', strong: true }}>
                {author.startYear} - {author.endYear}
              </P>
              {author.notes && (
                <P style={{ textAlign: 'center' }}>
                  {<FormattedMessage {...messages[author.notes]} />}
                </P>
              )}
              <P style={{ textAlign: 'center' }}>
                {<FormattedMessage {...messages.reachme} />}
              </P> */}

              {author.facebook && (
                <P style={{ textAlign: 'center' }}>
                  <a href={author.facebook} target="_blank">
                    <IconButton
                      iconStyle={this.styles.smallIcon}
                      style={this.styles.small}
                    >
                      <Facebook
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </IconButton>
                  </a>
                </P>
              )}
              {author.github && (
                <P style={{ textAlign: 'center' }}>
                  <a
                    href={author.github}
                    target="_blank"
                    style={{ margin: '75px' }}
                  >
                    <IconButton
                      iconStyle={this.styles.smallIcon}
                      style={this.styles.small}
                    >
                      <GitHub
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </IconButton>
                  </a>
                </P>
              )}
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  style={{ margin: '75px' }}
                >
                  <IconButton
                    iconStyle={this.styles.smallIcon}
                    style={this.styles.small}
                  >
                    <Twitter
                      color={this.props.muiTheme.palette.primary1Color}
                      hoverColor={this.props.muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                </a>
              )}
            </StyledPaper>
          </div>
        </ReactCardFlip>
      </StyledList>
    )
  }
}

AuthorSnippet.propTypes = {
  muiTheme: PropTypes.object,
  author: PropTypes.object.isRequired
}

export default muiThemeable()(AuthorSnippet)
