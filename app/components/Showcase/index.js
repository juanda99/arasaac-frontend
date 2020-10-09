/**
 *
 * Showcase
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import FullWidthSection from "components/FullWidthSection";
import { IMAGES_URL, PICTOGRAMS_URL } from "services/config";
import messages from "./messages";
import Item from "./Item";

const Showcase = ({ locale }) => {
  let saacRoute = "/aac";
  if (
    locale === "es" ||
    locale === "val" ||
    locale === "gl" ||
    locale === "eu"
  ) {
    saacRoute = "/saac";
  }
  return (
    <FullWidthSection
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Item
        title={<FormattedMessage {...messages.pictograms} />}
        route="/pictograms/search"
        image={`${IMAGES_URL}/pictograms.jpg`}
      />

      <Item
        title={<FormattedMessage {...messages.materials} />}
        route="/materials/search"
        image={`${IMAGES_URL}/materiales.jpg`}
      />

      <Item
        title="Aula Abierta"
        route="http://aulaabierta.arasaac.org/"
        image={`${IMAGES_URL}/aula-abierta.jpg`}
      />

      <Item
        title={<FormattedMessage {...messages.whatIsAAC} />}
        route={saacRoute}
        image={`${PICTOGRAMS_URL}/36723/36723_300.png`}
      />
    </FullWidthSection>
  );
};

Showcase.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  showFilter: makeShowFiltersSelector()(state),
  locale: makeSelectLocale()(state),
});

export default Showcase;
