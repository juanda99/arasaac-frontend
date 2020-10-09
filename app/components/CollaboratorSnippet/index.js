import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import Chip from "material-ui/Chip";
import Facebook from "components/SocialLogin/icons/svg/facebook";
import GitHub from "components/SocialLogin/icons/svg/github";
import YouTube from "components/SocialLogin/icons/svg/youtube";
import { IMAGES_URL } from "services/config";
import { DEFAULT_PROFILE_PICTURE } from "utils";
import WebIcon from "material-ui/svg-icons/social/public";
import Twitter from "components/SocialLogin/icons/svg/twitter";
import Linkedin from "components/SocialLogin/icons/svg/linkedin";
import Instagram from "components/SocialLogin/icons/svg/instagram";
import StyledPaper from "./StyledPaper";
import H3 from "components/H3";
import P from "components/P";
import Image from "components/PictogramSnippet/Image";
import langMessages from "components/LanguageSelector/messages";
import FormatCard from "./FormatCard";
// import liWrapper from './liWrapper'
import messages from "./messages";

class CollaboratorSnippet extends PureComponent {
  state = {
    zDepth: 1,
    isFlipped: false,
  };

  styles = {
    icon: {
      width: 48,
      height: 48,
    },
    cardTitle: {
      textAlign: "center",
      fontSize: "1.1 rem",
      textTransform: "uppercase",
      marginTop: 10,
      marginBottom: 0,
    },
    icon: {
      width: 40,
      height: 40,
    },
    a: {
      margin: 10,
      marginTop: 0,
    },
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
      isFlipped: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
      isFlipped: false,
    });
  };

  handleClick = () => this.setState({ isFlipped: !this.state.isFlipped });

  render() {
    const { collaborator } = this.props;
    const collaboratorImage = collaborator.image
      ? `${IMAGES_URL}/collaborators/${collaborator.image}`
      : DEFAULT_PROFILE_PICTURE;
    return (
      <li
        key={name}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <StyledPaper zDepth={this.state.zDepth}>
          <FormatCard>
            <div style={{ flexGrow: 1, margin: "0 auto" }}>
              <Image
                src={collaboratorImage}
                alt={collaborator.name}
                style={{ padding: "5px", width: "200px", height: "200px" }}
              />
            </div>

            <div
              style={{
                paddingRight: 5,
                paddingTop: 5,
                display: "flex",
                flexWrap: "wrap",
                flexGrow: 4,
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <H3 style={this.styles.cardTitle} primary={true}>
                {collaborator.name}
              </H3>
              <div style={{ margin: "0 auto" }}>
                {collaborator.languages.map((language) => (
                  <Chip key={`${collaborator.name}-${language}`}>
                    <FormattedMessage {...langMessages[language]} />
                  </Chip>
                ))}
              </div>

              <div>
                {collaborator.desc && (
                  <P style={{ textAlign: "center" }}>
                    {collaborator.desc}
                    &nbsp;
                    {collaborator.country && (
                      <FormattedMessage {...messages[collaborator.country]} />
                    )}
                  </P>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {collaborator.url && (
                    <a
                      href={collaborator.url}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <WebIcon
                        style={this.styles.icon}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                  {collaborator.youtube && (
                    <a
                      href={`https://youtube.com/${collaborator.youtube}`}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <YouTube
                        style={this.styles.icon}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                  {collaborator.facebook && (
                    <a
                      href={`https://www.facebook.com/${collaborator.facebook}`}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <Facebook
                        style={{ width: 31, height: 31, marginTop: 4 }}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                  {collaborator.instagram && (
                    <a
                      href={`https://www.instagram.com/${collaborator.instagram}`}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <Instagram
                        style={this.styles.icon}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                  {collaborator.github && (
                    <a
                      href={`https://github.com/${collaborator.github}`}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <GitHub
                        style={{ width: 33, height: 33, marginTop: 2 }}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                  {collaborator.twitter && (
                    <a
                      href={`https://twitter.com/${collaborator.twitter}`}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <Twitter
                        style={this.styles.icon}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                  {collaborator.linkedIn && (
                    <a
                      href={`https://www.linkedin.com/in/${collaborator.linkedIn}`}
                      target="_blank"
                      style={this.styles.a}
                    >
                      <Linkedin
                        style={this.styles.icon}
                        color={this.props.muiTheme.palette.primary1Color}
                        hoverColor={this.props.muiTheme.palette.accent1Color}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FormatCard>
        </StyledPaper>
      </li>
    );
  }
}

CollaboratorSnippet.propTypes = {
  muiTheme: PropTypes.object,
  collaborator: PropTypes.object.isRequired,
};

export default muiThemeable()(CollaboratorSnippet);
