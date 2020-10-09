import React, { Component } from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import PropTypes from "prop-types";
import Facebook from "components/SocialLogin/icons/svg/facebook";
import IconButton from "material-ui/IconButton";
import Instagram from "components/SocialLogin/icons/svg/instagram";
import Pinterest from "components/SocialLogin/icons/svg/pinterest";
import YouTube from "components/SocialLogin/icons/svg/youtube";
import Twitter from "components/SocialLogin/icons/svg/twitter";

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
};

class SocialLinks extends Component {
  render() {
    const { muiTheme } = this.props;
    return (
      <div
        style={{
          minWidth: "360px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a href="https://www.instagram.com/arasaac/" target="_blank">
          <IconButton iconStyle={styles.smallIcon} style={styles.small}>
            <Instagram
              color="white"
              hoverColor={muiTheme.palette.primary1Color}
            />
          </IconButton>
        </a>
        <a href="https://www.facebook.com/arasaac/" target="_blank">
          <IconButton iconStyle={styles.smallIcon} style={styles.small}>
            <Facebook
              color="white"
              hoverColor={muiTheme.palette.primary1Color}
            />
          </IconButton>
        </a>
        <a href="https://www.pinterest.es/arasaac/" target="_blank">
          <IconButton iconStyle={styles.smallIcon} style={styles.small}>
            <Pinterest
              color="white"
              hoverColor={muiTheme.palette.primary1Color}
            />
          </IconButton>
        </a>
        <a href="https://twitter.com/arasaac/" target="_blank">
          <IconButton iconStyle={styles.smallIcon} style={styles.small}>
            <Twitter
              color="white"
              hoverColor={muiTheme.palette.primary1Color}
            />
          </IconButton>
        </a>
        <a
          href="https://www.youtube.com/channel/UCwzhptqPzLOxG7JpPJ8vO-Q"
          target="_blank"
        >
          <IconButton iconStyle={styles.smallIcon} style={styles.small}>
            <YouTube
              color="white"
              hoverColor={muiTheme.palette.primary1Color}
            />
          </IconButton>
        </a>
      </div>
    );
  }
}

SocialLinks.propTypes = {
  muiTheme: PropTypes.object,
};

export default muiThemeable()(SocialLinks);
