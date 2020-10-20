import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let PrizeIcon = (props) => (
  <SvgIcon {...props}>
    <g><rect fill="none" height="24" width="24"/></g><g><circle cx="12" cy="4" r="2"/><path d="M15.89,8.11C15.5,7.72,14.83,7,13.53,7c-0.21,0-1.42,0-2.54,0C8.24,6.99,6,4.75,6,2H4c0,3.16,2.11,5.84,5,6.71V22h2v-6h2 v6h2V10.05L18.95,14l1.41-1.41L15.89,8.11z"/></g>
  </SvgIcon>
);

PrizeIcon = pure(PrizeIcon);
PrizeIcon.displayName = 'PrizeIcon';
PrizeIcon.muiName = 'SvgIcon';

export default PrizeIcon;