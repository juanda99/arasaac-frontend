/**
 *
 * Footer
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import SocialLinks from "components/SocialLinks";
import { IMAGES_URL } from "services/config";
import { Link } from "react-router";
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

// import UnionEuropea from './union-europea-horizontal-logo.png'
import styles from "./styles";
import FooterSection from "./FooterSection";
import A from "./A";
import messages from "./messages";

const Footer = ({ docked, muiTheme }) => (
  <FooterSection
    id="footer"
    color={muiTheme.palette.footerColor}
    docked={docked}
  >
    {/* <img alt='Logo European Union Logo' style={styles.logoUE} src={UnionEuropea} /> */}

    <SocialLinks />

    <div style={{ flex: 1, justifyContent: "center" }}>
      <p style={styles.p}>
        {`© ARASAAC - Gobierno de Aragón, ${new Date().getFullYear()}`}
      </p>

      <p style={styles.p}>
        <Link to="/terms-of-use">
          <FormattedMessage {...messages.termsOfUse} />
        </Link>
      </p>
      <p style={styles.p}>
        <Link to="/cookies-policy">
          <FormattedMessage {...messages.cookiesPolicy} />
        </Link>{" "}
        -{" "}
        <Link to="/privacy-policy">
          <FormattedMessage {...messages.privacyPolicy} />
        </Link>
      </p>
    </div>

    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <img
        alt="Arasaac Logo"
        style={styles.logoGA}
        src={`${IMAGES_URL}/gobierno-aragon-logo.svg`}
      />
    </div>
  </FooterSection>
);

Footer.propTypes = {
  docked: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object.isRequired,
};

export default muiThemeable()(Footer);
