/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react";
import { FormattedMessage } from "react-intl";
import { PICTOGRAMS_URL } from "services/config";
import View from "components/View";
import Logo from "components/Logo";

import messages from "./messages";

export default class NotFound extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <View left={true} right={true} top={0}>
        <h1 style={{ textAlign: "center" }}>
          <FormattedMessage {...messages.header} />
        </h1>
        <div style={{ textAlign: "center" }}>
          <img src={`${PICTOGRAMS_URL}/21466/21466_300.png`} />
        </div>
      </View>
    );
  }
}
