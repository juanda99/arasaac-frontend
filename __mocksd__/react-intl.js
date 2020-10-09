// ./__mocks__/react-intl.js
import React from "react";
const Intl = require.requireActual("react-intl");

// Here goes intl context injected into component, feel free to extend
const intl = {
  formatMessage: ({ defaultMessage }) => defaultMessage,
  formatDate: ({ defaultMessage }) => defaultMessage,
  formatTime: ({ defaultMessage }) => defaultMessage,
  formatRelative: ({ defaultMessage }) => defaultMessage,
  formatNumber: ({ defaultMessage }) => defaultMessage,
  formatPlural: ({ defaultMessage }) => defaultMessage,
  formatHTMLMessage: ({ defaultMessage }) => defaultMessage,
  now: ({ defaultMessage }) => defaultMessage,
};

Intl.injectIntl = (Node) => (props) => <Node {...props} intl={intl} />;

module.exports = Intl;
