import { createSelector } from 'reselect'


const selectRegister = (state) => state.get('register')

const makeSelectName = () => createSelector(
  selectRegister,
  (register) => register.get('name')
)

const makeSelectEmail = () => createSelector(
  selectRegister,
  (register) => register.get('email')
)

const makeSelectSend = () => createSelector(
  selectRegister,
  (register) => register.get('send')
)

const makeSelectError = () => createSelector(
  selectRegister,
  (register) => register.get('error')
)

const makeSelectLoading = () => createSelector(
  selectRegister,
  (register) => register.get('loading')
)

export {
  makeSelectName,
  makeSelectEmail,
  makeSelectSend,
  makeSelectError,
  makeSelectLoading
}
