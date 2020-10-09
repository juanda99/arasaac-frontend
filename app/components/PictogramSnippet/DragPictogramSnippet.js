import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { PICTOGRAMS_URL } from "services/config";
import IconButton from "material-ui/IconButton";
import Delete from "material-ui/svg-icons/action/delete";
import { DragSource } from "react-dnd";
import FileDownload from "material-ui/svg-icons/file/file-download";
import { getEmptyImage } from "react-dnd-html5-backend";
import { keywordSelector } from "utils";
import { FormattedMessage } from "react-intl";
import CardActions from "./CardActions";
import StyledPaper from "./StyledPaper";
import StyledList from "./StyledList";
import Image from "./Image";
import Item from "./Item";
import messages from "./messages";

const source = {
  beginDrag(props) {
    const {
      pictogram: { _id },
    } = props;
    return {
      _id,
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      // console.log('not dropped!')
      return;
    }
    const { onDrop } = props;
    const { _id } = monitor.getItem();
    const { listName } = monitor.getDropResult();
    onDrop({ _id, listName });
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class PictogramSnippet extends PureComponent {
  state = {
    zDepth: 1,
  };

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage());
  }

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

  handleDelete = (event) => {
    event.preventDefault();
    const {
      pictogram: { _id },
      onDelete,
    } = this.props;
    onDelete(_id);
  };

  handleDownload = (event) => {
    const {
      pictogram: { _id, keywords },
      onDownload,
    } = this.props;
    event.preventDefault();
    /* no searchText, it will return keywords[0].keyword if exists */
    const { keyword } = keywordSelector("", keywords);
    onDownload(_id, keyword);
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    });
  };

  render() {
    const {
      pictogram: { _id, keywords },
      searchText,
      muiTheme,
      locale,
      showExtra,
      connectDragSource,
      isDragging,
    } = this.props;

    const { keyword } = keywordSelector(searchText, keywords);
    const { isAuthenticated } = this.context;
    return (
      <StyledList
        innerRef={(instance) => connectDragSource(instance)}
        key={_id}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth} isDragging={isDragging}>
          <Item url={`/pictograms/${locale}/${_id}/${keyword}`}>
            <div style={{ position: "relative" }}>
              <Image
                src={`${PICTOGRAMS_URL}/${_id}/${_id}_300.png`}
                alt={keyword}
              />
              <CardActions color={true} isDragging={isDragging}>
                {showExtra && isAuthenticated && (
                  <IconButton
                    touch={true}
                    // https://github.com/react-dnd/react-dnd/issues/577
                    // we can use tooltip as we are using customDragLayer
                    tooltip={<FormattedMessage {...messages.deleteFavorite} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.rightIconButton}
                    onClick={this.handleDelete}
                  >
                    <Delete
                      color={muiTheme.appBar.textColor}
                      hoverColor={muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                )}
                {showExtra && (
                  <IconButton
                    touch={true}
                    // https://github.com/react-dnd/react-dnd/issues/577
                    // we can use tooltip as we are using customDragLayer
                    tooltip={<FormattedMessage {...messages.download} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.leftIconButton}
                    onClick={this.handleDownload}
                  >
                    <FileDownload
                      color={muiTheme.appBar.textColor}
                      hoverColor={muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                )}
                <p style={this.styles.cardTitle}>{keyword}</p>
              </CardActions>
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
  searchText: PropTypes.string,
  muiTheme: PropTypes.object,
  locale: PropTypes.string.isRequired,
  showExtra: PropTypes.bool,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default muiThemeable()(
  DragSource("pictogram", source, collect)(PictogramSnippet)
);
