import React from "react";
import createComponentWithIntl from "utils/createComponentWithIntl";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import material from "data/material.json";
import Component from "../index";

describe("<MaterialSnippet />", () => {
  const viewMaterial = () => true;
  const props = {
    material,
    locale: "es",
    viewMaterial,
  };
  it("renders correctly", () => {
    const tree = createComponentWithIntl(
      <MuiThemeProvider>
        <Component {...props} />
      </MuiThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
