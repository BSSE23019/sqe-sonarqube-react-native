// Written by the Lab Bridge. Do not edit — it is rewritten on every start.
module.exports = new Proxy({}, {
  get(_target, prop) {
    if (prop === '__esModule') return false;
    throw new Error(
      'This is a React (web) lab, but something imported "react-native".' + String(prop) + '. ' +
      'Use DOM elements (<div>, <span>, <input>) here, and move any React Native code ' +
      'into a .native.js file or behind src/platform/.'
    );
  },
});
