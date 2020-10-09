import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import IconButton from "material-ui/IconButton";
import DeleteList from "material-ui/svg-icons/action/delete";
import FileDownload from "material-ui/svg-icons/file/file-download";
import Folder from "material-ui/svg-icons/file/folder";
import { FormattedMessage } from "react-intl";
import CardActions from "./CardActions";
import StyledPaper from "./StyledPaper";
import StyledList from "./StyledList";
import Image from "./Image";
import Item from "./Item";
import messages from "./messages";

class PictogramSnippet extends PureComponent {
  state = {
    isFlipped: false,
  };

  styles = {
    icon: {
      width: 48,
      height: 48,
    },
    leftIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: "absolute",
      top: "0",
      left: "0",
    },
    rightIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: "absolute",
      top: "0",
      right: "0",
    },
    cardTitle: {
      textAlign: "center",
      fontSize: "1.4rem",
      textTransform: "uppercase",
      color: this.props.muiTheme.appBar.textColor,
      fontWeight: "900",
    },
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    });
  };

  render() {
    const {
      pictogram: { idPictogram },
      title,
      id,
      muiTheme,
      locale,
      isList,
    } = this.props;
    return (
      <StyledList
        key={idPictogram}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth}>
          <Item url={`/pictograms/list/${id}`}>
            <div style={{ position: "relative" }}>
              <Image src={Folder} alt={title} />
              {isList && (
                <CardActions>
                  <IconButton
                    touch={true}
                    tooltip={<FormattedMessage {...messages.deleteList} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.leftIconButton}
                  >
                    <DeleteList
                      color={muiTheme.appBar.textColor}
                      hoverColor={muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                  <IconButton
                    touch={true}
                    tooltip={<FormattedMessage {...messages.download} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.rightIconButton}
                  >
                    <FileDownload
                      color={muiTheme.appBar.textColor}
                      hoverColor={muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                </CardActions>
              )}
              <p style={this.styles.cardTitle}>{title}</p>
            </div>
          </Item>
        </StyledPaper>
      </StyledList>
    );
  }
}

PictogramSnippet.contextTypes = {
  isAuthenticated: PropTypes.bool,
};

PictogramSnippet.propTypes = {
  pictogram: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  muiTheme: PropTypes.object,
  locale: PropTypes.string.isRequired,
  isList: PropTypes.boolean.isRequired,
};

export default muiThemeable()(PictogramSnippet);
