import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSlidy from "react-slidy";
import { MATERIALS_URL } from "services/config";
import "./index.css";
import Counter from "./Counter";

class ImageSlider extends Component {
  render() {
    const { id, images, style, language } = this.props;
    const imagesCount = images.length;
    return (
      <div
        style={
          style
        } /* onMouseOver={this.mouseOver} onFocus={this.mouseOver} onMouseOut={this.mouseOut} onBlur={this.mouseOut}*/
      >
        <ReactSlidy dynamicContent infinite={false}>
          {imagesCount ? (
            images.map((image, key) => (
              /* use language for materials when changing material, slides need to be loaded, and key has to change */
              <div key={`${id}-${language}`}>
                <img
                  src={`${MATERIALS_URL}/${id}/screenshots/${image}`}
                  alt="Screenshot"
                />
                <Counter>{`${key + 1}/${imagesCount}`}</Counter>
              </div>
            ))
          ) : (
            <img
              src={"//static.arasaac.org/images/noimage.png"}
              alt="Screenshot not available"
            />
          )}
        </ReactSlidy>
      </div>
    );
  }
}

ImageSlider.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number.isRequired,
  style: PropTypes.object,
  language: PropTypes.string,
};

export default ImageSlider;
