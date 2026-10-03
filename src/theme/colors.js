// COLORS: every colour the app uses, in one object.
// Read each value from the Figma file (select a layer, then Inspect/Dev Mode).
// No screen should ever write a hex code itself; it imports COLORS instead.
//
// What this object will hold:
//   primary        brand blue: buttons, titles, focused border, links
//   primaryShadow  the glow under the primary button
//   white          button text, card backgrounds
//   text           normal text (black)
//   textMuted      input placeholders, labels
//   textSecondary  secondary links such as "Create new account"
//   inputBg        the fill of every input
//   border         an input's border when it is NOT focused
//   borderFocus    an input's border while it IS focused
//   error          form error messages
//   divider        lines between rows on the profile card
//   tabInactive    an unselected tab in the bottom tab bar
//
// Example of one entry:
//   primary: '#......',

export const COLORS = {
  // SAMPLE -- this one is filled in so you can see the shape. In Figma: select
  // the "Login here" title, open Inspect, copy the Fill hex. Do the rest the
  // same way; a screen then writes COLORS.primary, never '#1F41BB'.
  primary: '#1F41BB',

  // TODO: the rest, from Figma
  primaryShadow: '#CBD6FF',
  white: '#FFFFFF',
  text: '#1F41BB',
  textMuted: '#626262',
  textSecondary: '#494949',
  inputBg: '#F1F4FF',
  border: 'transparent',
  borderFocus: '#1F41BB',
  error: '#D32F2F',
  divider: '#E6E9F5',
  tabInactive: '#1F41BB',
};
