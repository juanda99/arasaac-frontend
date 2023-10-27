import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let SequenciIcon = (props) => (
  <SvgIcon {...props} width="123.000000pt" height="90.000000pt" viewBox="0 0 123.000000 90.000000">
    <g transform="translate(0.000000,90.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        <path d="M935 872 c-22 -10 -54 -31 -71 -45 -29 -25 -37 -26 -91 -21 -92 10
        -164 -15 -224 -77 l-49 -50 -60 12 c-174 34 -357 -79 -411 -254 -50 -161 26
        -320 189 -395 45 -21 73 -26 132 -26 149 -1 265 71 334 207 33 64 44 77 64 77
        79 0 159 47 204 120 27 43 34 48 77 54 190 25 258 273 105 379 -55 38 -141 46
        -199 19z m102 -32 c72 0 143 -76 143 -153 0 -43 -5 -47 -75 -54 l-55 -6 -50
        50 c-40 40 -50 57 -50 83 0 39 40 104 54 90 6 -6 20 -10 33 -10z m-287 -63 c0
        -8 28 -25 63 -39 54 -22 66 -32 95 -79 31 -52 43 -117 24 -145 -13 -21 -88
        -27 -122 -9 -50 26 -105 81 -125 125 -17 38 -17 43 -2 76 9 19 24 37 32 40 8
        4 15 15 15 25 0 10 5 19 10 19 6 0 10 -6 10 -13z m-290 -135 c0 -5 22 -21 49
        -35 62 -34 127 -104 140 -153 17 -61 14 -111 -9 -134 -25 -25 -28 -25 -83 -1
        -88 38 -214 199 -205 262 4 33 108 90 108 61z"/>
    </g>        

  </SvgIcon>
);







SequenciIcon = pure(SequenciIcon);
SequenciIcon.displayName = 'SequenciIcon';
SequenciIcon.muiName = 'SvgIcon';

export default SequenciIcon;