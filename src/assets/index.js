// One place every screen gets an image from, so no screen writes a path.
//
//   import { IMAGES } from '../assets';
//   <Image source={IMAGES.welcome} style={{ width: '100%' }} resizeMode="contain" />
//
// `require` needs a real, literal path -- IMAGES[name] works, but
// require('./images/' + name + '.png') does not. That is why every image is
// listed here once.
//
// welcome.png is wired up for you as the sample, but the file itself is only a
// PLACEHOLDER -- a grey picture frame. Export the real cover from the Figma
// file at 2x, save it over src/assets/images/welcome.png, and the screen picks
// it up with no code change. Export the rest the same way and add a line each.

export const IMAGES = {
  welcome: require('./images/welcome.png'), // the cover on the Welcome screen

  // TODO: add these as you export them
  // bg: require('./images/bg.png'),              the faint shapes behind every screen
  // google: require('./images/google.png'),      the three social buttons
  // facebook: require('./images/facebook.png'),
  // apple: require('./images/apple.png'),

 
  welcome: require('./images/welcome.png'),
  bg: require('./images/bg.png'),
  google: require('./images/google.png'),
  facebook: require('./images/facebook.png'),
  apple: require('./images/apple.png'),
  feedIcon: require('./images/feedIcon.png')

};
