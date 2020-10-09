import React from "react";
import createComponentWithIntl from "utils/createComponentWithIntl";
import material from "data/material.json";
import { Map } from "immutable";
import Component from "../index";

describe("<Material />", () => {
  it("renders correctly", () => {
    const materialMap = new Map(material);
    const tree = createComponentWithIntl(
      <Component material={materialMap} locale={"es"} />
    );
    expect(tree).toMatchSnapshot();
  });
});
