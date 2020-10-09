import { shallow } from "enzyme";
import React from "react";
import materials from "data/materials.json";
import MaterialList from "../index";

describe("<MaterialList />", () => {
  const viewMaterial = () => true;
  const props = {
    materials,
    locale: "es",
    viewMaterial,
  };
  it("should render a <ul> tag", () => {
    const renderedComponent = shallow(<MaterialList {...props} />);
    // console.log(renderedComponent.debug())
    expect(renderedComponent.type()).toEqual("ul");
  });

  it("should contain a Material", () => {
    const renderedComponent = shallow(<MaterialList {...props} />);
    expect(renderedComponent.find("Material")).toBeDefined();
  });
  it("should render all the list of materials", () => {
    const renderedComponent = shallow(<MaterialList {...props} />);
    // stateless components looses therir names working with coverage? See https://github.com/facebook/jest/issues/1824
    // fixed with displayName property in the component
    // not able to making it working with lenght :-(
    // console.log(renderedComponent.debug())
    expect(renderedComponent.find("MaterialSnippet").length).toEqual(2);
  });
});
