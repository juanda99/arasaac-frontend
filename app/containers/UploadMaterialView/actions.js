import { createRequestTypes, action } from 'utils/actions'

// constants
export const UPLOAD_MATERIAL = createRequestTypes('UPLOAD_MATERIAL')

// actions: materials.request/success/failure
export const uploadMaterial = {
  request: (formData) => action(UPLOAD_MATERIAL.REQUEST, formData),
  success: (id) => action(UPLOAD_MATERIAL.SUCCESS, { id }),
  failure: (error) => action(UPLOAD_MATERIAL.FAILURE, { error })
}
