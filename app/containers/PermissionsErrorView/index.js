import React from "react";
import View from "components/View";
import { FormattedMessage } from "react-intl";
import { PICTOGRAMS_URL } from "services/config";
import H3 from "components/H3";
import messages from "./messages";

const PermissionsErrorView = () => (
  <View left={true}>
    <H3>{<FormattedMessage {...messages.forbidden} />}</H3>
    <img src={`${PICTOGRAMS_URL}/9022/9022_300.png`} alt="Forbidden" />
  </View>
);

export default PermissionsErrorView;
