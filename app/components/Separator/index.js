import React from "react";
import { FormattedMessage } from "react-intl";
import Div from "components/Div";
import messages from "./messages";

const styles = {
  separator: {
    textAlign: "center",
    paddingTop: 20,
    clear: "both",
  },
  separatorText: {
    display: "inlineBlock",
    padding: 4,
    position: "relative",
    backgroundColor: "#fff",
    color: "#000",
  },
  separatorLine: {
    marginTop: "-10px",
  },
};

const Separator = () => (
  <Div style={styles.separator}>
    <span style={styles.separatorText}>
      {<FormattedMessage {...messages.or} />}
    </span>
    <hr style={styles.separatorLine} />
  </Div>
);

export default Separator;
