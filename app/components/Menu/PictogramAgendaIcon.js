import React from 'react'
import pure from 'recompose/pure'
import SvgIcon from 'material-ui/SvgIcon'

let PictogramAgendaIcon = (props) => (
  <SvgIcon {...props}>
    <image
      y="0"
      x="0"
      id="image4527"
      href="data:image/png;base64,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"
      preserveAspectRatio="none"
      height="24"
      width="24"
    />
  </SvgIcon>
)

PictogramAgendaIcon = pure(PictogramAgendaIcon)
PictogramAgendaIcon.displayName = 'PictogramAgendaIcon'
PictogramAgendaIcon.muiName = 'SvgIcon'

export default PictogramAgendaIcon