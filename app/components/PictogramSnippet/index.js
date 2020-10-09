import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { PICTOGRAMS_URL } from "services/config";
import IconButton from "material-ui/IconButton";
import FavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import Favorite from "material-ui/svg-icons/action/favorite";
import FileDownload from "material-ui/svg-icons/file/file-download";
import { keywordSelector } from "utils";
import { FormattedMessage } from "react-intl";
import CardActions from "./CardActions";
import StyledPaper from "./StyledPaper";
import StyledList from "./StyledList";
import Image from "./Image";
import Item from "./Item";
import messages from "./messages";

class PictogramSnippet extends PureComponent {
  state = {
    zDepth: 1,
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
      opacity: 100,
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

  handleClickFavorite = (event) => {
    const {
      pictogram: { _id },
      onClickFavorite,
    } = this.props;
    event.preventDefault();
    onClickFavorite(_id);
  };

  handleDownload = (event) => {
    const {
      pictogram: { _id, keywords },
      searchText,
      onDownload,
    } = this.props;
    event.preventDefault();
    const { keyword } = keywordSelector(searchText, keywords);
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
      isFavorite,
    } = this.props;
    const { keyword } = keywordSelector(searchText, keywords);
    const { isAuthenticated } = this.context;
    return (
      <StyledList
        key={_id}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth}>
          <Item
            url={`/pictograms/${locale}/${_id}/${encodeURIComponent(keyword)}`}
          >
            <div style={{ position: "relative" }}>
              <Image
                src={`${PICTOGRAMS_URL}/${_id}/${_id}_300.png`}
                alt={keyword}
              />
              {isFavorite && (
                <IconButton
                  touch={true}
                  // https://github.com/react-dnd/react-dnd/issues/577
                  // we can use tooltip as we are using customDragLayer
                  tooltip={<FormattedMessage {...messages.addFavorite} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.rightIconButton}
                  onClick={this.handleClickFavorite}
                >
                  <Favorite
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
              )}
              <CardActions color={true}>
                {showExtra && isAuthenticated && (
                  <IconButton
                    touch={true}
                    // https://github.com/react-dnd/react-dnd/issues/577
                    // we can use tooltip as we are using customDragLayer
                    tooltip={
                      isFavorite ? (
                        <FormattedMessage {...messages.deleteFavorite} />
                      ) : (
                        <FormattedMessage {...messages.addFavorite} />
                      )
                    }
                    iconStyle={this.styles.icon}
                    style={this.styles.rightIconButton}
                    onClick={this.handleClickFavorite}
                  >
                    {isFavorite ? (
                      <Favorite
                        color={muiTheme.appBar.textColor}
                        hoverColor={muiTheme.palette.accent1Color}
                      />
                    ) : (
                      <FavoriteBorder
                        color={muiTheme.appBar.textColor}
                        hoverColor={muiTheme.palette.accent1Color}
                      />
                    )}
                  </IconButton>
                )}
                {showExtra && (
                  <IconButton
                    touch={true}
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
  onClickFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  onDownload: PropTypes.func.isRequired,
};

export default muiThemeable()(PictogramSnippet);
