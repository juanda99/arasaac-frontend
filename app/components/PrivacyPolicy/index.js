/**
 *
 * PrivatePolicy
 *
 */

import React from "react";

import { FormattedMessage } from "react-intl";
import messages from "./messages";

function PrivacyPolicy() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default PrivacyPolicy;
