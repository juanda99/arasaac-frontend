import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { setFilterItems } from "containers/MaterialsView/actions";
import createComponentWithIntl from "utils/createComponentWithIntl";
import { Map } from "immutable";
import Component from "../index";

jest.mock("material-ui/internal/Tooltip");
jest.mock("../FilterSelectLoader");

describe("<FilterList />", () => {
  const filtersData = Map({
    activity: [{ 1: "act1" }, { 2: "act2" }, { 3: "act3" }],
    language: [{ es: "spanish" }, { it: "italian" }],
    area: [{ 1: "area1" }, { 2: "area2" }, { 3: "area3" }],
  });
  const filtersMap = Map({
    activity: [1, 2],
    language: ["es"],
    area: [1],
  });

  it("renders correctly", () => {
    const tree = createComponentWithIntl(
      <MuiThemeProvider>
        <Component
          setFilterItems={setFilterItems}
          filtersMap={filtersMap}
          filtersData={filtersData}
        />
      </MuiThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
