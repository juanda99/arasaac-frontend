import React, { Component } from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import StyledPaper from "./StyledPaper";

const imageTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/x-icon",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
];

class FilePreview extends Component {
  state = { zDepth: 1 };

  styles = {
    fileName: {
      textAlign: "center",
      overflowWrap: "break-word",
      fontSize: "0.8rem",
      margin: 0,
      padding: "5px",
      maxWidth: "200px",
      color: this.props.muiTheme.textColor,
      fontWeight: "900",
    },
    image: {
      display: "block",
      width: "100%",
      height: "auto",
    },
  };

  handleEnter = () => this.setState({ zDepth: 3 });

  handleLeave = () => this.setState({ zDepth: 1 });

  // stopPropagation inside iconButton does not work :-(
  handleDelete = (event) => event.stopPropagation();

  handleOnDelete = (fileName) => this.props.onDelete(fileName);

  render() {
    const { zDepth } = this.state;
    const { file, onDelete, muiTheme } = this.props;
    const renderFile =
      imageTypes.indexOf(file.type) === -1 ? (
        <p style={this.styles.fileName}>{file.name}</p>
      ) : (
        <img src={file.preview} style={this.styles.image} alt={file.name} />
      );
    return (
      <StyledPaper
        zDepth={zDepth}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onClick={this.handleDelete}
      >
        {renderFile}
        {zDepth === 3 && (
          <IconButton
            touch={true}
            aria-label="delete"
            style={{ position: "absolute", right: "0px", top: "0px" }}
            onClick={() => this.handleOnDelete(file.name)}
          >
            <DeleteIcon
              color={muiTheme.palette.primary1Color}
              hoverColor={muiTheme.palette.accent1Color}
            />
          </IconButton>
        )}
      </StyledPaper>
    );
  }
}

export default muiThemeable()(FilePreview);

FilePreview.propTypes = {
  file: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  muiTheme: PropTypes.object,
};
