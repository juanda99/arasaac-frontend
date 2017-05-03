import React from 'react'
import pure from 'recompose/pure'
import SvgIcon from 'material-ui/SvgIcon'

/* eslint-disable import/no-mutable-exports */
let Filter = (props) => (
  <SvgIcon {...props}>
    <path d='M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z' />
  </SvgIcon>
)
/* eslint-enable import/no-mutable-exports */
Filter = pure(Filter)
Filter.displayName = 'Filter'
export default Filter
