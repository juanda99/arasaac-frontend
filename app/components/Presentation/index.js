/**
 *
 * Welcome
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import muiThemeable from "material-ui/styles/muiThemeable";
import { lightGreen500 } from "material-ui/styles/colors";
import withWidth, { SMALL } from "material-ui/utils/withWidth";
import LocaleToggle from "containers/LocaleToggle";
import FullWidthSection from "./FullWidthSection";
import Slider from "react-slick";
import DiscoverButton from "./DiscoverButton";
import { IMAGES_URL } from "services/config";
import H2 from "./H2";
import P from "components/P";
import Logo from "components/Logo";
import messages from "./messages";

const Presentation = ({ run, onStart, muiTheme, width, rtl }) => {
  // const aragones = <Strong><FormattedMessage {...messages.aragonese} /> </Strong>
  const aragones = <FormattedMessage {...messages.aragonese} />;
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    fade: false, // https://github.com/akiran/react-slick/issues/1710
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    rtl,
  };
  let isMobile = width === SMALL;

  const imgStyle = { width: "100%", height: "auto", filter: "brightness(55%)" };
  return (
    <FullWidthSection style={{ position: "relative", textAlign: "left" }}>
      <Logo presentation={true} />
      <H2>
        <FormattedMessage {...messages.header} values={{ aragones }} />
      </H2>
      <DiscoverButton
        label={<FormattedMessage {...messages.discover} />}
        primary={true}
        onClick={onStart}
        disabled={run === true}
      />
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Slider {...settings}>
          <div>
            <img
              src={`${IMAGES_URL}/slides/banner_2${
                isMobile ? "-mobile" : "_1000"
              }.jpg`}
              style={imgStyle}
            />
          </div>
          <div>
            <img
              src={`${IMAGES_URL}/slides/banner_7${
                isMobile ? "-mobile" : "_1000"
              }.jpg`}
              style={imgStyle}
            />
          </div>
          <div>
            <img
              src={`${IMAGES_URL}/slides/banner_6${
                isMobile ? "-mobile" : "_1000"
              }.jpg`}
              style={imgStyle}
            />
          </div>
          <div>
            <img
              src={`${IMAGES_URL}/slides/banner_1${
                isMobile ? "-mobile" : "_1000"
              }.jpg`}
              style={imgStyle}
            />
          </div>
          <div>
            <img
              src={`${IMAGES_URL}/slides/banner_4${
                isMobile ? "-mobile" : "_1000"
              }.jpg`}
              style={imgStyle}
            />
          </div>
        </Slider>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "7px",
          background: "rgba(0, 0, 0, 0.2)",
          height: "150px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <P style={{ color: "white" }}>
          <FormattedMessage {...messages.chooseLanguage} />
        </P>
        <LocaleToggle labelColor="white" />
      </div>
    </FullWidthSection>
  );
};

Presentation.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  run: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  rtl: PropTypes.bool.isRequired,
};

export default muiThemeable()(withWidth()(Presentation));
