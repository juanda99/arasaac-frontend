import React from 'react'
import renderer from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import { render } from 'enzyme'

const createComponentWithIntl = (children, props = { locale: 'en' }) =>
  renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  )


export const intlEnzymeComponent = (children, props = { locale: 'en' }) =>
  render(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  )

export default createComponentWithIntl
