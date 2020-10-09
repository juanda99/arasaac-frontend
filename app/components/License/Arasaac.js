import React from "react";
import PropTypes from "prop-types";
import A from "components/A";

const Arasaac = ({ link }) =>
  link ? (
    <A href={"http://www.arasaac.org"} target="_blank" alt="Arasaac">
      ARASAAC (http://www.arasaac.org)
    </A>
  ) : (
    <A href={"http://www.arasaac.org"} target="_blank" alt="Arasaac">
      ARASAAC
    </A>
  );

Arasaac.propTypes = {
  link: PropTypes.bool,
};

export default Arasaac;
