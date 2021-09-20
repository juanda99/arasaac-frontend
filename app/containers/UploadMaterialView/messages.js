import { defineMessages } from 'react-intl'

export default defineMessages({
  close: {
    id: 'app.components.uploadMaterialView.close',
    defaultMessage: 'Close',
  },
  needReview: {
    id: 'app.components.uploadMaterialView.needReview',
    defaultMessage: 'Review material',
  },
  needAuthor: {
    id: 'app.components.uploadMaterialView.needAuthor',
    defaultMessage: 'At least one author of the material is required',
  },
  needFiles: {
    id: 'app.components.uploadMaterialView.needFiles',
    defaultMessage: 'At least one material file is required',
  },
  uploadMore: {
    id: 'app.components.uploadMaterialView.uploadMore',
    defaultMessage: 'Upload another material',
  },
  tryAgain: {
    id: 'app.components.uploadMaterialView.tryAgain',
    defaultMessage: 'Try again',
  },
  materialSuccessUpload: {
    id: 'app.components.uploadMaterialView.materialSuccessUpload',
    defaultMessage:
      'Your material has been uploaded and it will be reviewed by the ARASAAC team. We will send you an email when it is published!',
  },
  progressStatus: {
    id: `app.components.uploadMaterialView.progressStatus`,
    defaultMessage: 'Uploading material: {progressStatus}%',
  },
  materialLoading: {
    id: 'app.components.updateMaterialView.materialLoading',
    defaultMessage: 'Loading material...',
  },
  updatingMaterial: {
    id: 'app.components.updateMaterialView.updatingMaterial',
    defaultMessage: 'Updating material...',
  },
  updatedMaterial: {
    id: 'app.components.updateMaterialView.updatedMaterial',
    defaultMessage: 'Material updated.',
  },
  showMaterial: {
    id: 'app.components.updateMaterialView.showMaterial',
    defaultMessage: 'Show material',
  },
  materialNotFound: {
    id: 'app.components.updateMaterialView.materialNotFound',
    defaultMessage: 'Sorry, the material you are looking for does not exist',
  },
})
