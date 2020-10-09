/**
 *
 * Gallery
 *
 */

import React from "react";
import PictogramCard from "components/PictogramCard";
import PropTypes from "prop-types";
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

const Masonry = require("react-masonry-component");

const masonryOptions = {
  transitionDuration: "1s",
};

const styles = {
  masonry: {
    listStyleType: "none",
  },
};

const Gallery = ({ data }) => {
  const pictograms = data.map((pictogram) => (
    <li
      style={{ margin: 5 }}
      key={pictogram.id}
      className="image-element-class"
    >
      <PictogramCard title={pictogram.title} img={pictogram.src} />
    </li>
  ));
  return (
    <div>
      <Masonry
        className={"my-gallery-class"} // default ''
        elementType={"ul"} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        onClick={this.handleClick}
        style={styles.masonry}
      >
        {pictograms}
      </Masonry>
    </div>
  );
};

Gallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
