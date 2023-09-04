import React from 'react';
// Svgs
import logoOhif from './../../assets/svgs/logo-ohif.svg';
import logo_0 from './../../assets/svgs/logo_0.svg';
import logo1 from './../../assets/svgs/logo_1.svg';
import wx0 from './../../assets/svgs/wx.svg';

const SVGS = {
  'logo-ohif': logoOhif,
  'logo0': logo_0,
  'logo1': logo1,
  'wx': wx0,
};

/**
 * Return the matching SVG as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getSvg(key, props) {
  if (!key || !SVGS[key]) {
    return React.createElement('div', null, 'Missing SVG');
  }

  return React.createElement(SVGS[key], props);
}

export { SVGS };
