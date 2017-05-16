import { schema } from 'normalizr'

const materialSchema = new schema.Entity('materials', {}, { idAttribute: 'idMaterial' })
const searchMaterialSchema = [materialSchema]

// export const pictogramsSchema = new Schema('searches', {
//   idAttribute: 'pictogramKey'
// })

export default searchMaterialSchema