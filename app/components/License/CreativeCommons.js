import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

import A from "components/A";

const CreativeCommons = ({ locale }) => (
  <A
    href={`https://creativecommons.org/licenses/by-nc-sa/4.0/deed.${locale}`}
    target="_blank"
    alt="Creative Commons (BY-NC-SA)"
  >
    <FormattedMessage {...messages.creativeCommons} />
  </A>
);

CreativeCommons.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default CreativeCommons;
