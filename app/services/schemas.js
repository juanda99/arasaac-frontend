import { schema } from "normalizr";

const materialSchema = new schema.Entity(
  "materials",
  {},
  { idAttribute: "idMaterial" }
);
export const searchMaterialSchema = [materialSchema];

const pictogramSchema = new schema.Entity(
  "pictograms",
  {},
  { idAttribute: "_id" }
);
export const searchPictogramSchema = [pictogramSchema];
