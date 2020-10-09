import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import Badge from "material-ui/Badge";
import { DEFAULT_LIST } from "utils";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FileDownload from "material-ui/svg-icons/file/file-download";
import ArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { DropTarget } from "react-dnd";
import CardActions from "components/PictogramSnippet/CardActions";
import StyledPaper from "components/PictogramSnippet/StyledPaper";
import StyledList from "components/PictogramSnippet/StyledList";
import Folder from "material-ui/svg-icons/file/folder";
import ListMenu from "./ListMenu";
import messages from "./messages";

class ListSnippet extends PureComponent {
  styles = {
    icon: {
      width: 35,
      height: 35,
    },
    leftIconButton: {
      width: 60,
      height: 60,
      position: "absolute",
      top: "10",
      left: "5",
    },
    rightIconButton: {
      width: 60,
      height: 60,
      position: "absolute",
      top: "10",
      right: "5",
    },
    cardTitle: {
      textAlign: "center",
      padding: "30px",
      fontSize: "1.4rem",
      textTransform: "uppercase",
      color: this.props.muiTheme.appBar.textColor,
      fontWeight: "900",
    },
    header: {
      fontSize: "1.4rem",
      marginBottom: 0,
      textTransform: "uppercase",
      color: this.props.muiTheme.palette.primary1Color,
      fontWeight: "900",
      textAlign: "center",
      paddingTop: 30,
    },
  };

  state = {
    zDepth: 1,
    menuOpen: false,
    dialogOpen: false,
    newListName: "",
    inputRef: null,
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
    });
  };

  handleListNameChange = (e) => {
    this.setState({
      newListName: e.target.value,
    });
  };

  handleDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.listName);
  };
  handleRename = (event) => {
    event.stopPropagation();
    this.setState({ dialogOpen: true, menuOpen: false }, () => {
      const { inputRef } = this.state;
      inputRef.focus();
    });
  };

  handleDownload = (event) => {
    event.stopPropagation();
    this.props.onDownload(this.props.listName);
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    });
  };

  handleOpenMenu = (event) => {
    event.stopPropagation();
    this.setState({ menuOpen: true, anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => this.setState({ menuOpen: false });

  handleClick = (event) => {
    event.stopPropagation();
    const { onSelect, listName } = this.props;
    onSelect(listName);
  };

  handleCancelDialog = () => {
    this.setState({ dialogOpen: false });
  };

  handleSubmitDialog = () => {
    const { newListName } = this.state;
    this.setState({ dialogOpen: false, newListName: "" });
    if (newListName) {
      this.props.onRename(this.props.listName, newListName);
    }
  };

  render() {
    const {
      muiTheme,
      listName,
      totalItems,
      intl,
      connectDropTarget,
      canDrop,
      isOver,
    } = this.props;
    const { anchorEl, menuOpen } = this.state;
    const { formatMessage } = intl;

    const actions = [
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary={true}
        onClick={this.handleCancelDialog}
      />,
      <FlatButton
        label={formatMessage(messages.submit)}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmitDialog}
        type="submit"
      />,
    ];
    return (
      <StyledList
        innerRef={(instance) => connectDropTarget(instance)}
        key={listName}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ListMenu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={this.handleCloseMenu}
          onDelete={this.handleDelete}
          onRename={this.handleRename}
          onDownload={this.handleDownload}
        />
        <Dialog
          title={formatMessage(messages.newFolderName)}
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
          onRequestClose={this.handleCancelDialog}
        >
          {/* bug with textfield, workaround */}
          {this.state.newListName ? (
            <TextField
              floatingLabelText={formatMessage(messages.folderName)}
              style={{ marginRight: 10 }}
              value={this.state.newlistName}
              onChange={this.handleListNameChange}
            />
          ) : (
            <TextField
              ref={(c) => (this.state.inputRef = c)}
              hintText={formatMessage(messages.addFolderHint)}
              floatingLabelText={formatMessage(messages.folderName)}
              style={{ marginRight: 10 }}
              value={this.state.newlistName}
              onChange={this.handleListNameChange}
            />
          )}
        </Dialog>
        <StyledPaper
          zDepth={this.state.zDepth}
          onClick={this.handleClick}
          canDrop={canDrop}
          isOver={isOver}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <p style={this.styles.header}>
                {listName === DEFAULT_LIST ? (
                  <FormattedMessage {...messages.showFolders} />
                ) : (
                  listName
                )}
              </p>
              {listName === DEFAULT_LIST ? (
                <ArrowBack
                  color={muiTheme.palette.primary1Color}
                  hoverColor={muiTheme.palette.accent1Color}
                  onClick={this.handleClick}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Badge
                  badgeContent={totalItems}
                  secondary={true}
                  badgeStyle={{ top: 23, right: 23 }}
                >
                  <Folder
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                    onClick={this.handleClick}
                    style={{ width: 100, height: 100 }}
                  />
                </Badge>
              )}
            </div>
            {listName !== DEFAULT_LIST && (
              <CardActions>
                <IconButton
                  touch={true}
                  tooltip={<FormattedMessage {...messages.download} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.leftIconButton}
                  onClick={this.handleDownload}
                >
                  <FileDownload
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
                <IconButton
                  touch={true}
                  tooltip={<FormattedMessage {...messages.manageFolder} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.rightIconButton}
                  onClick={this.handleOpenMenu}
                >
                  <MoreVertIcon
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
              </CardActions>
            )}
          </div>
        </StyledPaper>
      </StyledList>
    );
  }
}

ListSnippet.propTypes = {
  listName: PropTypes.string.isRequired,
  muiTheme: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  totalItems: PropTypes.number,
  intl: intlShape.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
};

const target = {
  drop(props) {
    const { listName } = props;
    return {
      listName,
    };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver(),
});

export default muiThemeable()(
  injectIntl(DropTarget("pictogram", target, collect)(ListSnippet))
);
