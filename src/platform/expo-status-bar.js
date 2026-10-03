// Written by the Lab Bridge. Do not edit — it is rewritten on every start.
const React = require('react');

let RNStatusBar = null;
try {
  RNStatusBar = require('react-native').StatusBar || null;
} catch (_) {
  RNStatusBar = null;   // React (DOM) lab — see rn-guard.js
}

// expo's `style` → react-native's `barStyle`. 'auto' is expo's default and means
// "pick from the background"; react-native's equivalent is 'default'.
function barStyleFor(style) {
  if (style === 'light') return 'light-content';
  if (style === 'dark') return 'dark-content';
  return 'default';
}

function StatusBar(props) {
  if (!RNStatusBar) return null;
  const { style, ...rest } = props || {};
  return React.createElement(RNStatusBar, { barStyle: barStyleFor(style), ...rest });
}

// The imperative half of expo-status-bar's API. Same translation, and the same
// no-op when there is no native status bar to talk to.
function setStatusBarStyle(style) {
  if (RNStatusBar && RNStatusBar.setBarStyle) RNStatusBar.setBarStyle(barStyleFor(style), true);
}
function setStatusBarHidden(hidden, animation) {
  if (RNStatusBar && RNStatusBar.setHidden) RNStatusBar.setHidden(!!hidden, animation);
}
function setStatusBarBackgroundColor(color, animated) {
  if (RNStatusBar && RNStatusBar.setBackgroundColor) RNStatusBar.setBackgroundColor(color, !!animated);
}
function setStatusBarTranslucent(translucent) {
  if (RNStatusBar && RNStatusBar.setTranslucent) RNStatusBar.setTranslucent(!!translucent);
}
function setStatusBarNetworkActivityIndicatorVisible(visible) {
  if (RNStatusBar && RNStatusBar.setNetworkActivityIndicatorVisible) {
    RNStatusBar.setNetworkActivityIndicatorVisible(!!visible);
  }
}

module.exports = {
  StatusBar,
  default: StatusBar,
  setStatusBarStyle,
  setStatusBarHidden,
  setStatusBarBackgroundColor,
  setStatusBarTranslucent,
  setStatusBarNetworkActivityIndicatorVisible,
};
