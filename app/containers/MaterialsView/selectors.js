import { createSelector } from 'reselect'

const materialsSelector = (state) => state.getIn(['materialsView', 'materials'])

export const entitiesSelector = createSelector(
  materialsSelector, (materials) => {
    console.log(materials)
    const entities = {}
    entities.materials = materials.toJS()
    console.log('executed tojS')
    return entities
  }
)
