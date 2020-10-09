import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import SvgIcon from "material-ui/SvgIcon";
/* eslint-disable import/no-mutable-exports */
let Facebook = (props) => (
  <SvgIcon {...props} viewBox="0 0 32 32">
    <path
      d="M30.7,0H1.3C0.6,0,0,0.6,0,1.3v29.3C0,31.4,0.6,32,1.3,32H17V20h-4v-5h4v-4
  c0-4.1,2.6-6.2,6.3-6.2C25.1,4.8,26.6,5,27,5v4.3l-2.6,0c-2,0-2.5,1-2.5,2.4V15h5l-1,5h-4l0.1,12h8.6c0.7,0,1.3-0.6,1.3-1.3V1.3
  C32,0.6,31.4,0,30.7,0z"
    />
  </SvgIcon>
);

Facebook.propTypes = {
  color: PropTypes.string,
};

Facebook = pure(Facebook);
Facebook.displayName = "Facebook";

export default Facebook;
