// Written by the Lab Bridge. Do not edit — it is rewritten on every start.
let AppRegistry = null;
try {
  AppRegistry = require('react-native').AppRegistry || null;
} catch (_) {
  AppRegistry = null;   // React (DOM) lab — see rn-guard.js
}

// EVERY NAME THE APP COULD BE LOOKED UP UNDER, in one list.
//
// There are three, they disagree, and which ones disagree depends on the lab:
//
//   • 'rn_lab_workspace' — what this workspace's MainActivity asks for. Read
//     out of android/settings.gradle when this file was written, so it is the
//     real one and not a guess.
//   • app.json's name — what a CLI-shaped app.json calls it. An EXPO-shaped
//     app.json puts it under `expo.name` instead, which is why both are read:
//     a lab may ship its own app.json and the Expo-era ones are the whole reason
//     this file exists.
//   • 'main' — what Expo's own registerRootComponent registers, and therefore
//     what any other Expo-era code will look for.
//
// Registering all of them costs a map entry each. Registering the wrong one
// costs a red screen — "rn_lab_workspace has not been registered" — on an app
// that just built cleanly, which is the least debuggable failure in this file.
function rootComponentNames() {
  const names = ['rn_lab_workspace'];
  try {
    const cfg = require('../../app.json') || {};
    names.push(cfg.name, (cfg.expo || {}).name);
  } catch (_) { /* no app.json, or not JSON */ }
  names.push('main');
  return names.filter((n, i) => n && names.indexOf(n) === i);
}

function registerRootComponent(App) {
  if (!AppRegistry) return;                       // a DOM lab registers nothing
  for (const name of rootComponentNames()) AppRegistry.registerComponent(name, () => App);
}

const shim = { registerRootComponent };

module.exports = new Proxy(shim, {
  get(target, prop) {
    if (prop in target) return target[prop];
    // Interop probes, not student code: answering these with a throw would break
    // the import statement itself, before any lab code runs.
    if (typeof prop === 'symbol' || prop === '__esModule' || prop === 'default') return undefined;
    throw new Error(
      'This lab imports "expo", but the lab workspace is bare React Native — there is no Expo in it. ' +
      'Only registerRootComponent is provided, and "' + String(prop) + '" is not. ' +
      'Use the React Native API directly (or expo-status-bar, which is mapped for you).'
    );
  },
});
