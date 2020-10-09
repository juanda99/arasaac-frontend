/*
 *
 * UploadMaterialView
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import View from "components/View";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadNew } from "./actions";

const QuillConf = {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ],
};

class UploadNewsView extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <View left={true} right={true}>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
          modules={QuillConf.modules}
          formats={QuillConf.formats}
        />
      </View>
    );
  }
}

export default UploadNewsView;
