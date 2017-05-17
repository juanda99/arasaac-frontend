import { schema } from 'normalizr'

export const materialSchema = new schema.Entity('materials', {}, { idAttribute: 'idMaterial' })
export const searchMaterialSchema = [materialSchema]

// export const pictogramsSchema = new Schema('searches', {
//   idAttribute: 'pictogramKey'
// })
