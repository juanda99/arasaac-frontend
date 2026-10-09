import React from 'react'
import { shallow } from 'enzyme'
import { FormattedMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import { ProfileView } from '../index'
import messages from '../messages'
import api from 'services'

const createProps = () => ({
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  userLocale: 'es',
  token: 'dummy.jwt.token',
  hasGoogle: false,
  hasFacebook: false,
  pictureProvider: 'arasaac',
  searchLanguage: 'es',
  violence: false,
  sex: false,
  color: true,
  showProgressBar: jest.fn(),
  hideProgressBar: jest.fn(),
  updateUser: jest.fn(),
  changeLocale: jest.fn(),
  logout: jest.fn(),
  muiTheme: { direction: 'ltr' },
})

describe('<ProfileView /> - Delete Account', () => {
  let defaultProps
  let originalDeleteApi

  beforeEach(() => {
    defaultProps = createProps()
    originalDeleteApi = api.DELETE_USER_REQUEST
  })

  afterEach(() => {
    api.DELETE_USER_REQUEST = originalDeleteApi
  })

  it('should render the delete account section and description', () => {
    const wrapper = shallow(<ProfileView {...defaultProps} />)
    expect(wrapper.contains(<FormattedMessage {...messages.deleteAccountDesc} />)).toBe(true)
  })

  it('should have delete dialog closed by default', () => {
    const wrapper = shallow(<ProfileView {...defaultProps} />)
    const dialog = wrapper.find(Dialog)
    expect(dialog.length).toBe(1)
    expect(dialog.prop('open')).toBe(false)
  })

  it('should open delete dialog when handleOpenDeleteDialog is called', () => {
    const wrapper = shallow(<ProfileView {...defaultProps} />)
    wrapper.instance().handleOpenDeleteDialog()
    expect(wrapper.state('showDeleteDialog')).toBe(true)
  })

  it('should close delete dialog when handleCloseDeleteDialog is called', () => {
    const wrapper = shallow(<ProfileView {...defaultProps} />)
    wrapper.setState({ showDeleteDialog: true })
    wrapper.instance().handleCloseDeleteDialog()
    expect(wrapper.state('showDeleteDialog')).toBe(false)
  })

  it('should call api.DELETE_USER_REQUEST and logout when user confirms deletion', async () => {
    const deleteMock = jest.fn(() => Promise.resolve({ deleted: true }))
    api.DELETE_USER_REQUEST = deleteMock

    const wrapper = shallow(<ProfileView {...defaultProps} />)
    wrapper.setState({ showDeleteDialog: true })

    await wrapper.instance().handleDeleteUser()

    expect(defaultProps.showProgressBar).toHaveBeenCalled()
    expect(deleteMock).toHaveBeenCalledWith({ token: defaultProps.token })
    expect(defaultProps.hideProgressBar).toHaveBeenCalled()
    expect(defaultProps.logout).toHaveBeenCalled()
    expect(wrapper.state('showDeleteDialog')).toBe(false)
  })

  it('should display error when account deletion fails', async () => {
    const deleteMock = jest.fn(() => Promise.reject(new Error('Network error')))
    api.DELETE_USER_REQUEST = deleteMock

    const wrapper = shallow(<ProfileView {...defaultProps} />)

    await wrapper.instance().handleDeleteUser()

    expect(defaultProps.showProgressBar).toHaveBeenCalled()
    expect(deleteMock).toHaveBeenCalledWith({ token: defaultProps.token })
    expect(defaultProps.hideProgressBar).toHaveBeenCalled()
    expect(defaultProps.logout).not.toHaveBeenCalled()
    expect(wrapper.state('deleteError')).toBe(true)
    expect(wrapper.contains(<FormattedMessage {...messages.errorDeletingAccount} />)).toBe(true)
  })
})
