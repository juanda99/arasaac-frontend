import React from "react";
import PropTypes from "prop-types";
import Div from "components/Div";
import { IMAGES_URL } from "services/config";
import ArasaacLogo from "./arasaac-logo-blanco.svg";
// import ArasaacLogo from './logo-arasaac-texto.svg'
import LogoImg from "./Logo";

const style = {
  width: 270,
  display: "flex",
  margin: "0 auto",
  padding: 20,
  // backgroundColor: 'white'
};

const Logo = ({ src, top, presentation }) =>
  presentation ? (
    <LogoImg />
  ) : (
    <img
      src={`${IMAGES_URL}/arasaac-logo.svg`}
      style={{ backgroundColor: "white" }}
    />
  );

Logo.propTypes = {
  src: PropTypes.string,
  top: PropTypes.number,
  circle: PropTypes.bool,
};

export default Logo;
